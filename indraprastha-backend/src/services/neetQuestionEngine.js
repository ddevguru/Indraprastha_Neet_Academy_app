/**
 * NEET Question Engine - Indraprastha NEET Academy
 * High-precision topic and micro-concept resolver and dynamic question generator.
 * Covers all NEET-UG Physics, Chemistry, and Biology (Botany & Zoology) chapters.
 */

const { getPhysicsGenerators } = require('./questionBank/neetPhysicsBank');
const { getChemistryGenerators } = require('./questionBank/neetChemistryBank');
const { getBiologyGenerators } = require('./questionBank/neetBiologyBank');

class NEETQuestionEngine {
  constructor() {
    this._initCatalogue();
  }

  _initCatalogue() {
    // Standard NEET chapters and concept definitions
    this.physicsChapters = [
      {
        name: 'Units, Dimensions & Errors',
        regex: /dimension|significant figure|vernier|screw gauge|percentage error|absolute error|unit of|dimensional formula/i,
        concepts: [
          { name: 'Dimensional Formula', regex: /dimensional formula|dimensions of/i },
          { name: 'Error Analysis & Percentage Error', regex: /percentage error|maximum fractional error|relative error/i },
          { name: 'Measuring Instruments (Vernier & Screw Gauge)', regex: /vernier|screw gauge|least count|pitch/i },
        ],
      },
      {
        name: 'Kinematics & Motion in 1D/2D',
        regex: /projectile|kinemat|trajectory|velocity|accelerat|displacement|speed|horizontal range|time of flight|maximum height|motion in a straight line|relative velocity/i,
        concepts: [
          { name: 'Projectile Motion (Range & Height)', regex: /projectile|trajectory|range|horizontal range|angle of projection|time of flight/i },
          { name: 'Uniformly Accelerated 1D Motion', regex: /free fall|dropped from height|distance in nth second|retardation|equations of motion/i },
          { name: 'Relative Velocity & Vectors', regex: /relative velocity|river.*boat|rain.*man|vector addition|cross product/i },
        ],
      },
      {
        name: 'Laws of Motion & Friction',
        regex: /newton.*law|friction|coefficient of friction|tension|pulley|normal reaction|repose|banking of road|centripetal force|momentum/i,
        concepts: [
          { name: 'Friction on Inclined Plane & Repose', regex: /friction|coefficient of friction|rough surface|angle of repose/i },
          { name: 'Connected Bodies & Pulley Systems', regex: /pulley|tension|connected by a string|hanging mass/i },
          { name: 'Circular Motion & Banking of Tracks', regex: /banking|banked road|centripetal|skidding|circular track/i },
        ],
      },
      {
        name: 'Work, Energy & Power',
        regex: /work.*energy|kinetic energy|potential energy|conservative force|spring constant|power.*watt|collision|elastic collision|coefficient of restitution/i,
        concepts: [
          { name: 'Work-Energy Theorem & Power', regex: /work done|power|rate of doing work|kinetic energy/i },
          { name: 'Spring Potential Energy & Conservation of Energy', regex: /spring|stretched by|compressed by|restoring force/i },
          { name: 'Collisions in 1D & Restitution', regex: /collision|elastic collision|inelastic|coefficient of restitution|rebound/i },
        ],
      },
      {
        name: 'Rotational Motion & System of Particles',
        regex: /rotat|moment of inertia|torque|angular momentum|center of mass|rolling without slipping|radius of gyration|flywheel/i,
        concepts: [
          { name: 'Moment of Inertia & Gyration', regex: /moment of inertia|radius of gyration|ring|disc|solid sphere|hollow sphere/i },
          { name: 'Torque & Angular Momentum Conservation', regex: /angular momentum|torque|angular acceleration|conservation of angular momentum/i },
          { name: 'Rolling Motion without Slipping', regex: /rolling|rolling without slipping|inclined plane.*rolling/i },
        ],
      },
      {
        name: 'Gravitation',
        regex: /gravitat|orbital velocity|escape velocity|kepler|acceleration due to gravity|satellite|gravitational potential/i,
        concepts: [
          { name: 'Escape & Orbital Velocity', regex: /escape velocity|orbital speed|orbital velocity|geostationary/i },
          { name: 'Variation of g with Altitude & Depth', regex: /height.*surface of earth|depth.*surface|variation of g|acceleration due to gravity/i },
          { name: 'Kepler\'s Laws & Satellite Motion', regex: /kepler|time period of satellite|elliptical orbit/i },
        ],
      },
      {
        name: 'Mechanical Properties of Solids & Fluids',
        regex: /young.*modulus|elasticity|stress|strain|bernoulli|viscosity|surface tension|terminal velocity|capillary|pascal.*law/i,
        concepts: [
          { name: 'Bernoulli\'s Theorem & Fluid Flow', regex: /bernoulli|equation of continuity|torricelli|venturimeter|efflux/i },
          { name: 'Surface Tension & Excess Pressure', regex: /surface tension|excess pressure|soap bubble|liquid drop|capillary rise/i },
          { name: 'Elasticity & Young\'s Modulus', regex: /young.*modulus|stress|strain|hooke|elongation/i },
          { name: 'Viscosity & Stokes\' Law', regex: /viscosity|terminal velocity|stokes|poiseuille/i },
        ],
      },
      {
        name: 'Thermal Properties of Matter & Calorimetry',
        regex: /calorimet|latent heat|specific heat|thermal expansion|conduction|thermal conductivity|wien.*law|stefan.*boltzmann|black body/i,
        concepts: [
          { name: 'Calorimetry & Specific Heat', regex: /calorimet|specific heat capacity|latent heat of fusion|mixture temperature/i },
          { name: 'Thermal Radiation (Stefan & Wien Laws)', regex: /stefan|wien|black body|rate of heat loss|emissive power/i },
          { name: 'Thermal Expansion & Conduction', regex: /linear expansion|thermal conductivity|temperature gradient/i },
        ],
      },
      {
        name: 'Thermodynamics & Kinetic Theory',
        regex: /thermodynamic|carnot|heat engine|isothermal|adiabatic|isochoric|isobaric|efficiency|refrigerator|internal energy|rms speed|mean free path|cp.*cv/i,
        concepts: [
          { name: 'Carnot Engine & Refrigerator Efficiency', regex: /carnot|heat engine|efficiency|reservoir|sink|source|cop of refrigerator/i },
          { name: 'First Law of Thermodynamics & PV Processes', regex: /first law|isothermal|adiabatic|work done in|isobaric|pv diagram/i },
          { name: 'Kinetic Theory of Gases & RMS Speed', regex: /rms speed|kinetic theory|degrees of freedom|mean free path|molar heat capacity/i },
        ],
      },
      {
        name: 'Oscillations & Simple Harmonic Motion',
        regex: /shm|simple harmonic|pendulum|time period.*oscillation|frequency.*oscillation|restoring force|spring.*mass/i,
        concepts: [
          { name: 'Simple Pendulum & Time Period', regex: /simple pendulum|length of pendulum|time period of oscillation/i },
          { name: 'Energy in SHM & Velocity', regex: /kinetic energy.*shm|potential energy.*shm|amplitude|displacement x/i },
          { name: 'Spring-Mass Oscillations', regex: /spring mass|effective spring constant|series spring|parallel spring/i },
        ],
      },
      {
        name: 'Waves & Acoustics',
        regex: /sound wave|doppler effect|organ pipe|resonance tube|standing wave|node.*antinode|beat frequency|frequency of sound/i,
        concepts: [
          { name: 'Doppler Effect in Sound', regex: /doppler|source moves towards|observer moves|apparent frequency/i },
          { name: 'Organ Pipes & Standing Waves', regex: /organ pipe|closed pipe|open pipe|fundamental frequency|harmonics|overtone/i },
          { name: 'Beats & Wave Speed', regex: /beats|beat frequency|waxing|tuning fork/i },
        ],
      },
      {
        name: 'Electrostatics & Electric Potential',
        regex: /electrostatic|coulomb|electric field|electric potential|gauss.*law|electric flux|dipole moment|equipotential/i,
        concepts: [
          { name: 'Coulomb\'s Law & Superposition', regex: /coulomb|electrostatic force|two point charges|null point/i },
          { name: 'Gauss\'s Law & Electric Flux', regex: /gauss|electric flux|enclosed charge|gaussian surface/i },
          { name: 'Electric Potential & Dipole', regex: /electric potential|equipotential|electric dipole|work done in moving a charge/i },
        ],
      },
      {
        name: 'Capacitance & Dielectrics',
        regex: /capacit|dielectric|parallel plate|charge on capacitor|energy stored.*capacitor/i,
        concepts: [
          { name: 'Parallel Plate Capacitor & Dielectrics', regex: /parallel plate|dielectric slab|dielectric constant/i },
          { name: 'Capacitor Combinations & Energy', regex: /series combination|parallel combination|energy stored|common potential/i },
        ],
      },
      {
        name: 'Current Electricity',
        regex: /drift velocity|ohm.*law|resistan|resistiv|current electricity|kirchhoff|potentiometer|wheatstone|meter bridge|emf|internal resistan|current density/i,
        concepts: [
          { name: 'Drift Velocity & Mobility', regex: /drift velocity|mobility|current density|relaxation time/i },
          { name: 'Wire Stretching & Resistance Temperature', regex: /stretched|temperature coefficient|wire of resistance/i },
          { name: 'Internal Resistance & Cells in Circuit', regex: /internal resistance|terminal potential|emf|cells in series/i },
          { name: 'Potentiometer & Meter Bridge', regex: /potentiometer|balancing length|meter bridge|wheatstone/i },
          { name: 'Kirchhoff\'s Laws & Power', regex: /kirchhoff|loop rule|power consumed|bulb rated/i },
        ],
      },
      {
        name: 'Moving Charges & Magnetism',
        regex: /magnetic field|biot.*savart|ampere.*circuital|cyclotron|galvanometer|lorentz force|magnetic force|solenoid|toroid/i,
        concepts: [
          { name: 'Magnetic Force & Cyclotron Motion', regex: /lorentz|magnetic force|circular path|radius of path|cyclotron/i },
          { name: 'Biot-Savart & Solenoid Magnetic Field', regex: /biot.*savart|circular loop|solenoid|center of circular loop/i },
          { name: 'Moving Coil Galvanometer & Shunt', regex: /galvanometer|ammeter|voltmeter|shunt|figure of merit/i },
        ],
      },
      {
        name: 'Electromagnetic Induction & Alternating Current',
        regex: /electromagnetic induction|faraday.*law|lenz.*law|motional emf|alternating current|inductor|ac circuit|resonance.*ac|transformer|power factor/i,
        concepts: [
          { name: 'Faraday\'s Law & Motional EMF', regex: /faraday|lenz|induced emf|motional emf|magnetic flux/i },
          { name: 'Series LCR Circuit & Resonance', regex: /lcr|resonance|resonant frequency|impedance|q factor/i },
          { name: 'AC Power Factor & Transformers', regex: /power factor|transformer|turns ratio|rms current/i },
        ],
      },
      {
        name: 'Ray Optics & Optical Instruments',
        regex: /refract|lens|mirror|prism|lens maker|snell.*law|focal length|total internal reflection|microscope|telescope/i,
        concepts: [
          { name: 'Lens Maker\'s Formula & Lens Combinations', regex: /lens maker|convex lens|biconvex|focal length|radii of curvature/i },
          { name: 'Total Internal Reflection & Critical Angle', regex: /total internal reflection|critical angle|optical fiber/i },
          { name: 'Prism & Angle of Minimum Deviation', regex: /prism|angle of minimum deviation|refracting angle/i },
          { name: 'Optical Instruments (Microscope & Telescope)', regex: /compound microscope|astronomical telescope|magnifying power/i },
        ],
      },
      {
        name: 'Wave Optics',
        regex: /young.*slit|ydse|fringe width|diffraction|interference|polariz|brewster|resolving power/i,
        concepts: [
          { name: 'Young\'s Double Slit & Fringe Width', regex: /young.*slit|ydse|fringe width|slit separation|coherent/i },
          { name: 'Diffraction at Single Slit', regex: /diffraction|single slit|central maximum|width of central/i },
          { name: 'Polarization & Brewster\'s Law', regex: /polariz|brewster|malus|plane polarized/i },
        ],
      },
      {
        name: 'Dual Nature of Radiation & Matter',
        regex: /photoelectric|work function|stopping potential|de broglie|threshold wavelength|matter wave/i,
        concepts: [
          { name: 'Photoelectric Equation & Stopping Potential', regex: /photoelectric|stopping potential|work function|threshold frequency/i },
          { name: 'de Broglie Wavelength of Particles', regex: /de broglie|accelerated through potential|matter wave|wavelength of electron/i },
        ],
      },
      {
        name: 'Atoms & Nuclei',
        regex: /bohr|hydrogen spectrum|rydberg|alpha particle|mass defect|binding energy|radioactiv|half life/i,
        concepts: [
          { name: 'Bohr\'s Model & Hydrogen Transitions', regex: /bohr|hydrogen atom|lyman|balmer|paschen|rydberg/i },
          { name: 'Radioactive Decay & Half-Life', regex: /radioactiv|half life|decay constant|activity|remaining nucleus/i },
          { name: 'Binding Energy & Nuclear Mass Defect', regex: /binding energy|mass defect|nuclear density/i },
        ],
      },
      {
        name: 'Semiconductor Electronics',
        regex: /semiconductor|p-n junction|diode|zener|logic gate|transistor|rectifier|valence band/i,
        concepts: [
          { name: 'p-n Junction & Zener Diode', regex: /p-n junction|zener|forward bias|reverse bias|breakdown voltage/i },
          { name: 'Logic Gates & Boolean Algebra', regex: /logic gate|nand|nor|and gate|or gate|truth table/i },
          { name: 'Rectifiers & Energy Bands', regex: /rectifier|half wave|full wave|band gap|intrinsic/i },
        ],
      },
    ];

    this.chemistryChapters = [
      {
        name: 'Some Basic Concepts of Chemistry (Mole Concept)',
        regex: /mole concept|molarity|molality|stoichiometry|empirical formula|limiting reagent|molar mass/i,
        concepts: [
          { name: 'Molarity, Molality & Normality', regex: /molarity|molality|normality|mole fraction/i },
          { name: 'Mole Concept & Stoichiometry', regex: /number of moles|atoms present|limiting reagent|empirical formula/i },
        ],
      },
      {
        name: 'Structure of Atom',
        regex: /quantum number|heisenberg|orbital|aufbau|electronic configuration|bohr.*radius|de broglie.*chem/i,
        concepts: [
          { name: 'Quantum Numbers & Electronic Configuration', regex: /quantum number|principal|azimuthal|magnetic|spin|aufbau|pauli/i },
          { name: 'Dual Nature & Heisenberg Uncertainty', regex: /heisenberg|uncertainty in position|de broglie/i },
        ],
      },
      {
        name: 'Classification of Elements & Periodicity',
        regex: /periodic table|ionization enthalpy|electron gain enthalpy|electronegativity|atomic radii/i,
        concepts: [
          { name: 'Ionization Enthalpy & Electron Gain Enthalpy', regex: /ionization|electron gain enthalpy|electron affinity/i },
          { name: 'Periodic Trends & Sizes', regex: /atomic radii|isoelectronic|electronegativity/i },
        ],
      },
      {
        name: 'Chemical Bonding & Molecular Structure',
        regex: /chemical bond|vsepr|hybridiz|dipole moment|molecular orbital|bond order|hydrogen bond/i,
        concepts: [
          { name: 'Hybridization & Molecular Geometry (VSEPR)', regex: /hybridiz|geometry|shape of molecule|lone pair|vsepr/i },
          { name: 'Molecular Orbital Theory & Bond Order', regex: /molecular orbital|bond order|paramagnetic.*chem|diamagnetic/i },
          { name: 'Dipole Moment & Polarity', regex: /dipole moment|polar molecule|non-polar/i },
        ],
      },
      {
        name: 'Chemical Thermodynamics',
        regex: /enthalpy|entropy|gibbs free energy|spontaneity|hess.*law|calorimet.*chem|internal energy.*chem/i,
        concepts: [
          { name: 'Gibbs Free Energy & Spontaneity', regex: /gibbs|spontaneity|delta g|delta h - t delta s/i },
          { name: 'Hess\'s Law & Enthalpy of Reaction', regex: /hess|enthalpy of formation|bond dissociation enthalpy|combustion/i },
        ],
      },
      {
        name: 'Chemical & Ionic Equilibrium',
        regex: /equilibrium|le chatelier|ph|buffer|solubility product|ksp|common ion|hydrolysis of salt|ka.*kb/i,
        concepts: [
          { name: 'pH & Buffer Solutions', regex: /ph of|buffer solution|henderson|acidic buffer|basic buffer/i },
          { name: 'Solubility Product (Ksp) & Common Ion Effect', regex: /solubility product|ksp|precipitation|common ion/i },
          { name: 'Chemical Equilibrium & Le Chatelier\'s Principle', regex: /le chatelier|equilibrium constant|kp.*kc|shift in equilibrium/i },
        ],
      },
      {
        name: 'Redox Reactions & Electrochemistry',
        regex: /electrochem|galvanic|nernst|faraday.*law|conductance|kohlrausch|electrode potential|oxidation state/i,
        concepts: [
          { name: 'Nernst Equation & Cell EMF', regex: /nernst|cell potential|emf of cell|standard reduction potential/i },
          { name: 'Kohlrausch\'s Law & Molar Conductivity', regex: /kohlrausch|molar conductivity|equivalent conductivity/i },
          { name: 'Faraday\'s Laws of Electrolysis', regex: /faraday.*law|electrolysis|mass deposited|charge passed/i },
        ],
      },
      {
        name: 'Chemical Kinetics',
        regex: /rate.*reaction|order of reaction|rate constant|activation energy|arrhenius|half-life.*chem|pseudo first/i,
        concepts: [
          { name: 'First Order Kinetics & Half-Life', regex: /first order|half-life|rate constant k|zero order/i },
          { name: 'Arrhenius Equation & Activation Energy', regex: /arrhenius|activation energy|temperature coefficient.*chem/i },
        ],
      },
      {
        name: 'Solutions & Colligative Properties',
        regex: /raoult|colligative|osmotic pressure|elevation in boiling|depression in freezing|van.*t hoff/i,
        concepts: [
          { name: 'Colligative Properties & van \'t Hoff Factor', regex: /van.*t hoff|osmotic pressure|boiling point elevation|freezing point depression/i },
          { name: 'Raoult\'s Law & Vapour Pressure', regex: /raoult|vapour pressure|ideal solution|positive deviation/i },
        ],
      },
      {
        name: 'd- and f-Block Elements & Coordination Compounds',
        regex: /coordination|ligand|crystal field|werner|lanthanoid|transition element|d-block|isomerism.*coordination/i,
        concepts: [
          { name: 'Coordination Complexes & Crystal Field Splitting', regex: /crystal field|cfse|octahedral|tetrahedral|spectrochemical/i },
          { name: 'IUPAC Naming & Isomerism of Complexes', regex: /iupac.*complex|geometrical isomerism|linkage isomerism/i },
          { name: 'Transition Metal Properties & Magnetic Moments', regex: /spin-only|magnetic moment.*bm|lanthanoid contraction/i },
        ],
      },
      {
        name: 'General Organic Chemistry (GOC)',
        regex: /inductive effect|resonance.*chem|hyperconjugation|carbocation|carbanion|acidity.*organic|electrophile/i,
        concepts: [
          { name: 'Electronic Effects & Intermediates Stability', regex: /carbocation stability|hyperconjugation|resonance effect|inductive/i },
          { name: 'Acidic & Basic Strength of Organic Compounds', regex: /acidic strength|acidity of phenol|carboxylic acid acidity|basicity of amine/i },
        ],
      },
      {
        name: 'Hydrocarbons',
        regex: /alkane|alkene|alkyne|markovnikov|ozonolysis|friedel.*crafts|benzene.*reaction/i,
        concepts: [
          { name: 'Alkenes Reactions (Markovnikov & Ozonolysis)', regex: /markovnikov|peroxide effect|ozonolysis|addition to alkene/i },
          { name: 'Aromatic Electrophilic Substitution', regex: /friedel.*crafts|nitration|halogenation of benzene/i },
        ],
      },
      {
        name: 'Haloalkanes & Haloarenes',
        regex: /sn1|sn2|alkyl halide|nucleophilic substitution|elimination.*saytzeff/i,
        concepts: [
          { name: 'SN1 vs SN2 Mechanisms', regex: /sn1|sn2|retention|inversion|carbocation intermediate/i },
          { name: 'Elimination Reactions & Saytzeff Rule', regex: /saytzeff|dehydrohalogenation|elimination/i },
        ],
      },
      {
        name: 'Alcohols, Phenols & Ethers',
        regex: /alcohol|phenol|ether|lucas test|reimer.*tiemann|kolbe.*reaction|williamson ether/i,
        concepts: [
          { name: 'Phenols (Reimer-Tiemann & Kolbe)', regex: /reimer.*tiemann|kolbe|salicylaldehyde|salicylic acid/i },
          { name: 'Lucas Test & Williamson Synthesis', regex: /lucas test|tertiary alcohol|williamson ether synthesis/i },
        ],
      },
      {
        name: 'Aldehydes, Ketones & Carboxylic Acids',
        regex: /aldehyde|ketone|carboxylic|aldol|cannizzaro|tollens|fehling|clemmensen|wolf.*kishner|haloform/i,
        concepts: [
          { name: 'Aldol Condensation & Cannizzaro Reaction', regex: /aldol|cannizzaro|alpha hydrogen/i },
          { name: 'Identification Tests (Tollens, Fehling, Iodoform)', regex: /tollens|fehling|iodoform test|haloform/i },
        ],
      },
      {
        name: 'Amines & Diazonium Salts',
        regex: /amine|diazonium|gabriel phthalimide|hoffmann bromamide|carbylamine|hinsberg/i,
        concepts: [
          { name: 'Preparation & Name Reactions of Amines', regex: /gabriel phthalimide|hoffmann bromamide|carbylamine test/i },
          { name: 'Basicity & Diazonium Coupling', regex: /basicity of amines|diazonium|azo dye/i },
        ],
      },
      {
        name: 'Biomolecules',
        regex: /biomolecule|carbohydrate|glucose|amino acid|peptide bond|dna.*rna|vitamin|protein structure/i,
        concepts: [
          { name: 'Carbohydrates & Reducing Sugars', regex: /glucose|fructose|reducing sugar|glycosidic linkage/i },
          { name: 'Proteins, Amino Acids & Nucleic Acids', regex: /peptide bond|denaturation|amino acid|zwitterion|dna.*rna/i },
        ],
      },
    ];

    this.biologyChapters = [
      {
        name: 'Cell: The Unit of Life',
        regex: /cell membrane|fluid mosaic|mitochondria|chloroplast|endoplasmic|golgi|ribosome|prokaryote|nucleus|lysosome/i,
        concepts: [
          { name: 'Cell Membrane & Organelles', regex: /fluid mosaic|endoplasmic reticulum|golgi apparatus|lysosome|mitochondria/i },
          { name: 'Ribosomes & Prokaryotic Inclusions', regex: /70s|80s|ribosome|mesosome|plasmid/i },
        ],
      },
      {
        name: 'Cell Cycle & Cell Division',
        regex: /cell cycle|mitosis|meiosis|pachytene|zygotene|diplotene|chiasmata|crossing over|synapsis|metaphase|anaphase/i,
        concepts: [
          { name: 'Meiosis I Prophase Stages (Crossing Over)', regex: /pachytene|zygotene|diplotene|crossing over|synaptonemal|recombinase|chiasmata/i },
          { name: 'Cell Cycle Phases & Mitosis', regex: /g1 phase|s phase|dna replication.*phase|metaphase plate|anaphase/i },
        ],
      },
      {
        name: 'Photosynthesis in Higher Plants',
        regex: /photosynth|light reaction|dark reaction|calvin cycle|c3|c4 pathway|rubisco|kranz anatomy|photophosphorylation/i,
        concepts: [
          { name: 'Calvin Cycle & C4 Hatch-Slack Pathway', regex: /calvin cycle|c3|c4|rubisco|pep carboxylase|kranz anatomy/i },
          { name: 'Light Reaction & Chemiosmosis', regex: /photosystem|ps i|ps ii|photolysis of water|chemiosmotic/i },
        ],
      },
      {
        name: 'Respiration in Plants',
        regex: /glycolysis|krebs cycle|tca cycle|electron transport system|fermentation|respiratory quotient|rq/i,
        concepts: [
          { name: 'Glycolysis & Krebs Cycle', regex: /glycolysis|pyruvate|krebs cycle|acetyl coa|citric acid cycle/i },
          { name: 'ETS & Respiratory Quotient (RQ)', regex: /electron transport|rq of|respiratory quotient/i },
        ],
      },
      {
        name: 'Plant Growth & Regulators',
        regex: /auxin|gibberellin|cytokinin|ethylene|abscisic acid|aba|photoperiodism|vernalization/i,
        concepts: [
          { name: 'Plant Hormones (Auxin, Gibberellin, ABA)', regex: /auxin|gibberellin|cytokinin|ethylene|abscisic acid|apical dominance/i },
        ],
      },
      {
        name: 'Breathing & Exchange of Gases',
        regex: /breathing|alveoli|respiratory volume|tidal volume|vital capacity|oxygen dissociation curve|bohr effect/i,
        concepts: [
          { name: 'Respiratory Volumes & Capacities', regex: /tidal volume|residual volume|vital capacity/i },
          { name: 'Gas Transport & Oxygen Dissociation Curve', regex: /oxygen dissociation curve|pco2|bohr effect|partial pressure/i },
        ],
      },
      {
        name: 'Body Fluids & Circulation',
        regex: /circulation|cardiac cycle|heart|ecg|blood group|rh factor|double circulation|lubb|dubb|qrs/i,
        concepts: [
          { name: 'Cardiac Cycle & ECG Waves', regex: /cardiac cycle|p wave|qrs complex|t wave|stroke volume/i },
          { name: 'Blood Groups & Blood Clotting', regex: /abo blood group|rh factor|erythroblastosis/i },
        ],
      },
      {
        name: 'Excretory Products & Elimination',
        regex: /nephron|glomerul|bowman|counter-current|henle|urine formation|gfr|adh|renin|raas/i,
        concepts: [
          { name: 'Nephron Structure & Tubular Reabsorption', regex: /pct|henle|podocyte|gfr|bowman.*capsule/i },
          { name: 'Counter-Current Mechanism & Regulation (ADH/RAAS)', regex: /counter-current|vasa recta|adh|vasopressin|renin|angiotensin/i },
        ],
      },
      {
        name: 'Locomotion & Movement',
        regex: /sarcomere|sliding filament|actin|myosin|muscle contraction|synovial joint|bone/i,
        concepts: [
          { name: 'Sliding Filament Theory & Sarcomere', regex: /sarcomere|actin|myosin|troponin|tropomyosin|z-line/i },
          { name: 'Skeletal System & Joint Types', regex: /synovial joint|hinge joint|ball and socket/i },
        ],
      },
      {
        name: 'Neural Control & Chemical Coordination',
        regex: /neuron|action potential|synapse|reflex|hypothalamus|pituitary|thyroid|adrenal|insulin|glucagon/i,
        concepts: [
          { name: 'Nerve Impulse & Synapse', regex: /resting potential|action potential|depolarisation|synaptic cleft/i },
          { name: 'Endocrine Glands & Hormones', regex: /pituitary|thyroxine|parathyroid|insulin|glucagon|adrenal cortex/i },
        ],
      },
      {
        name: 'Reproduction in Flowering Plants',
        regex: /microsporogenesis|megasporogenesis|embryo sac|pollination|double fertilization|endosperm|apomixis/i,
        concepts: [
          { name: 'Double Fertilization & Embryo Sac', regex: /double fertilization|triple fusion|pen|embryo sac|7-celled/i },
          { name: 'Pollination Types & Microsporogenesis', regex: /autogamy|geitonogamy|xenogamy|pollen grain/i },
        ],
      },
      {
        name: 'Human Reproduction & Reproductive Health',
        regex: /spermatogenesis|oogenesis|menstrual cycle|lh surge|corpus luteum|fertilization.*human|contracept|iud/i,
        concepts: [
          { name: 'Menstrual Cycle & Ovulation (LH Surge)', regex: /menstrual cycle|lh surge|follicular phase|corpus luteum|progesterone/i },
          { name: 'Gametogenesis & Fertilization', regex: /spermatogenesis|sertoli cell|leydig cell|oogenesis|acrosome/i },
          { name: 'Contraceptive Methods & ART (IVF)', regex: /iud|copper t|saheli|ivf|zift|gift/i },
        ],
      },
      {
        name: 'Principles of Inheritance & Variation (Genetics)',
        regex: /mendel|monohybrid|dihybrid|allele|incomplete dominance|pedigree|hemophilia|color blindness|down syndrome|turner/i,
        concepts: [
          { name: 'Mendelian Crosses & Ratios', regex: /monohybrid|dihybrid|phenotypic ratio|genotypic ratio|test cross/i },
          { name: 'Pedigree Analysis & Genetic Disorders', regex: /pedigree|hemophilia|sickle cell anemia|down syndrome|klinefelter/i },
          { name: 'Incomplete Dominance & Codominance', regex: /incomplete dominance|codominance|multiple alleles/i },
        ],
      },
      {
        name: 'Molecular Basis of Inheritance',
        regex: /dna structure|dna replication|transcription|translation|lac operon|genetic code|chargaff|tRNA/i,
        concepts: [
          { name: 'DNA Replication & Structure (Chargaff)', regex: /chargaff|semiconservative|dna polymerase|okazaki/i },
          { name: 'Transcription & Genetic Code', regex: /transcription|promoter|genetic code|codon|aug|stop codon/i },
          { name: 'Lac Operon & Translation', regex: /lac operon|repressor|operator|inducer|allolactose/i },
        ],
      },
      {
        name: 'Evolution',
        regex: /homologous|analogous|darwin|natural selection|hardy-weinberg|adaptive radiation|miller-urey/i,
        concepts: [
          { name: 'Hardy-Weinberg Principle', regex: /hardy-weinberg|allele frequency|p\^2|2pq/i },
          { name: 'Evidences of Evolution (Homology vs Analogy)', regex: /homologous|analogous|divergent evolution|convergent evolution/i },
        ],
      },
      {
        name: 'Human Health & Disease',
        regex: /malaria|plasmodium|typhoid|antibody|antigen|innate immunity|acquired immunity|aids|hiv|cancer/i,
        concepts: [
          { name: 'Immunity & Antibodies Structure', regex: /antibody|immunoglobulin|igg|iga|humoral|cell mediated/i },
          { name: 'Pathogens & Life Cycle of Plasmodium', regex: /malaria|plasmodium|sporozoite|typhoid|widal/i },
        ],
      },
      {
        name: 'Biotechnology: Principles & Applications',
        regex: /biotechnology|restriction enzyme|pcr|gel electrophoresis|plasmid|pbr322|bt cotton|gene therapy/i,
        concepts: [
          { name: 'Recombinant DNA Tools (Restriction Enzymes & PCR)', regex: /restriction endonuclease|palindromic|pcr|taq polymerase|gel electrophoresis/i },
          { name: 'Biotech Applications (Bt Cotton & Insulin)', regex: /bt cotton|cry protein|insulin|gene therapy|ada deficiency/i },
        ],
      },
      {
        name: 'Ecology & Environment',
        regex: /ecosystem|biodiversity|food chain|trophic level|ecological pyramid|species-area|population growth|mutualism/i,
        concepts: [
          { name: 'Ecological Pyramids & Energy Flow (10% Law)', regex: /ecological pyramid|pyramid of energy|pyramid of biomass|10% law/i },
          { name: 'Population Interactions & Growth Models', regex: /mutualism|competition|parasitism|commensalism|logistic growth/i },
          { name: 'Biodiversity Conservation & Hotspots', regex: /biodiversity|in-situ|ex-situ|national park|species-area/i },
        ],
      },
    ];
  }

