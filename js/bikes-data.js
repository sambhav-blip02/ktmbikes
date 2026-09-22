/**
 * KTM Nepal - Butwal Showroom Motorcycle Catalog Data
 * Authorized Dealer: Highway Autovilla Pvt. Ltd., Kalikanagar, Butwal
 * Official Distributor: Hansraj Hulaschand & Co. Pvt. Ltd.
 */

const KTM_BIKES_DATA = [
  {
    id: 'duke-390-gen3',
    name: 'KTM 390 Duke (Gen-3)',
    category: 'naked',
    categoryName: 'Naked Sports',
    tagline: 'The Corner Rocket — Gen 3 Unleashed',
    priceNPR: 999900,
    priceFormatted: 'NPR 9,99,900',
    emiStartNPR: 14950,
    badge: 'Flagship Single',
    image: 'assets/images/duke-390.jpg',
    audioFile: 'assets/audio/duke-390.wav',
    colors: [
      { name: 'Electronic Orange', hex: '#FF6600' },
      { name: 'Atlantic Blue', hex: '#0B2265' }
    ],
    quickSpecs: {
      displacement: '398.7 cc',
      power: '46 PS @ 8,500 rpm',
      torque: '39 Nm @ 6,500 rpm',
      weight: '165 kg (dry)',
      topSpeed: '167 km/h',
      fuelTank: '15 L (Metal)'
    },
    specs: {
      engine: 'Liquid-cooled, 1-cylinder, 4-stroke, DOHC, 4 valves',
      displacement: '398.7 cc',
      boreStroke: '89 mm x 64 mm',
      power: '46 PS (33.8 kW) @ 8,500 rpm',
      torque: '39 Nm @ 6,500 rpm',
      compressionRatio: '12.6:1',
      transmission: '6-speed with PASC Antihopping Slipper Clutch',
      quickshifter: 'Quickshifter+ (Bi-directional Upshift & Downshift)',
      frame: 'Steel Trellis 2-piece frame with forged aluminium subframe',
      frontSuspension: 'WP APEX 43mm Open Cartridge USD (5-click rebound & compression adjustable, 150mm travel)',
      rearSuspension: 'WP APEX Separate Piston Monoshock (5-click rebound & preload adjustable, 150mm travel)',
      frontBrake: '320mm disc with radially mounted 4-piston caliper',
      rearBrake: '240mm disc with 2-piston floating caliper',
      abs: 'Bosch 9.3 MP Two-Channel ABS with Cornering ABS & Supermoto Mode',
      display: '5" Full Color Bonded TFT with turn-by-turn Bluetooth connectivity',
      seatHeight: '820 mm (Adjustable down to 800 mm with spacer)',
      groundClearance: '183 mm',
      fuelCapacity: '15.0 Litres',
      dryWeight: '165 kg',
      electronics: 'Launch Control, Cornering MTC, 3 Ride Modes (Street, Rain, Track), Speed Limiter, Type-C Fast Charger'
    },
    highlights: [
      'All-new 399cc LC4c engine with lighter cylinder head and wider powerband',
      'Adjustable WP APEX suspension front and rear for supreme Siddhartha Highway cornering',
      'Segment-first Launch Control & Cornering Traction Control',
      'Aggressive predatory dual LED headlight with integrated flanking LED daytime runners',
      'Redesigned asymmetric curved cast swingarm accommodating offset rear monoshock'
    ],
    recommendedRoute: 'Siddhartha Highway Twisties (Butwal -> Tansen Nuwakot Hill Climb)',
    audioProfile: {
      soundType: 'thumper_399',
      soundTitle: '399cc Deep Thumper & Airbox Growl',
      baseFreq: 58,
      harmonicMult: 1.0,
      revLimit: 10500,
      idleRpm: 1550,
      mufflerCutoff: 260,
      filterQ: 5.5,
      raspLevel: 0.85,
      bassBoost: 1.8,
      isVTwin: false
    }
  },
  {
    id: 'rc-390-gp',
    name: 'KTM RC 390 GP',
    category: 'supersport',
    categoryName: 'Supersport',
    tagline: 'Grand Prix Aerodynamics & Pure Track Dominance',
    priceNPR: 944900,
    priceFormatted: 'NPR 9,44,900',
    emiStartNPR: 14120,
    badge: 'MotoGP Edition',
    image: 'assets/images/rc-390.jpg',
    audioFile: 'assets/audio/rc-390.wav',
    colors: [
      { name: 'KTM Factory Racing GP', hex: '#FF5500' },
      { name: 'Atlantic Blue & Orange', hex: '#002868' }
    ],
    quickSpecs: {
      displacement: '373.2 cc',
      power: '43.5 PS @ 9,000 rpm',
      torque: '37 Nm @ 7,000 rpm',
      weight: '172 kg',
      topSpeed: '175 km/h',
      fuelTank: '13.7 L'
    },
    specs: {
      engine: 'Liquid-cooled, 1-cylinder, 4-stroke, 4-valve DOHC',
      displacement: '373.2 cc',
      boreStroke: '89 mm x 60 mm',
      power: '43.5 PS (32 kW) @ 9,000 rpm',
      torque: '37 Nm @ 7,000 rpm',
      compressionRatio: '12.6:1',
      transmission: '6-speed with PASC Slipper Clutch',
      quickshifter: 'Quickshifter+ enabled',
      frame: 'Steel Trellis Frame with bolt-on subframe',
      frontSuspension: 'WP APEX 43mm USD Forks (30-step compression & rebound adjustable, 120mm travel)',
      rearSuspension: 'WP APEX Monoshock with preload and 5-step rebound damping (150mm travel)',
      frontBrake: '320mm Bionic Disc with 4-piston radial fixed caliper',
      rearBrake: '230mm disc with single-piston floating caliper',
      abs: 'Bosch 9.1 MP Dual-Channel with Cornering ABS and Supermoto ABS',
      display: 'Full Color TFT instrument cluster with auto-brightness sensor',
      seatHeight: '824 mm',
      groundClearance: '158 mm',
      fuelCapacity: '13.7 Litres',
      dryWeight: '172 kg',
      electronics: 'Lean-angle sensitive Motorcycle Traction Control (MTC), Supermoto ABS, Foldable levers, Clip-on handlebar adjustability'
    },
    highlights: [
      'Moto3 inspired aerodynamic fairing reducing drag and wind buffet at high velocities',
      'Ultra-light bionic wheels saving 3.4kg of unsprung rotational mass',
      '30-click adjustable WP APEX suspension calibrated for aggressive lean angles',
      'Factory Racing GP livery straight from KTM MotoGP prototype grid',
      'Adjustable clip-on handlebars with 10mm height variability for street or track tuck'
    ],
    recommendedRoute: 'Butwal - Bhairahawa 6-Lane Expressway & Palpa Twists',
    audioProfile: {
      soundType: 'track_screamer',
      soundTitle: 'Track-Tuned Akrapovič Race Exhaust',
      baseFreq: 78,
      harmonicMult: 1.25,
      revLimit: 11000,
      idleRpm: 1750,
      mufflerCutoff: 480,
      filterQ: 7.5,
      raspLevel: 1.4,
      bassBoost: 1.1,
      isVTwin: false
    }
  },
  {
    id: 'adv-390-sw',
    name: 'KTM 390 Adventure SW',
    category: 'adventure',
    categoryName: 'Travel / Adventure',
    tagline: 'Conquer The Himalayas — Spoke Wheel Edition',
    priceNPR: 1099900,
    priceFormatted: 'NPR 10,99,900',
    emiStartNPR: 16450,
    badge: 'All-Terrain King',
    image: 'assets/images/adv-390.jpg',
    audioFile: 'assets/audio/adv-390.wav',
    colors: [
      { name: 'Rally Orange & Black', hex: '#FF6600' },
      { name: 'KTM Racing White', hex: '#EEEEEE' }
    ],
    quickSpecs: {
      displacement: '373.2 cc',
      power: '43.5 PS @ 9,000 rpm',
      torque: '37 Nm @ 7,000 rpm',
      weight: '172 kg (dry)',
      topSpeed: '160 km/h',
      fuelTank: '14.5 L (400km Range)'
    },
    specs: {
      engine: 'Liquid-cooled, 1-cylinder, 4-stroke, DOHC, 4 valves',
      displacement: '373.2 cc',
      boreStroke: '89 mm x 60 mm',
      power: '43.5 PS (32 kW) @ 9,000 rpm',
      torque: '37 Nm @ 7,000 rpm',
      compressionRatio: '12.6:1',
      transmission: '6-speed with slipper clutch and Quickshifter+',
      quickshifter: 'Quickshifter+ standard',
      frame: 'Ultra-lightweight Trellis frame with signature bolt-on steel subframe',
      frontSuspension: 'WP APEX 43mm USD Forks with 170mm travel (30-click rebound & compression adjustable)',
      rearSuspension: 'WP APEX Shock Absorber with 177mm travel (adjustable rebound and 10-step preload)',
      frontBrake: '320mm ByBre 4-piston radial caliper',
      rearBrake: '230mm ByBre 2-piston caliper',
      abs: 'Bosch 9.1 MP Cornering ABS with Dedicated Offroad ABS Mode',
      display: '5" Full Color TFT with KTM MY RIDE smartphone turn-by-turn navigation',
      seatHeight: '855 mm',
      groundClearance: '200 mm',
      fuelCapacity: '14.5 Litres (approx 400 km expedition range)',
      dryWeight: '172 kg',
      electronics: 'Offroad Traction Control (allows rear wheel slip for gravel hill climbs), Offroad ABS, Quickshifter+, 12V power outlet'
    },
    highlights: [
      'Heavy-duty anodized black spoke wheels (19" front / 17" rear) engineered for rocky Himalayan trails',
      'Adjustable WP APEX long-travel suspension with 200mm high ground clearance',
      'Full suite of offroad electronics: Offroad MTC and Offroad ABS',
      'Rally-inspired upright windscreen, heavy-duty engine crash guards and aluminum skid plate',
      'Generous 14.5L fuel cell offering effortless cross-Nepal touring range'
    ],
    recommendedRoute: 'Butwal -> Siddhababa -> Tansen -> Ranimahal / Nuwakot Gadhi Offroad Trail',
    audioProfile: {
      soundType: 'rally_thud',
      soundTitle: 'Rally Expedition Muffled Low-End Thud',
      baseFreq: 52,
      harmonicMult: 0.95,
      revLimit: 9600,
      idleRpm: 1500,
      mufflerCutoff: 210,
      filterQ: 4.2,
      raspLevel: 0.6,
      bassBoost: 2.1,
      isVTwin: false
    }
  },
  {
    id: 'duke-250-gen3',
    name: 'KTM 250 Duke (Gen-3)',
    category: 'naked',
    categoryName: 'Naked Sports',
    tagline: 'The Quarter-Liter Razor — Maximum Agility',
    priceNPR: 739900,
    priceFormatted: 'NPR 7,39,900',
    emiStartNPR: 11050,
    badge: 'Popular Choice',
    image: 'assets/images/duke-250.jpg',
    audioFile: 'assets/audio/duke-250.wav',
    colors: [
      { name: 'Ceramic White', hex: '#F0F0F0' },
      { name: 'Electronic Orange', hex: '#FF6600' }
    ],
    quickSpecs: {
      displacement: '249.07 cc',
      power: '31 PS @ 9,250 rpm',
      torque: '25 Nm @ 7,250 rpm',
      weight: '162.8 kg',
      topSpeed: '148 km/h',
      fuelTank: '15 L'
    },
    specs: {
      engine: 'Liquid-cooled, single cylinder, 4-stroke, SOHC, 4 valves',
      displacement: '249.07 cc',
      boreStroke: '72 mm x 61.17 mm',
      power: '31 PS (23 kW) @ 9,250 rpm',
      torque: '25 Nm @ 7,250 rpm',
      compressionRatio: '12.5:1',
      transmission: '6-speed manual with Assist & Slipper Clutch',
      quickshifter: 'Quickshifter+ equipped',
      frame: 'Steel Trellis frame with cast aluminum subframe',
      frontSuspension: 'WP APEX 43mm Big Bore Inverted Forks (150mm travel)',
      rearSuspension: 'WP APEX Monoshock with 5-step preload adjustment (150mm travel)',
      frontBrake: '320mm disc with 4-piston radially mounted caliper',
      rearBrake: '240mm disc with 2-piston floating caliper',
      abs: 'Dual-Channel ABS with Supermoto ABS mode',
      display: '5" High-Contrast LCD instrument display with gear shift indicator',
      seatHeight: '800 mm (Extremely accessible for all rider heights)',
      groundClearance: '176 mm',
      fuelCapacity: '15.0 Litres',
      dryWeight: '162.8 kg',
      electronics: 'Ride-by-wire throttle, Type-C USB charging, Supermoto ABS, Full LED lighting package'
    },
    highlights: [
      'New Gen-3 chassis and low 800mm seat height delivering unmatched urban and canyon maneuverability',
      'Peppy 31 PS engine with enhanced low-to-mid range torque punch for Butwal traffic and mountain roads',
      'Equipped with Quickshifter+ for seamless clutchless gear transitions',
      'Spacious 15L steel fuel tank providing over 420 km highway range',
      'Dual-channel ABS with Supermoto mode allowing rear wheel slide control'
    ],
    recommendedRoute: 'Butwal City Ring Road & Siddhartha Highway Hill Curves',
    audioProfile: {
      soundType: 'punchy_250',
      soundTitle: 'Snappy 249cc Mid-Range Urban Bark',
      baseFreq: 76,
      harmonicMult: 1.1,
      revLimit: 10500,
      idleRpm: 1650,
      mufflerCutoff: 340,
      filterQ: 5.0,
      raspLevel: 0.8,
      bassBoost: 1.25,
      isVTwin: false
    }
  },
  {
    id: 'duke-200',
    name: 'KTM 200 Duke',
    category: 'naked',
    categoryName: 'Naked Sports',
    tagline: 'The Street Brawler That Defined A Generation',
    priceNPR: 599900,
    priceFormatted: 'NPR 5,99,900',
    emiStartNPR: 8960,
    badge: 'Best Seller',
    image: 'assets/images/duke-390.jpg',
    audioFile: 'assets/audio/duke-200.wav',
    colors: [
      { name: 'Electronic Orange', hex: '#FF6600' },
      { name: 'Dark Galvano Grey', hex: '#333333' }
    ],
    quickSpecs: {
      displacement: '199.5 cc',
      power: '25 PS @ 10,000 rpm',
      torque: '19.3 Nm @ 8,000 rpm',
      weight: '159 kg',
      topSpeed: '138 km/h',
      fuelTank: '13.4 L'
    },
    specs: {
      engine: 'Liquid-cooled, 1-cylinder, 4-stroke, DOHC, 4 valves',
      displacement: '199.5 cc',
      boreStroke: '72 mm x 49 mm',
      power: '25 PS (18.4 kW) @ 10,000 rpm',
      torque: '19.3 Nm @ 8,000 rpm',
      compressionRatio: '11.3:1',
      transmission: '6-speed close-ratio gearbox',
      quickshifter: 'Optional PowerPart',
      frame: 'Lightweight tubular steel Trellis frame with bolt-on subframe',
      frontSuspension: 'WP APEX 43mm USD inverted forks (140mm travel)',
      rearSuspension: 'WP APEX 10-step preload adjustable monoshock (150mm travel)',
      frontBrake: '300mm disc with ByBre 4-piston radial caliper',
      rearBrake: '230mm disc with single-piston floating caliper',
      abs: 'Bosch Dual-Channel ABS with Supermoto mode switch',
      display: 'Digital LCD Multi-Function Instrument Console',
      seatHeight: '822 mm',
      groundClearance: '155 mm',
      fuelCapacity: '13.4 Litres',
      dryWeight: '159 kg',
      electronics: 'Supermoto ABS, LED DRL with halogen main projector, gear position indicator'
    },
    highlights: [
      'Unrivaled power-to-weight ratio in the 200cc class producing 25 screaming horsepower',
      'Aggressive predatory styling with sharp split headlight and exposed orange subframe',
      'Ultra-nimble chassis ideal for slicing through Butwal market traffic and Lumbini roads',
      'High revving DOHC engine with close-ratio 6-speed gearbox for rapid acceleration',
      'Class-leading WP suspension and radial ByBre braking hardware'
    ],
    recommendedRoute: 'Butwal Traffic Chowk -> Driver Tole -> Manimukunda Sen Park',
    audioProfile: {
      soundType: 'shortstroke_screamer',
      soundTitle: '11,200 RPM High-Revving Street Screamer',
      baseFreq: 96,
      harmonicMult: 1.35,
      revLimit: 11200,
      idleRpm: 1800,
      mufflerCutoff: 520,
      filterQ: 6.0,
      raspLevel: 1.2,
      bassBoost: 0.9,
      isVTwin: false
    }
  },
  {
    id: 'rc-200',
    name: 'KTM RC 200',
    category: 'supersport',
    categoryName: 'Supersport',
    tagline: 'Track Ready Supersport For Everyday Street Thrills',
    priceNPR: 674900,
    priceFormatted: 'NPR 6,74,900',
    emiStartNPR: 10080,
    badge: 'Track Focused',
    image: 'assets/images/rc-390.jpg',
    audioFile: 'assets/audio/rc-200.wav',
    colors: [
      { name: 'KTM GP Orange', hex: '#FF6600' },
      { name: 'Black & Orange', hex: '#1C1C1E' }
    ],
    quickSpecs: {
      displacement: '199.5 cc',
      power: '25 PS @ 10,000 rpm',
      torque: '19.2 Nm @ 8,000 rpm',
      weight: '160 kg',
      topSpeed: '142 km/h',
      fuelTank: '13.7 L'
    },
    specs: {
      engine: 'Liquid-cooled, 1-cylinder, 4-stroke, DOHC',
      displacement: '199.5 cc',
      boreStroke: '72 mm x 49 mm',
      power: '25 PS @ 10,000 rpm',
      torque: '19.2 Nm @ 8,000 rpm',
      compressionRatio: '11.3:1',
      transmission: '6-speed transmission',
      quickshifter: 'N/A',
      frame: 'Steel Trellis Frame with bolt-on subframe',
      frontSuspension: 'WP APEX 43mm USD inverted forks (120mm travel)',
      rearSuspension: 'WP APEX monoshock with 10-step preload adjustment (150mm travel)',
      frontBrake: '320mm disc with 4-piston radial caliper',
      rearBrake: '230mm disc with 1-piston floating caliper',
      abs: 'Dual-Channel ABS with Supermoto ABS mode',
      display: 'Advanced LCD dashboard with gear and RPM shift light',
      seatHeight: '824 mm',
      groundClearance: '158 mm',
      fuelCapacity: '13.7 Litres',
      dryWeight: '160 kg',
      electronics: 'Supermoto ABS, LED taillights and turn indicators, high-illumination halogen projector'
    },
    highlights: [
      'Ergonomic clip-on handlebars with rider-focused sports posture and comfortable knee indents',
      'Aerodynamic bubble shield windshield providing wind protection at highway speeds',
      'Massive 320mm front brake disc with radial caliper for razor-sharp stopping power',
      'Lightweight bionic wheel architecture reducing rotational mass',
      'Eye-catching track livery directly inspired by KTM racing heritage'
    ],
    recommendedRoute: 'Butwal -> Sunwal -> Bardaghat Highway Stretch',
    audioProfile: {
      soundType: 'sport_pipe',
      soundTitle: 'Crisp Underbelly Sports Pipe Whine',
      baseFreq: 92,
      harmonicMult: 1.3,
      revLimit: 11000,
      idleRpm: 1800,
      mufflerCutoff: 460,
      filterQ: 6.8,
      raspLevel: 1.3,
      bassBoost: 0.85,
      isVTwin: false
    }
  },
  {
    id: 'adv-250',
    name: 'KTM 250 Adventure',
    category: 'adventure',
    categoryName: 'Travel / Adventure',
    tagline: 'Accessible Dual-Sport Touring Machine',
    priceNPR: 769900,
    priceFormatted: 'NPR 7,69,900',
    emiStartNPR: 11500,
    badge: 'Touring Value',
    image: 'assets/images/adv-390.jpg',
    audioFile: 'assets/audio/adv-250.wav',
    colors: [
      { name: 'Electronic Orange', hex: '#FF6600' },
      { name: 'Factory Matte Black', hex: '#222222' }
    ],
    quickSpecs: {
      displacement: '248.8 cc',
      power: '30 PS @ 9,000 rpm',
      torque: '24 Nm @ 7,500 rpm',
      weight: '156 kg (dry)',
      topSpeed: '140 km/h',
      fuelTank: '14.5 L'
    },
    specs: {
      engine: 'Liquid-cooled, single cylinder, 4-stroke, DOHC, 4 valves',
      displacement: '248.8 cc',
      boreStroke: '72 mm x 61.1 mm',
      power: '30 PS (22 kW) @ 9,000 rpm',
      torque: '24 Nm @ 7,500 rpm',
      compressionRatio: '12.5:1',
      transmission: '6-speed with Power Assist Slipper Clutch (PASC)',
      quickshifter: 'Optional accessory',
      frame: 'Lightweight tubular steel trellis frame with bolt-on subframe',
      frontSuspension: 'WP APEX 43mm USD forks with 170mm travel',
      rearSuspension: 'WP APEX Monoshock with 10-step preload (177mm travel)',
      frontBrake: '320mm disc with 4-piston radial caliper',
      rearBrake: '230mm disc with 1-piston floating caliper',
      abs: 'Bosch 9.1 MB Two-Channel ABS with Dedicated Offroad Mode',
      display: 'Multi-functional high-visibility LCD display panel',
      seatHeight: '855 mm',
      groundClearance: '200 mm',
      fuelCapacity: '14.5 Litres (approx 420 km range)',
      dryWeight: '156 kg',
      electronics: 'Offroad ABS mode (disables rear ABS for loose dirt), 12V auxiliary dashboard socket, Slipper clutch'
    },
    highlights: [
      'High 200mm ground clearance and long-travel WP APEX suspension conquering rough Nepali backroads',
      'Robust 14.5L fuel tank offering over 400 km between fuel stops',
      'Offroad ABS allows locked rear wheel steering in dirt hairpins while maintaining front stability',
      'Upright adventure touring ergonomics for all-day comfort without fatigue',
      'PASC slipper clutch provides light lever pull and prevents rear wheel chatter on downshifts'
    ],
    recommendedRoute: 'Butwal -> Tansen -> Ridi -> Tamghas Mountain Expedition',
    audioProfile: {
      soundType: 'dual_sport',
      soundTitle: 'Balanced Dual-Sport Trail Pulse',
      baseFreq: 68,
      harmonicMult: 1.05,
      revLimit: 9800,
      idleRpm: 1600,
      mufflerCutoff: 290,
      filterQ: 4.8,
      raspLevel: 0.7,
      bassBoost: 1.4,
      isVTwin: false
    }
  },
  {
    id: 'super-duke-1390',
    name: 'KTM 1390 Super Duke R Evo',
    category: 'flagship',
    categoryName: 'The Beast Flagship',
    tagline: 'The Apex Predator — 190 HP Hyper-Naked',
    priceNPR: 3950000,
    priceFormatted: 'NPR 39,50,000*',
    emiStartNPR: 59000,
    badge: 'Special Import',
    image: 'assets/images/hero.jpg',
    audioFile: 'assets/audio/super-duke-1390.wav',
    colors: [
      { name: 'Beast Orange & Black', hex: '#FF5500' },
      { name: 'Carbon Stealth', hex: '#111111' }
    ],
    quickSpecs: {
      displacement: '1,350 cc',
      power: '190 PS @ 10,000 rpm',
      torque: '145 Nm @ 8,000 rpm',
      weight: '200 kg (dry)',
      topSpeed: '290+ km/h',
      fuelTank: '17.5 L'
    },
    specs: {
      engine: '75° V-twin, 4-stroke, liquid-cooled LC8 with Camshift technology',
      displacement: '1,350 cc',
      boreStroke: '110 mm x 71 mm',
      power: '190 PS (140 kW) @ 10,000 rpm',
      torque: '145 Nm @ 8,000 rpm',
      compressionRatio: '13.2:1',
      transmission: '6-speed with PASC slipper clutch & Quickshifter+',
      quickshifter: 'Bi-directional Quickshifter+ with shift-cut electronics',
      frame: 'Chrome-molybdenum tubular space frame with powder-coated finish',
      frontSuspension: 'WP Semi-Active Technology (SAT) 48mm USD forks (125mm travel)',
      rearSuspension: 'WP SAT monoshock with electronically controlled damping (140mm travel)',
      frontBrake: 'Twin 320mm Brembo Stylema Monobloc 4-piston calipers',
      rearBrake: '240mm disc with Brembo twin-piston caliper',
      abs: 'Bosch 9.3 MP Cornering ABS with Supermoto ABS mode',
      display: '5.5" bonded glass TFT display with telemetry recording and tire pressure monitor',
      seatHeight: '834 mm',
      groundClearance: '149 mm',
      fuelCapacity: '17.5 Litres',
      dryWeight: '200 kg',
      electronics: '5 Ride Modes (Rain, Street, Sport, Track, Performance), Anti-Wheelie (5 levels), Engine Brake Control, Launch Control'
    },
    highlights: [
      'Mind-bending 190 HP LC8 V-twin with Camshift variable valve timing',
      '3rd Gen WP Semi-Active Suspension automatically adapting to road and race inputs',
      'Predator alien LED headlight design with ambient air intake scoops',
      'Brembo Stylema monobloc braking power with cornering sensitivity',
      'Available at Butwal Showroom via VIP Special Order and Import Consultation'
    ],
    recommendedRoute: 'VIP Track Day & Highway Showcase',
    audioProfile: {
      soundType: 'v_twin_1350',
      soundTitle: '1,350cc 75° V-Twin LC8 Beast Roar',
      baseFreq: 44,
      harmonicMult: 0.9,
      revLimit: 10200,
      idleRpm: 1400,
      mufflerCutoff: 380,
      filterQ: 8.5,
      raspLevel: 1.6,
      bassBoost: 2.8,
      isVTwin: true,
      vTwinOffset: 0.3958 // 285 / 720 degrees
    }
  }
];

