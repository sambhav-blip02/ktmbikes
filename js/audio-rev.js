/**
 * KTM Exhaust Sound & Tachometer Synthesizer + Real Audio Clip Player
 * Models physical acoustic behavior of KTM 4-Stroke Singles and 75° LC8 V-Twins
 */

class KTMEngineSimulator {
  constructor() {
    this.audioCtx = null;
    this.isRunning = false;
    this.isRevving = false;
    this.currentRpm = 1600;
    this.targetRpm = 1600;
    this.idleRpm = 1600;
    this.redlineRpm = 10500;
    this.maxRpm = 11500;
    this.animFrameId = null;

    // Active Profile Defaults
    this.activeBike = null;
    this.activeProfile = {
      soundType: 'thumper_399',
      soundTitle: '399cc Deep Thumper',
      baseFreq: 58,
      revLimit: 10500,
      idleRpm: 1550,
      mufflerCutoff: 260,
      filterQ: 5.5,
      raspLevel: 0.85,
      bassBoost: 1.8,
      isVTwin: false,
      vTwinOffset: 0.3958
    };

    // Audio nodes
    this.masterGain = null;
    this.osc1 = null;
    this.osc2 = null;
    this.subOsc = null;
    this.vTwinOsc = null;
    this.filter = null;
    this.raspFilter = null;
    this.raspGain = null;
    this.distortion = null;
    this.noiseNode = null;
    this.noiseGain = null;
    this.analyser = null;

    // Real recorded audio clip element
    this.clipAudio = null;
    this.isPlayingClip = false;

    // Decel pop state
    this.lastRpm = 1600;
  }

  initAudio() {
    if (this.audioCtx) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new AudioContext();

    // Analyser node for live oscilloscope & frequency visualizer
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 256;

    // Master volume gain
    this.masterGain = this.audioCtx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.audioCtx.currentTime);

    // WaveShaper / Saturation for raw combustion bark
    this.distortion = this.audioCtx.createWaveShaper();
    this.distortion.curve = this.makeDistortionCurve(30);
    this.distortion.oversample = '4x';

    // Primary Muffler Acoustic Filter (Lowpass)
    this.filter = this.audioCtx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(this.activeProfile.mufflerCutoff, this.audioCtx.currentTime);
    this.filter.Q.setValueAtTime(this.activeProfile.filterQ, this.audioCtx.currentTime);

    // High-frequency exhaust pipe rasp filter (Bandpass)
    this.raspFilter = this.audioCtx.createBiquadFilter();
    this.raspFilter.type = 'bandpass';
    this.raspFilter.frequency.setValueAtTime(2800, this.audioCtx.currentTime);
    this.raspFilter.Q.setValueAtTime(3.5, this.audioCtx.currentTime);

    this.raspGain = this.audioCtx.createGain();
    this.raspGain.gain.setValueAtTime(this.activeProfile.raspLevel * 0.15, this.audioCtx.currentTime);

    // Primary Cylinder Exhaust Pulse (Sawtooth)
    this.osc1 = this.audioCtx.createOscillator();
    this.osc1.type = 'sawtooth';
    this.osc1.frequency.setValueAtTime(this.activeProfile.baseFreq, this.audioCtx.currentTime);

    // Harmonic Valvetrain & Airbox Resonance (Triangle)
    this.osc2 = this.audioCtx.createOscillator();
    this.osc2.type = 'triangle';
    this.osc2.frequency.setValueAtTime(this.activeProfile.baseFreq * 2.02, this.audioCtx.currentTime);

    // Sub-bass Combustion Thump (Sine)
    this.subOsc = this.audioCtx.createOscillator();
    this.subOsc.type = 'sine';
    this.subOsc.frequency.setValueAtTime(this.activeProfile.baseFreq * 0.5, this.audioCtx.currentTime);

    // Second Cylinder for 75° V-Twin (1390 Super Duke R)
    this.vTwinOsc = this.audioCtx.createOscillator();
    this.vTwinOsc.type = 'sawtooth';
    this.vTwinOsc.frequency.setValueAtTime(this.activeProfile.baseFreq * 1.005, this.audioCtx.currentTime);
    this.vTwinGain = this.audioCtx.createGain();
    this.vTwinGain.gain.setValueAtTime(this.activeProfile.isVTwin ? 0.7 : 0.0, this.audioCtx.currentTime);

    // Exhaust gas rush turbulence (Filtered noise)
    const bufferSize = this.audioCtx.sampleRate * 2;
    const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    this.noiseNode = this.audioCtx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    const noiseFilter = this.audioCtx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(800, this.audioCtx.currentTime);
    noiseFilter.Q.setValueAtTime(1.8, this.audioCtx.currentTime);

    this.noiseGain = this.audioCtx.createGain();
    this.noiseGain.gain.setValueAtTime(0.015, this.audioCtx.currentTime);