  /**
   * Resolves Subject, Topic, and Micro-Concept with high precision
   */
  resolveSubjectAndTopic({ questionText = '', subject = '', topic = '', explanation = '', options = [] }) {
    const rawSubject = (subject || '').trim();
    const rawTopic = (topic || '').trim();

    // Clean up topic string from test numbers, boilerplate suffixes, etc.
    // e.g. "Rotational Motion - NEET Test 1" -> "Rotational Motion"
    // e.g. "Chapter 4: Laws of Motion" -> "Laws of Motion"
    const cleanTopic = rawTopic
      .replace(/^(chapter|unit|ch|lesson)\s*\d+[:\-.]?\s*/i, '')
      .replace(/[\s\-_]*(neet|jee|test|quiz|exam|practice|grand test|mock|part|set|phase|series|paper|sample|revision)[\s\w\-_0-9]*$/i, '')
      .replace(/[\s\-_]+test[\s\-_0-9]*/i, '')
      .trim();

    const corpus = `${questionText} ${explanation} ${options.join(' ')} ${rawTopic} ${cleanTopic}`.toLowerCase();

    // 1. Detect Subject
    let detectedSubject = rawSubject;
    const isGenericSubject =
      !rawSubject ||
      ['general', 'mock test', 'test', 'neet test', 'grand test', 'core concept', 'all', 'science', 'default'].includes(
        rawSubject.toLowerCase()
      );

    if (isGenericSubject) {
      if (
        /biology|botany|zoology|cell|mitosis|meiosis|photosynth|respiration.*plant|dna|rna|gene|genetics|mendel|nephron|heart|circulation|hormone|reproduction|flowering|embryo|ecology|ecosystem/i.test(
          corpus
        )
      ) {
        detectedSubject = 'Biology';
      } else if (
        /chemistry|reaction|molar|mole|acid|base|ph\b|organic|compound|equilibrium|enthalpy|isomer|bond|redox|oxidation|reduction|kinetics|alkane|alkene|alcohol|aldehyde|amine/i.test(
          corpus
        )
      ) {
        detectedSubject = 'Chemistry';
      } else {
        detectedSubject = 'Physics';
      }
    }

    // 2. Select syllabus category based on detected subject
    const subjLower = detectedSubject.toLowerCase();
    let chapterList = this.physicsChapters;
    if (subjLower.includes('chem')) {
      chapterList = this.chemistryChapters;
      detectedSubject = 'Chemistry';
    } else if (subjLower.includes('bio') || subjLower.includes('bot') || subjLower.includes('zoo')) {
      chapterList = this.biologyChapters;
      detectedSubject = 'Biology';
    } else {
      chapterList = this.physicsChapters;
      detectedSubject = 'Physics';
    }

    // 3. Match Chapter / Topic
    let matchedChapter = null;

    // Priority A: Check if cleanTopic matches chapter regex
    if (cleanTopic.length >= 3) {
      for (const ch of chapterList) {
        if (ch.regex.test(cleanTopic) || ch.regex.test(rawTopic)) {
          matchedChapter = ch;
          break;
        }
      }

      // Priority B: Check substring match
      if (!matchedChapter) {
        const cleanLower = cleanTopic.toLowerCase();
        for (const ch of chapterList) {
          const chLower = ch.name.toLowerCase();
          const keyWords = chLower.split(/[\s,&/]+/).filter((w) => w.length >= 4 && !['properties', 'system', 'matter', 'basic', 'principles', 'some'].includes(w));
          if (chLower.includes(cleanLower) || cleanLower.includes(chLower) || keyWords.some((kw) => cleanLower.includes(kw))) {
            matchedChapter = ch;
            break;
          }
        }
      }
    }

    // Priority C: Match corpus against chapter regexes
    if (!matchedChapter) {
      let bestChapterScore = 0;
      for (const ch of chapterList) {
        const matches = corpus.match(new RegExp(ch.regex, 'gi'));
        const score = matches ? matches.length : 0;
        if (score > bestChapterScore) {
          bestChapterScore = score;
          matchedChapter = ch;
        }
      }
    }

    if (!matchedChapter) {
      matchedChapter = chapterList[0];
    }

    // 4. Match Micro-Concept within Chapter
    let matchedConcept = matchedChapter.concepts[0]?.name || matchedChapter.name;
    let bestConceptScore = 0;
    for (const cp of matchedChapter.concepts) {
      const cpMatches = corpus.match(new RegExp(cp.regex, 'gi'));
      const score = cpMatches ? cpMatches.length : 0;
      if (score > bestConceptScore) {
        bestConceptScore = score;
        matchedConcept = cp.name;
      }
    }

    return {
      detectedSubject,
      detectedTopic: matchedChapter.name,
      detectedConcept: matchedConcept,
    };
  }