// Showroom Information for Butwal, Nepal
const SHOWROOM_INFO = {
  dealerName: 'Highway Autovilla Pvt. Ltd.',
  brand: 'KTM — READY TO RACE',
  officialDistributor: 'Hansraj Hulaschand & Co. Pvt. Ltd. (HH Bajaj / KTM Nepal)',
  city: 'Butwal, Rupandehi, Lumbini Province, Nepal',
  location: 'Kalikanagar, Siddhartha Highway (Near Traffic Chowk), Butwal',
  googleMapsQuery: 'KTM Showroom Butwal Highway Autovilla Kalikanagar',
  phonePrimary: '+977 9802622282',
  phoneSecondary: '+977 9802622263',
  phoneLandline: '071-540282',
  whatsappNumber: '9779802622282',
  email: 'ktmreadytoracebutwal1@gmail.com',
  workingHours: 'Sunday – Friday: 9:30 AM – 6:30 PM | Saturday: Closed / On Appointment',
  services: [
    'New Motorcycle Sales & Booking',
    'Official Test Ride Facility (Butwal Mountain / Highway loops)',
    'Genuine KTM PowerParts & PowerWear Riding Gear',
    'Authorized KTM Service Center & WP Suspension Tuning',
    'Nepal Bank EMI Financing & Instant Exchange Facility',
    'Genuine KTM Spare Parts & Motorex Lubricants'
  ]
};