    this.noiseNode.connect(noiseFilter);
    noiseFilter.connect(this.noiseGain);
    this.noiseGain.connect(this.distortion);

    // Connect oscillators
    this.osc1.connect(this.distortion);
    this.osc2.connect(this.distortion);
    this.subOsc.connect(this.distortion);

    this.vTwinOsc.connect(this.vTwinGain);
    this.vTwinGain.connect(this.distortion);

    // Routing: Distortion -> Muffler Lowpass -> Master
    this.distortion.connect(this.filter);
    this.filter.connect(this.masterGain);

    // Routing: Distortion -> Pipe Rasp Filter -> RaspGain -> Master
    this.distortion.connect(this.raspFilter);
    this.raspFilter.connect(this.raspGain);
    this.raspGain.connect(this.masterGain);

    // Master -> Analyser -> Speakers
    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);

    // Start all sound generators
    this.osc1.start();
    this.osc2.start();
    this.subOsc.start();
    this.vTwinOsc.start();
    this.noiseNode.start();

    this.isRunning = true;
    this.startPhysicsLoop();
    this.startVisualizerLoop();
  }

  makeDistortionCurve(amount) {
    const k = typeof amount === 'number' ? amount : 25;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  setBike(bike) {
    if (!bike) return;
    this.activeBike = bike;
    this.setProfile(bike.audioProfile);

    // Update UI title and description
    const titleEl = document.getElementById('hudCurrentSoundTitle');
    const descEl = document.getElementById('hudCurrentSoundDesc');
    const playClipBtn = document.getElementById('btnPlayRealClip');

    if (titleEl && bike.audioProfile) {
      titleEl.textContent = bike.name + ' — ' + bike.audioProfile.soundTitle;
    }
    if (descEl) {
      descEl.textContent = bike.tagline;
    }

    // Stop real clip if playing
    if (this.clipAudio) {
      this.clipAudio.pause();
      this.clipAudio.currentTime = 0;
      this.isPlayingClip = false;
      if (playClipBtn) {
        playClipBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          Play Real Studio Recording
        `;
        playClipBtn.classList.remove('playing');
      }
    }
  }

  setProfile(profile) {
    if (!profile) return;
    this.activeProfile = Object.assign({}, this.activeProfile, profile);
    this.idleRpm = profile.idleRpm || 1600;
    this.redlineRpm = profile.revLimit || 10500;
    this.maxRpm = this.redlineRpm + 1000;

    if (!this.isRevving) {
      this.targetRpm = this.idleRpm;
    }

    if (this.audioCtx && this.vTwinGain && this.raspGain) {
      const now = this.audioCtx.currentTime;
      // Configure V-Twin offset pulse
      this.vTwinGain.gain.setValueAtTime(profile.isVTwin ? 0.8 : 0.0, now);
      this.raspGain.gain.setValueAtTime(profile.raspLevel * 0.16, now);
    }
  }

  startEngine() {
    if (!this.audioCtx) {
      this.initAudio();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    // Pause real clip if user revs
    if (this.clipAudio && this.isPlayingClip) {
      this.toggleRealClip();
    }

    const now = this.audioCtx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0.22, now + 0.25);
  }

  stopEngine() {
    if (!this.audioCtx || !this.masterGain) return;
    const now = this.audioCtx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.4);
    this.isRevving = false;
    this.targetRpm = this.idleRpm;
  }

  pressThrottle() {
    this.startEngine();
    this.isRevving = true;
    this.targetRpm = this.redlineRpm;
  }

  releaseThrottle() {
    // Detect decel overrun and trigger pop burst
    if (this.currentRpm > this.idleRpm + 3500) {
      this.triggerOverrunPop();
    }
    this.isRevving = false;
    this.targetRpm = this.idleRpm;
  }

  triggerOverrunPop() {
    if (!this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    // Quick burst of noise and filter spike simulating unburnt fuel explosion in hot exhaust
    const popOsc = this.audioCtx.createOscillator();
    popOsc.type = 'sawtooth';
    popOsc.frequency.setValueAtTime(140, now);
    popOsc.frequency.exponentialRampToValueAtTime(30, now + 0.12);

    const popGain = this.audioCtx.createGain();
    popGain.gain.setValueAtTime(0.18 * (this.activeProfile.raspLevel || 1.0), now);
    popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    popOsc.connect(popGain);
    popGain.connect(this.masterGain);
    popOsc.start(now);
    popOsc.stop(now + 0.14);
  }

  toggleRealClip() {
    const playClipBtn = document.getElementById('btnPlayRealClip');
    if (!this.activeBike) {
      const bikes = window.KTM_BIKES_DATA || [];
      this.activeBike = bikes[0];
    }

    if (!this.clipAudio) {
      this.clipAudio = new Audio();
      this.clipAudio.addEventListener('ended', () => {
        this.isPlayingClip = false;
        if (playClipBtn) {
          playClipBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            Play Real Studio Recording
          `;
          playClipBtn.classList.remove('playing');
        }
      });
    }

    if (this.isPlayingClip) {
      this.clipAudio.pause();
      this.isPlayingClip = false;
      if (playClipBtn) {
        playClipBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          Play Real Studio Recording
        `;
        playClipBtn.classList.remove('playing');
      }
    } else {
      // Stop synthetic engine if idling
      this.stopEngine();

      this.clipAudio.src = this.activeBike.audioFile || 'assets/audio/duke-390.wav';
      this.clipAudio.play().then(() => {
        this.isPlayingClip = true;
        if (playClipBtn) {
          playClipBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            Pause Studio Clip
          `;
          playClipBtn.classList.add('playing');
        }
      }).catch(err => {
        console.warn('Audio playback error:', err);
      });
    }
  }

  startPhysicsLoop() {
    const update = () => {
      this.lastRpm = this.currentRpm;

      if (this.isRevving) {
        if (this.currentRpm >= this.redlineRpm) {
          // Sharp realistic ignition cut stutter
          this.currentRpm = this.redlineRpm - Math.random() * 550;
        } else {
          this.currentRpm += (this.targetRpm - this.currentRpm) * 0.16;
        }
      } else {
        this.currentRpm += (this.idleRpm - this.currentRpm) * 0.08;
      }

      const now = this.audioCtx ? this.audioCtx.currentTime : 0;

      if (this.audioCtx && this.osc1 && this.filter) {
        // Exact 4-stroke cycle frequency: RPM / 120
        const fundamental = Math.max(25, (this.currentRpm / 120) * (this.activeProfile.harmonicMult || 1.0));
        
        this.osc1.frequency.setValueAtTime(fundamental, now);
        this.osc2.frequency.setValueAtTime(fundamental * 2.01, now);
        this.subOsc.frequency.setValueAtTime(fundamental * 0.5, now);

        if (this.activeProfile.isVTwin && this.vTwinOsc) {
          // 75 degree V-twin asymmetric secondary frequency
          this.vTwinOsc.frequency.setValueAtTime(fundamental * 1.008, now);
        }

        // Resonant low-pass opens dynamically with throttle
        const baseCutoff = this.activeProfile.mufflerCutoff || 280;
        const filterFreq = baseCutoff + (this.currentRpm / this.maxRpm) * 3500;
        this.filter.frequency.setValueAtTime(filterFreq, now);

        // Exhaust gas roar
        const noiseVol = 0.01 + (this.currentRpm / this.maxRpm) * 0.08;
        this.noiseGain.gain.setValueAtTime(noiseVol, now);
      }

      this.updateGaugeUI(this.currentRpm);
      this.animFrameId = requestAnimationFrame(update);
    };

    this.animFrameId = requestAnimationFrame(update);
  }

  updateGaugeUI(rpm) {
    const rpmValueEl = document.getElementById('revRpmCounter');
    const rpmBarEl = document.getElementById('revRpmBar');
    const shiftLightEl = document.getElementById('revShiftLight');

    if (rpmValueEl) {
      rpmValueEl.textContent = Math.round(rpm).toLocaleString();
    }

    if (rpmBarEl) {
      const pct = Math.min(100, Math.max(0, ((rpm - 1000) / (this.redlineRpm - 1000)) * 100));
      rpmBarEl.style.width = `${pct}%`;
      if (pct > 88) {
        rpmBarEl.style.background = 'linear-gradient(90deg, #FF6600, #FF0033)';
      } else {
        rpmBarEl.style.background = 'linear-gradient(90deg, #00FF66, #FFB700, #FF6600)';
      }
    }

    if (shiftLightEl) {
      if (rpm >= this.redlineRpm - 500) {
        shiftLightEl.classList.add('active-shift');
      } else {
        shiftLightEl.classList.remove('active-shift');
      }
    }
  }

  startVisualizerLoop() {
    const canvas = document.getElementById('hudWaveformCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const bufferLength = this.analyser ? this.analyser.frequencyBinCount : 128;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      requestAnimationFrame(draw);
      if (!this.analyser) {
        ctx.fillStyle = '#0a0a0c';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
      }

      this.analyser.getByteTimeDomainData(dataArray);

      ctx.fillStyle = 'rgba(10, 10, 12, 0.4)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = this.currentRpm > 8000 ? '#FF0033' : '#FF6600';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#FF6600';

      ctx.beginPath();
      const sliceWidth = canvas.width * 1.0 / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    draw();
  }
}

// Instantiate simulator globally
window.ktmEngine = new KTMEngineSimulator();