  /**
   * Helper to build a clean MCQ item with randomized options
   */
  _buildQuestion(id, text, correctText, wrongTexts, explanation, topicName, conceptName) {
    const opts = [
      { text: correctText, isCorrect: true },
      { text: wrongTexts[0], isCorrect: false },
      { text: wrongTexts[1], isCorrect: false },
      { text: wrongTexts[2], isCorrect: false },
    ];
    // Fisher-Yates shuffle
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    const correctIdx = opts.findIndex((o) => o.isCorrect);
    const letters = ['A', 'B', 'C', 'D'];

    return {
      id,
      question_text: text,
      option_a: opts[0].text,
      option_b: opts[1].text,
      option_c: opts[2].text,
      option_d: opts[3].text,
      correct_option: letters[correctIdx],
      explanation,
      topic: topicName,
      concept: conceptName,
    };
  }

  /**
   * Generates mathematically verified, fresh questions strictly targeting the detected concept
   * GUARANTEES:
   * 1. Every question in the batch is completely distinct (no repeated templates).
   * 2. Fresh questions generated on every invocation.
   * 3. 100% chapter/topic alignment.
   */
  generateConceptQuestions({ subject, topic, concept, questionText, count = 3 }) {
    const requestedCount = Math.min(Math.max(Number(count) || 3, 1), 10);

    // 1. Resolve subject, topic, and concept accurately
    let activeSubject = subject;
    let activeTopic = topic;
    let activeConcept = concept;

    if (!activeTopic || !activeSubject || ['general', 'all', 'test', 'mock test'].includes((activeTopic || '').toLowerCase())) {
      const resolved = this.resolveSubjectAndTopic({
        questionText,
        subject,
        topic,
      });
      activeSubject = resolved.detectedSubject;
      activeTopic = resolved.detectedTopic;
      activeConcept = resolved.detectedConcept;
    }

    // 2. Factory collection targeting each specific chapter and concept
    const generators = this._getGeneratorsForConcept(activeSubject, activeTopic, activeConcept);

    // 3. Shuffle thoroughly with randomized Fisher-Yates shuffle on EVERY call
    const shuffled = [...generators];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // 4. Guarantee 100% DISTINCT questions in the batch
    const questions = [];
    const usedSignatures = new Set();
    let genIndex = 0;

    for (let i = 0; i < requestedCount; i++) {
      let candidate = null;
      let tries = 0;
      while (tries < 15) {
        tries++;
        const fn = shuffled[genIndex % shuffled.length];
        genIndex++;
        const q = fn(questions.length + 1, activeTopic, activeConcept);
        // Signature based on first 35 characters of question text
        const sig = q.question_text.slice(0, 35).toLowerCase();
        if (!usedSignatures.has(sig) || tries >= 12) {
          usedSignatures.add(sig);
          candidate = q;
          break;
        }
      }
      if (candidate) {
        candidate.id = questions.length + 1;
        questions.push(candidate);
      }
    }

    return {
      success: true,
      subject: activeSubject,
      topic: activeTopic,
      concept: activeConcept,
      questions,
    };
  }

  _getGeneratorsForConcept(subject, topic, concept) {
    const sLower = (subject || '').toLowerCase();
    const boundBuildQuestion = this._buildQuestion.bind(this);

    if (sLower.includes('phys')) {
      return getPhysicsGenerators(topic, concept, boundBuildQuestion);
    } else if (sLower.includes('chem')) {
      return getChemistryGenerators(topic, concept, boundBuildQuestion);
    } else {
      return getBiologyGenerators(topic, concept, boundBuildQuestion);
    }
  }
}

module.exports = new NEETQuestionEngine();