// Nepal Bank Financing Partner Rates
const NEPAL_BANKS = [
  { name: 'Nabil Bank Auto Loan', rate: 10.5, minDownPercent: 30, tenureMaxYears: 5 },
  { name: 'NIC Asia Bank Super Auto Loan', rate: 11.2, minDownPercent: 20, tenureMaxYears: 5 },
  { name: 'Global IME Bank Vehicle Loan', rate: 10.8, minDownPercent: 30, tenureMaxYears: 5 },
  { name: 'Himalayan Bank Ride Loan', rate: 10.2, minDownPercent: 40, tenureMaxYears: 4 },
  { name: 'Standard Showroom Special Finance', rate: 9.99, minDownPercent: 50, tenureMaxYears: 3 }
];

// Butwal Local Ride Routes
const BUTWAL_ROUTES = [
  {
    title: 'Siddhartha Highway Mountain Twisties',
    fromTo: 'Butwal Showroom -> Tansen / Palpa (38 km)',
    elevation: 'Elevation: 200m -> 1,350m',
    difficulty: 'Master Rider',
    recommendedBike: 'KTM 390 Duke & RC 390',
    description: 'Iconic mountain switchbacks, tight hairpins, and elevation climbing through the Chure hills. WP APEX suspension and cornering ABS shine here.',
    tag: 'Mountain Twisties'
  },
  {
    title: 'Nuwakot Gadhi & Ranimahal Offroad Trail',
    fromTo: 'Butwal -> Nuwakot Fort -> Ranimahal Palace (45 km)',
    elevation: 'Elevation: 200m -> 900m (Gravel & Stone)',
    difficulty: 'Offroad Adventure',
    recommendedBike: 'KTM 390 Adventure SW & 250 Adv',
    description: 'Rugged dirt paths, river crossings, and rocky ascents. Switch to Offroad ABS and stand on the pegs with spoked wheels soaking up the terrain.',
    tag: 'Adventure Trail'
  },
  {
    title: 'Lumbini Peace Corridor Expressway',
    fromTo: 'Butwal Showroom -> Lumbini World Heritage Sanctuary (28 km)',
    elevation: 'Flat Terai Plains / Wide Asphalt',
    difficulty: 'Smooth Cruise',
    recommendedBike: 'KTM 250 Duke & KTM 200 Duke',
    description: 'Wide, open stretches linking Butwal to the birthplace of Lord Buddha. Perfect for high-speed cruising, break-in rides, and evening throttles.',
    tag: 'Highway Cruise'
  }
];

if (typeof window !== 'undefined') {
  window.KTM_BIKES_DATA = KTM_BIKES_DATA;
  window.SHOWROOM_INFO = SHOWROOM_INFO;
  window.NEPAL_BANKS = NEPAL_BANKS;
  window.BUTWAL_ROUTES = BUTWAL_ROUTES;
}
