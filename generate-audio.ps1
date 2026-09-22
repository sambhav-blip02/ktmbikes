function Generate-KTMExhaustWav {
    param(
        [string]$outputPath,
        [string]$type, # "duke390", "rc390", "adv390", "duke250", "duke200", "rc200", "adv250", "v_twin_1390"
        [double]$duration = 6.0
    )

    $sampleRate = 44100
    $totalSamples = [int]($sampleRate * $duration)
    $samples = New-Object float[] $totalSamples

    # Engine profile parameters
    $idleRpm = 1600.0
    $peakRpm = 9500.0
    $isVTwin = $false
    $vTwinOffset = 0.3958 # 285 / 720 degrees for 75 deg V-twin
    $bassThump = 1.0
    $rasp = 0.5
    $metallic = 0.3

    switch ($type) {
        "duke390" {
            $idleRpm = 1600.0; $peakRpm = 10000.0; $bassThump = 1.4; $rasp = 0.8; $metallic = 0.4
        }
        "rc390" {
            $idleRpm = 1750.0; $peakRpm = 10800.0; $bassThump = 1.1; $rasp = 1.2; $metallic = 0.9
        }
        "adv390" {
            $idleRpm = 1550.0; $peakRpm = 9200.0; $bassThump = 1.6; $rasp = 0.6; $metallic = 0.2
        }
        "duke250" {
            $idleRpm = 1650.0; $peakRpm = 10500.0; $bassThump = 1.0; $rasp = 0.7; $metallic = 0.4
        }
        "duke200" {
            $idleRpm = 1800.0; $peakRpm = 11200.0; $bassThump = 0.8; $rasp = 1.1; $metallic = 0.6
        }
        "rc200" {
            $idleRpm = 1800.0; $peakRpm = 11000.0; $bassThump = 0.75; $rasp = 1.3; $metallic = 0.8
        }
        "adv250" {
            $idleRpm = 1600.0; $peakRpm = 9800.0; $bassThump = 1.2; $rasp = 0.6; $metallic = 0.3
        }
        "v_twin_1390" {
            $idleRpm = 1400.0; $peakRpm = 10200.0; $isVTwin = $true; $bassThump = 2.2; $rasp = 1.4; $metallic = 0.7
        }
    }

    $phase1 = 0.0
    $phase2 = 0.0
    $random = New-Object System.Random(42)

    for ($i = 0; $i -lt $totalSamples; $i++) {
        $t = $i / $sampleRate

        # RPM envelope: Idle (0-1.2s), Rev 1 (1.2-2.8s), Drop (2.8-3.5s), Big Rev 2 (3.5-4.8s), Return to Idle (4.8-6.0s)
        $rpm = $idleRpm
        if ($t -ge 1.2 -and $t -lt 2.4) {
            $progress = [Math]::Sin(($t - 1.2) / 1.2 * [Math]::PI)
            $rpm = $idleRpm + ($peakRpm * 0.65 - $idleRpm) * $progress
        } elseif ($t -ge 2.4 -and $t -lt 3.2) {
            $rpm = $idleRpm + ($peakRpm * 0.2) * [Math]::Exp(-($t - 2.4) * 4)
        } elseif ($t -ge 3.2 -and $t -lt 4.6) {
            $progress = [Math]::Sin(($t - 3.2) / 1.4 * [Math]::PI)
            $rpm = $idleRpm + ($peakRpm - $idleRpm) * $progress
        } elseif ($t -ge 4.6) {
            $rpm = $idleRpm + ($peakRpm * 0.3) * [Math]::Exp(-($t - 4.6) * 3)
        }

        # 4-stroke cycle frequency (1 power stroke per 2 revolutions for single cylinder)
        $cycleFreq = ($rpm / 60.0) / 2.0
        $dt = $cycleFreq / $sampleRate

        $phase1 += $dt
        if ($phase1 -ge 1.0) { $phase1 -= 1.0 }

        # Main cylinder exhaust pulse
        $pulse1 = [Math]::Sin(2.0 * [Math]::PI * $phase1)
        # Power stroke pressure peak
        $thump1 = [Math]::Pow([Math]::Max(0.0, [Math]::Sin([Math]::PI * $phase1)), 6.0)

        # Harmonics
        $h2 = [Math]::Sin(4.0 * [Math]::PI * $phase1) * 0.45
        $h3 = [Math]::Sin(6.0 * [Math]::PI * $phase1) * 0.30
        $h4 = [Math]::Sin(8.0 * [Math]::PI * $phase1) * 0.20 * $rasp
        $h8 = [Math]::Sin(16.0 * [Math]::PI * $phase1) * 0.15 * $metallic

        $val = ($pulse1 * 0.4 + $thump1 * $bassThump + $h2 + $h3 + $h4 + $h8)

        # If V-Twin, calculate second cylinder firing at offset
        if ($isVTwin) {
            $phase2 = ($phase1 + $vTwinOffset)
            if ($phase2 -ge 1.0) { $phase2 -= 1.0 }
            $thump2 = [Math]::Pow([Math]::Max(0.0, [Math]::Sin([Math]::PI * $phase2)), 6.0)
            $vHarm2 = [Math]::Sin(4.0 * [Math]::PI * $phase2) * 0.4
            $val += ($thump2 * $bassThump * 1.1 + $vHarm2)
        }

        # Exhaust air turbulence / noise
        $noise = ($random.NextDouble() * 2.0 - 1.0) * (0.04 + ($rpm / $peakRpm) * 0.12)
        $val += $noise

        # Deceleration overrun pop / backfire crackle
        if (($t -ge 2.7 -and $t -lt 3.1) -or ($t -ge 4.7 -and $t -lt 5.2)) {
            if ($random.NextDouble() -lt 0.003) {
                $val += ($random.NextDouble() * 2.0 - 1.0) * 2.5
            }
        }

        # Master gain & soft saturation limiter
        $val = $val * 0.25
        # Soft clipping tanh
        $val = [Math]::Tanh($val)

        $samples[$i] = [float]$val
    }

    # Write WAV file (16-bit PCM Mono)
    $fileStream = [System.IO.File]::Create($outputPath)
    $writer = New-Object System.IO.BinaryWriter($fileStream)

    $subChunk2Size = $totalSamples * 2
    $chunkSize = 36 + $subChunk2Size

    # RIFF header
    $writer.Write([System.Text.Encoding]::ASCII.GetBytes("RIFF"))
    $writer.Write([int]$chunkSize)
    $writer.Write([System.Text.Encoding]::ASCII.GetBytes("WAVE"))

    # fmt chunk
    $writer.Write([System.Text.Encoding]::ASCII.GetBytes("fmt "))
    $writer.Write([int]16) # Subchunk1Size (16 for PCM)
    $writer.Write([short]1) # AudioFormat (1 = PCM)
    $writer.Write([short]1) # NumChannels (1 = Mono)
    $writer.Write([int]$sampleRate)
    $writer.Write([int]($sampleRate * 2)) # ByteRate
    $writer.Write([short]2) # BlockAlign
    $writer.Write([short]16) # BitsPerSample

    # data chunk
    $writer.Write([System.Text.Encoding]::ASCII.GetBytes("data"))
    $writer.Write([int]$subChunk2Size)

    foreach ($s in $samples) {
        $shortVal = [short]([Math]::Max(-1.0, [Math]::Min(1.0, $s)) * 32767)
        $writer.Write($shortVal)
    }

    $writer.Close()
    $fileStream.Close()
    Write-Host "Generated: $outputPath ($([math]::round((Get-Item $outputPath).Length / 1024, 1)) KB)"
}

Generate-KTMExhaustWav "assets\audio\duke-390.wav" "duke390"
Generate-KTMExhaustWav "assets\audio\rc-390.wav" "rc390"
Generate-KTMExhaustWav "assets\audio\adv-390.wav" "adv390"
Generate-KTMExhaustWav "assets\audio\duke-250.wav" "duke250"
Generate-KTMExhaustWav "assets\audio\duke-200.wav" "duke200"
Generate-KTMExhaustWav "assets\audio\rc-200.wav" "rc200"
Generate-KTMExhaustWav "assets\audio\adv-250.wav" "adv250"
Generate-KTMExhaustWav "assets\audio\super-duke-1390.wav" "v_twin_1390"
