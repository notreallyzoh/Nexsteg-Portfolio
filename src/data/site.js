// ─────────────────────────────────────────────────────────────
//  NEXSTEG — single source of truth for all site content.
//  Edit anything here and it updates everywhere on the site.
// ─────────────────────────────────────────────────────────────

// ⚠️ CONFIRM THESE before going fully live ⚠️
// The source repo mixed several numbers. This is the one your
// contact form actually sent leads to. Swap for the gym's Kuwait
// WhatsApp (digits only, country code first, no +) if different.
export const WHATSAPP = '919656778508'
export const EMAIL = 'info@nexsteg.com'

export const site = {
  name: 'NEXSTEG',
  tagline: 'Never forget your first time',
  established: '2024',
  location: 'Block 1, Street 127, Mahboula, Kuwait',
  email: EMAIL,
  whatsapp: WHATSAPP,
  whatsappDisplay: '+91 96567 78508', // ← display label; confirm/replace
  youtube: 'https://www.youtube.com/embed/-hSma-BRzoo',
  // Real NEXSTEG GYM location embed pulled from the original site
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.443203711182!2d48.112627675308886!3d29.138972875391953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf09004bc502ab%3A0x2317ca13761ed9fe!2sNEXSTEG%20GYM!5e1!3m2!1sen!2sin!4v1753511324296!5m2!1sen!2sin',
  socials: [
    { label: 'Instagram', short: 'IG', href: '#' }, // ← add real handle
    { label: 'Facebook', short: 'FB', href: '#' }, // ← add real handle
  ],
}

export const nav = [
  { label: 'Home', target: 'hero' },
  { label: 'About', target: 'about' },
  { label: 'Training', target: 'services' },
  { label: 'Coaches', target: 'trainers' },
  { label: 'Pricing', target: 'pricing' },
  { label: 'Stories', target: 'stories' },
  { label: 'Visit', target: 'contact' },
]

// Counters for the manifesto / stats band. All truthful to the brand.
export const stats = [
  { value: 2024, suffix: '', label: 'Founded in Kuwait' },
  { value: 9, prefix: '', suffix: '', label: 'Facilities & services' },
  { value: 3, suffix: '', label: 'Expert coaches' },
  { value: 5, suffix: '.0', label: 'Member rating' },
]

export const services = [
  {
    icon: 'dumbbell',
    title: 'Personal Training',
    text: 'Customized programming built around your goals with coaches who track every rep.',
  },
  {
    icon: 'group',
    title: 'Group Classes',
    text: 'High-energy, instructor-led sessions that keep you moving and accountable.',
  },
  {
    icon: 'pulse',
    title: 'Cardio & Strength',
    text: 'State-of-the-art cardio and strength floors for a complete, no-excuses workout.',
  },
  {
    icon: 'leaf',
    title: 'Nutrition Counselling',
    text: 'Professional dietary guidance that fuels the work and makes results stick.',
  },
  {
    icon: 'locker',
    title: 'Locker Rooms',
    text: 'Clean, secure locker rooms with every amenity you need to get in and go.',
  },
  {
    icon: 'snow',
    title: 'Ice Bath',
    text: 'Cut soreness and accelerate recovery with invigorating cold-water therapy.',
  },
  {
    icon: 'sauna',
    title: 'Sauna',
    text: 'Detox and unwind in our dry-heat sauna for deep post-session rejuvenation.',
  },
  {
    icon: 'wave',
    title: 'Jacuzzi',
    text: 'Relax and recover in the warm, therapeutic jacuzzi after a hard session.',
  },
  {
    icon: 'steam',
    title: 'Steam Room',
    text: 'Refresh body and skin with the soothing effects of our steam room.',
  },
]

export const trainers = [
  {
    name: 'Sailesh',
    role: 'Head Coach — Strength & Conditioning',
    bio: 'Over a decade on the floor. Sailesh runs high-output sessions built on results and relentless consistency.',
    img: '/img/coach-sailesh.webp',
  },
  {
    name: 'Naser',
    role: 'Nutrition Coach — Personal Trainer',
    bio: 'Naser engineers science-backed nutrition and habits that stick — tuned for fat loss and real strength.',
    img: '/img/coach-naser.webp',
  },
  {
    name: 'Sarah Mutairi',
    role: 'Yoga & Mobility Trainer',
    bio: 'Sarah leads holistic mobility and yoga work focused on injury prevention and the mind-body connection.',
    img: '/img/coach-sarah.webp',
  },
]

export const plans = [
  {
    term: '1 Month',
    price: 30,
    note: 'Get started',
    perks: ['Full equipment access', 'Locker room', 'Free water'],
    featured: false,
  },
  {
    term: '3 Months',
    price: 60,
    note: 'Build the habit',
    perks: ['Unlimited access', 'Nutritional guidance', 'Free sauna'],
    featured: false,
  },
  {
    term: '6 Months',
    price: 80,
    note: 'Commit',
    perks: ['Personalized workout plan', 'Weekly trainer session', '24/7 support'],
    featured: false,
  },
  {
    term: '12 Months',
    price: 120,
    note: 'Go all in',
    perks: ['Personalized workout plan', 'Weekly trainer session', '24/7 support'],
    featured: true,
  },
]

// Hero transformation feature
export const transformation = {
  name: 'Rana Al-Sabah',
  goal: 'Fat loss & confidence',
  timeframe: '6 months',
  result: '−14 kg',
  plan: 'HIIT + Nutrition',
  coach: 'Aisha Kareem',
  quote:
    'With the support of coach Aisha and the NEXSTEG community, I lost 14 kg and regained a confidence I thought was gone for good.',
  img: '/img/transformation.webp',
}

export const testimonials = [
  {
    name: 'Derek',
    img: '/img/member-derek.webp',
    quote:
      'With NEXSTEG I finally broke through my fitness plateau and hit goals I’d been chasing for years.',
  },
  {
    name: 'Anthony',
    img: '/img/member-anthony.webp',
    quote:
      'NEXSTEG transformed my body and my mind — I gained a strength and confidence I never knew I had.',
  },
  {
    name: 'Jhon',
    img: '/img/member-jhon.webp',
    quote:
      'The coaching and the community carried me. NEXSTEG is the reason I kept showing up.',
  },
  {
    name: 'Ezekiel',
    img: '/img/member-ezekiel.webp',
    quote:
      'I went from drained to energized through NEXSTEG’s personalized workouts and nutrition.',
  },
]

