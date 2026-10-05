import {
  ConceptItem,
  FamilyProfile,
  QuizQuestion,
  ScreenId,
  SkillNode,
  StoryPanelData,
} from '../types';

export const SCREEN_META: {
  id: ScreenId;
  num: number;
  title: string;
  subtitle: string;
}[] = [
  { id: 'splash', num: 1, title: 'Layar Pembuka', subtitle: 'Logo atom & mulai belajar' },
  { id: 'profile-picker', num: 2, title: 'Pilih Profil', subtitle: 'Siapa yang belajar?' },
  { id: 'home', num: 3, title: 'Beranda / Katalog', subtitle: 'Konsep fisika & matematika' },
  { id: 'concept-detail', num: 4, title: 'Detail Konsep', subtitle: 'Gerak Parabola · L0–L5' },
  { id: 'story', num: 5, title: 'Cerita Bergambar', subtitle: 'Panel 3 dari 6 cerita visual' },
  { id: 'simulation', num: 6, title: 'Simulasi Interaktif', subtitle: 'Lintasan peluru & sudut 45°' },
  { id: 'quiz', num: 7, title: 'Latihan Kuis', subtitle: 'Soal 2 dari 5 & petunjuk' },
  { id: 'quiz-result', num: 8, title: 'Hasil Kuis', subtitle: 'Skor 80, +24 XP & rekomendasi' },
  { id: 'skill-map', num: 9, title: 'Peta Keterampilan', subtitle: 'Grafik prasyarat konsep' },
  { id: 'progress', num: 10, title: 'Dasbor Progres', subtitle: '12 hari beruntun & 1.240 XP' },
  { id: 'profile-settings', num: 11, title: 'Profil & Pengaturan', subtitle: 'Mode antarmuka & unduhan' },
];

export const INITIAL_PROFILES: FamilyProfile[] = [
  {
    id: 'kirana',
    name: 'Kirana',
    roleLabel: 'Anak · Penjelajah Cilik',
    ageLabel: '9 tahun',
    uiMode: 'Penjelajah',
    level: 'Level 2',
    streakDays: 5,
    xp: 640,
    avatarKey: 'kirana',
    accentBg: '#E1F4FD',
  },
  {
    id: 'dimas',
    name: 'Dimas',
    roleLabel: 'Remaja · Pelajar SMP',
    ageLabel: '14 tahun',
    uiMode: 'Pelajar',
    level: 'Level 4',
    streakDays: 8,
    xp: 980,
    avatarKey: 'dimas',
    accentBg: '#FEF3C7',
  },
  {
    id: 'ratna',
    name: 'Bu Ratna',
    roleLabel: 'Orang Tua · Pendamping',
    ageLabel: '38 tahun',
    uiMode: 'Pelajar',
    level: 'Level 3',
    streakDays: 12,
    xp: 1240,
    avatarKey: 'ratna',
    accentBg: '#DCFCE7',
  },
  {
    id: 'arya',
    name: 'Arya',
    roleLabel: 'Dewasa Muda · Mahasiswa',
    ageLabel: '20 tahun',
    uiMode: 'Ahli',
    level: 'Level 5',
    streakDays: 15,
    xp: 2150,
    avatarKey: 'arya',
    accentBg: '#E0E7FF',
  },
];

export const CONCEPTS_LIST: ConceptItem[] = [
  {
    id: 'gerak-parabola',
    title: 'Gerak Parabola',
    category: 'Fisika',
    level: 'L2',
    progress: 60,
    summary: 'Rahasia lintasan melengkung saat bola dilempar ke udara.',
    iconKey: 'parabola',
    badges: ['cerita', 'simulasi', 'studi kasus'],
    status: 'dipelajari',
  },
  {
    id: 'momentum-tumbukan',
    title: 'Momentum & Tumbukan',
    category: 'Fisika',
    level: 'L2',
    progress: 25,
    summary: 'Mengapa kelereng yang bertabrakan saling bertukar kecepatan?',
    iconKey: 'momentum',
    badges: ['cerita', 'simulasi'],
    status: 'tersedia',
  },
  {
    id: 'pecahan-persen',
    title: 'Pecahan & Persen',
    category: 'Matematika',
    level: 'L1',
    progress: 45,
    summary: 'Membagi kue lapis legit secara adil dan menghitung diskon.',
    iconKey: 'persen',
    badges: ['cerita', 'studi kasus'],
    status: 'ulangi',
  },
  {
    id: 'hukum-newton',
    title: 'Hukum Newton',
    category: 'Fisika',
    level: 'L1',
    progress: 100,
    summary: 'Dorongan, tarikan, dan alasan sepeda bisa melaju kencang.',
    iconKey: 'newton',
    badges: ['cerita', 'simulasi', 'studi kasus'],
    status: 'dikuasai',
  },
  {
    id: 'geometri-ruang',
    title: 'Geometri Ruang',
    category: 'Matematika',
    level: 'L0',
    progress: 80,
    summary: 'Mengenal bentuk atap rumah adat, kubus, dan bola di sekitar kita.',
    iconKey: 'geometri',
    badges: ['cerita', 'simulasi'],
    status: 'dikuasai',
  },
  {
    id: 'energi-usaha',
    title: 'Energi & Usaha',
    category: 'Fisika',
    level: 'L3',
    progress: 15,
    summary: 'Perubahan energi gerak air terjun menjadi cahaya lampu di rumah.',
    iconKey: 'energi',
    badges: ['simulasi', 'studi kasus'],
    status: 'tersedia',
  },
];

export const LEVEL_DESCRIPTIONS: Record<
  'L0' | 'L1' | 'L2' | 'L3' | 'L4' | 'L5',
  { name: string; ageTarget: string; desc: string; duration: string }
> = {
  L0: {
    name: 'Kenalan Sambil Bermain',
    ageTarget: 'Usia 6–8 thn',
    desc: 'Mengamati lengkungan air selang taman dan lemparan bola tanpa angka rumit.',
    duration: '8 menit',
  },
  L1: {
    name: 'Konsep Dasar Lintasan',
    ageTarget: 'Usia 8–10 thn',
    desc: 'Memahami mengapa benda yang dilempar naik lalu turun kembali karena gravitasi.',
    duration: '12 menit',
  },
  L2: {
    name: 'Sudut & Kecepatan Awal',
    ageTarget: 'Usia 10–13 thn · Aktif',
    desc: 'Menemukan sudut terbaik (45°) agar lemparan mencapai jarak paling jauh.',
    duration: '15 menit',
  },
  L3: {
    name: 'Vektor & Rumus Jangkauan',
    ageTarget: 'Remaja SMP/SMA',
    desc: 'Menguraikan kecepatan sumbu mendatar (vx) dan tegak (vy) secara matematis.',
    duration: '18 menit',
  },
  L4: {
    name: 'Persamaan Kuadrat & Waktu',
    ageTarget: 'SMA / Lanjutan',
    desc: 'Menghitung tinggi maksimum dan waktu tempuh dengan fungsi kuadrat waktu.',
    duration: '20 menit',
  },
  L5: {
    name: 'Rekayasa & Hambatan Udara',
    ageTarget: 'Dewasa / Ahli',
    desc: 'Simulasi balistik nyata, gaya hambat udara, dan peluncuran wahana antariksa.',
    duration: '25 menit',
  },
};

export const STORY_METADATA = {
  judul: 'Lengkungan Pelangi untuk Mangga Manis',
  sinopsis:
    'Kirana dan Kak Dimas belajar bahwa melempar dengan sabar pada sudut yang tepat membuat bola melengkung indah tepat ke sasaran.',
};

export const STORY_PANELS: StoryPanelData[] = [
  {
    panelNumber: 1,
    title: 'Pagi Cerah di Kebun Belakang',
    caption:
      'Matahari pagi mengintip hangat di sela daun pohon mangga halaman rumah. Kirana menengadah sambil memegang keranjang bambu kecilnya, menatap buah mangga harum manis yang matang keemasan di dahan seberang kolam kecil.',
    speaker: 'Kirana',
    dialogue: 'Kak Dimas, kalau aku lempar bola karet ini lurus mendatar, kenapa bolanya selalu jatuh ke air sebelum sampai di keranjang seberang?',
    visualPrompt:
      'Ilustrasi vektor datar buku cerita anak Indonesia yang ceria: gadis kecil 9 tahun (Kirana) memegang keranjang bambu di taman tropis cerah dengan pohon mangga berbuah kuning hangat (#FFC53D) dan langit biru muda (#89CFF0).',
  },
  {
    panelNumber: 2,
    title: 'Rahasia Dua Gerakan Sekaligus',
    caption:
      'Kak Dimas tersenyum lalu menggambar garis lengkung di tanah menggunakan ranting kayu. Setiap benda yang terbang punya dua teman perjalanan: dorongan maju yang rajin melangkah, dan tarikan bumi yang lembut mengajak turun.',
    speaker: 'Kak Dimas',
    dialogue: 'Bayangkan bolamu sedang berjalan maju sekaligus ditarik pelan oleh bumi, Kirana. Kalau terlalu rendah, ia cepat menyentuh tanah!',
    visualPrompt:
      'Ilustrasi vektor datar buku cerita anak: remaja laki-laki ramah (Dimas) menunjuk diagram dua anak panah biru dan kuning di atas rumput hijau lembut, dengan Kirana memperhatikan penuh rasa ingin tahu.',
  },
  {
    panelNumber: 3,
    title: 'Lengkungan Emas Sudut Empat Puluh Lima',
    caption:
      'Kirana menarik napas pelan, lalu mengarahkan tangannya miring tepat di tengah-tengah antara lurus dan tegak lurus. Wuuussh! Bola melambung tinggi membentuk jembatan pelangi di udara, lalu mendarat mulus di dalam keranjang seberang!',
    speaker: 'Kirana',
    dialogue: 'Lihat Kak! Saat kuarahkan miring 45 derajat, bolanya terbang melengkung seperti jembatan pelangi dan sampai paling jauh!',
    visualPrompt:
      'Ilustrasi vektor datar buku cerita anak Indonesia: bola berwarna kuning hangat (#FFC53D) meluncur melewati garis lengkung parabola titik-titik biru langit (#89CFF0) menuju keranjang sasaran di seberang taman.',
    formulaHint: 'Sudut 45° menghasilkan jangkauan mendatar terjauh!',
  },
  {
    panelNumber: 4,
    title: 'Titik Puncak yang Tenang',
    caption:
      'Di puncak tertinggi lengkungan itu, bola seolah berhenti naik sejenak untuk menyapa awan putih sebelum meluncur turun. Semakin cepat lemparan awalnya, semakin gagah dan tinggi lengkungan yang tercipta.',
    speaker: 'Bu Ratna',
    dialogue: 'Persis seperti air mancur di taman kota, ya! Semakin kuat pompa airnya, semakin tinggi dan jauh pancuran airnya menari.',
    visualPrompt:
      'Ilustrasi vektor datar ceria: Bu Ratna bersama Kirana melihat bola berada tepat di puncak lintasan parabola dengan kilauan bintang kuning hangat di langit biru muda.',
  },
  {
    panelNumber: 5,
    title: 'Terlalu Tinggi atau Terlalu Rendah?',
    caption:
      'Kirana mencoba melempar hampir tegak lurus ke atas. Bola memang naik tinggi sekali, tetapi jatuh kembali dekat kakinya. Ternyata, sudut rendah dan sudut tinggi yang berjumlah sembilan puluh derajat bisa jatuh di jarak yang sama!',
    speaker: 'Kak Dimas',
    dialogue: 'Hebat! Sudut 30 derajat dan 60 derajat punya jarak jatuh yang kembar, tapi sudut 45 derajat tetap juaranya.',
    visualPrompt:
      'Ilustrasi vektor datar edukatif: tiga lintasan lengkung parabola berbeda warna (30°, 45°, 60°) dari tangan Kirana menuju lapangan rumput hijau.',
  },
  {
    panelNumber: 6,
    title: 'Saatnya Mencoba di Laboratorium!',
    caption:
      'Kini Kirana mengerti bahwa sains bukan sekadar angka di papan tulis, melainkan irama alam yang bisa dirasakan saat bermain. Ia pun siap menguji pelontar bola di simulasi bersama keluarga!',
    speaker: 'Kirana',
    dialogue: 'Ayo kita atur sudut 45 derajat dan kecepatan 20 meter per detik di simulasi sekarang!',
    visualPrompt:
      'Ilustrasi vektor datar seluruh keluarga (Kirana, Dimas, Bu Ratna, Arya) tersenyum hangat di sekitar alat pelontar bola warna biru tua (#1E6FB8) dan kuning (#FFC53D).',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question:
      'Mengapa lintasan bola yang dilempar miring ke udara berbentuk melengkung (parabola), bukan garis lurus?',
    contextNote: 'Konsep Dasar · Gaya pada Gerak Parabola',
    options: [
      { id: 'A', label: 'A', text: 'Karena bumi menarik bola ke bawah dengan gaya gravitasi' },
      { id: 'B', label: 'B', text: 'Karena bola kehabisan berat saat berada di udara' },
      { id: 'C', label: 'C', text: 'Karena awan mendorong bola kembali ke tanah' },
      { id: 'D', label: 'D', text: 'Karena kecepatan mendatarnya langsung berhenti di awal' },
    ],
    correctOptionId: 'A',
    hint: 'Ingat cerita Kak Dimas: ada tarikan lembut dari bumi yang selalu mengajak benda turun.',
    explanation:
      'Tepat sekali! Gerak maju berpadu dengan tarikan gravitasi bumi ke bawah sehingga lintasannya melengkung.',
  },
  {
    id: 2,
    question:
      'Jika Kirana ingin melempar bola agar mencapai jarak mendatar paling jauh (tanpa hambatan udara), sudut lemparan manakah yang harus dipilih?',
    contextNote: 'Eksperimen Sudut · Level 2',
    options: [
      { id: 'A', label: 'A', text: '15° (hampir mendatar ke depan)' },
      { id: 'B', label: 'B', text: '45° (tepat di tengah antara mendatar dan tegak)' },
      { id: 'C', label: 'C', text: '75° (sangat curam ke atas)' },
      { id: 'D', label: 'D', text: '90° (tegak lurus ke langit)' },
    ],
    correctOptionId: 'B',
    hint: 'Coba ingat di simulasi tadi: pada sudut berapa nilai sin(2θ) bernilai paling besar sehingga jangkauan mencapai 40,8 m?',
    explanation:
      'Hebat! Sudut 45° menyeimbangkan kecepatan maju dan waktu melayang di udara sehingga jangkauan mendatarnya maksimal.',
  },
  {
    id: 3,
    question:
      'Pada simulasi dengan sudut 45° dan kecepatan awal 20 m/s (g = 9,8 m/s²), berapakah jangkauan terjauh yang dicapai bola?',
    contextNote: 'Perhitungan Simulasi · Level 2',
    options: [
      { id: 'A', label: 'A', text: '20,4 meter' },
      { id: 'B', label: 'B', text: '40,8 meter' },
      { id: 'C', label: 'C', text: '60,0 meter' },
      { id: 'D', label: 'D', text: '10,2 meter' },
    ],
    correctOptionId: 'B',
    hint: 'Gunakan rumus R = (v² · sin 90°) / 9,8 = 400 / 9,8.',
    explanation:
      'Benar! Dengan v = 20 m/s dan sudut 45°, R = 400 / 9,8 = 40,8 meter.',
  },
  {
    id: 4,
    question:
      'Apa yang terjadi pada kecepatan arah tegak (vertikal) bola tepat ketika bola berada di titik puncak tertinggi?',
    contextNote: 'Titik Puncak · Level 2',
    options: [
      { id: 'A', label: 'A', text: 'Bernilai paling cepat' },
      { id: 'B', label: 'B', text: 'Bernilai nol sesaat sebelum berbalik turun' },
      { id: 'C', label: 'C', text: 'Berubah menjadi gaya dorong mesin' },
      { id: 'D', label: 'D', text: 'Sama dengan kecepatan cahaya' },
    ],
    correctOptionId: 'B',
    hint: 'Di titik paling atas, bola berhenti naik sejenak sebelum mulai turun.',
    explanation:
      'Betul! Di titik puncak tertinggi, kecepatan vertikal (vy) bernilai 0 m/s, sedangkan kecepatan mendatar (vx) tetap berjalan.',
  },
  {
    id: 5,
    question:
      'Pasangan sudut manakah yang akan menghasilkan jarak jatuh mendatar yang sama jauhnya jika dilempar dengan kecepatan sama?',
    contextNote: 'Simetri Sudut · Level 2',
    options: [
      { id: 'A', label: 'A', text: 'Sudut 30° dan sudut 60°' },
      { id: 'B', label: 'B', text: 'Sudut 10° dan sudut 45°' },
      { id: 'C', label: 'C', text: 'Sudut 45° dan sudut 90°' },
      { id: 'D', label: 'D', text: 'Sudut 20° dan sudut 25°' },
    ],
    correctOptionId: 'A',
    hint: 'Cari dua sudut yang jika dijumlahkan hasilnya tepat 90°!',
    explanation:
      'Luar biasa! Dua sudut yang berjumlah 90° (seperti 30° + 60° = 90°) menghasilkan jangkauan mendatar yang identik.',
  },
];

export const SKILL_NODES: SkillNode[] = [
  {
    id: 'bilangan-operasi',
    title: 'Bilangan & Operasi',
    category: 'Matematika',
    level: 'L0',
    status: 'dikuasai',
    progress: 100,
    x: 95,
    y: 70,
    description: 'Fondasi berhitung cepat, penjumlahan, dan pola bilangan sehari-hari.',
    prerequisites: [],
  },
  {
    id: 'gerak-lurus',
    title: 'Gerak Lurus',
    category: 'Fisika',
    level: 'L1',
    status: 'dikuasai',
    progress: 100,
    x: 245,
    y: 70,
    description: 'Memahami jarak, perpindahan, kelajuan, dan percepatan pada lintasan lurus.',
    prerequisites: ['Bilangan & Operasi'],
  },
  {
    id: 'persen-rasio',
    title: 'Persen & Rasio',
    category: 'Matematika',
    level: 'L1',
    status: 'ulangi',
    progress: 45,
    x: 75,
    y: 195,
    description: 'Perbandingan senilai, pecahan perseratus, dan penerapan diskon keluarga.',
    prerequisites: ['Bilangan & Operasi'],
  },
  {
    id: 'vektor-dasar',
    title: 'Vektor Dasar',
    category: 'Fisika',
    level: 'L1',
    status: 'dikuasai',
    progress: 92,
    x: 225,
    y: 195,
    description: 'Besaran yang memiliki nilai sekaligus arah: memadukan langkah mendatar dan tegak.',
    prerequisites: ['Gerak Lurus'],
  },
  {
    id: 'gerak-parabola',
    title: 'Gerak Parabola',
    category: 'Fisika',
    level: 'L2',
    status: 'dipelajari',
    progress: 60,
    x: 170,
    y: 320,
    description: 'Perpaduan gerak lurus beraturan mendatar dan gerak dipercepat gravitasi vertikal.',
    prerequisites: ['Gerak Lurus', 'Vektor Dasar'],
  },
  {
    id: 'trigonometri-dasar',
    title: 'Sudut & Segitiga',
    category: 'Matematika',
    level: 'L2',
    status: 'tersedia',
    progress: 20,
    x: 65,
    y: 330,
    description: 'Mengenal perbandingan sisi segitiga siku-siku (sinus dan kosinus) secara visual.',
    prerequisites: ['Persen & Rasio'],
  },
  {
    id: 'momentum-tumbukan',
    title: 'Momentum & Tumbukan',
    category: 'Fisika',
    level: 'L2',
    status: 'tersedia',
    progress: 0,
    x: 255,
    y: 435,
    description: 'Kekekalan momentum saat dua benda bertumbukan lenting maupun tidak lenting.',
    prerequisites: ['Gerak Parabola'],
  },
  {
    id: 'energi-usaha',
    title: 'Energi & Usaha',
    category: 'Fisika',
    level: 'L3',
    status: 'tersedia',
    progress: 0,
    x: 105,
    y: 445,
    description: 'Hukum kekekalan energi mekanik: energi potensial ketinggian dan energi kinetik gerak.',
    prerequisites: ['Gerak Parabola', 'Sudut & Segitiga'],
  },
];

export const SKILL_EDGES: { from: string; to: string }[] = [
  { from: 'bilangan-operasi', to: 'gerak-lurus' },
  { from: 'bilangan-operasi', to: 'persen-rasio' },
  { from: 'gerak-lurus', to: 'vektor-dasar' },
  { from: 'gerak-lurus', to: 'gerak-parabola' },
  { from: 'vektor-dasar', to: 'gerak-parabola' },
  { from: 'persen-rasio', to: 'trigonometri-dasar' },
  { from: 'gerak-parabola', to: 'momentum-tumbukan' },
  { from: 'gerak-parabola', to: 'energi-usaha' },
  { from: 'trigonometri-dasar', to: 'energi-usaha' },
];

export const MASTERY_BARS = [
  { id: 'gerak-lurus', title: 'Gerak Lurus & Kecepatan', category: 'Fisika · L1', percent: 95, status: 'dikuasai' as const },
  { id: 'vektor-dasar', title: 'Vektor & Arah Gaya', category: 'Fisika · L1', percent: 88, status: 'dikuasai' as const },
  { id: 'geometri-ruang', title: 'Geometri Ruang', category: 'Matematika · L0', percent: 80, status: 'dikuasai' as const },
  { id: 'gerak-parabola', title: 'Gerak Parabola', category: 'Fisika · L2', percent: 60, status: 'dipelajari' as const },
  { id: 'persen', title: 'Persen & Perbandingan', category: 'Matematika · L1', percent: 42, status: 'ulangi' as const },
];

export const BADGE_SHELF = [
  {
    id: 'penjelajah-parabola',
    title: 'Penakluk Lengkungan',
    desc: 'Menyelesaikan simulasi sudut 45° dengan tepat sasaran',
    unlocked: true,
    iconType: 'rocket' as const,
  },
  {
    id: 'api-12-hari',
    title: 'Api 12 Hari',
    desc: 'Belajar rutin bersama keluarga selama 12 hari berturut-turut',
    unlocked: true,
    iconType: 'flame' as const,
  },
  {
    id: 'detektif-rumus',
    title: 'Sahabat Rumus',
    desc: 'Membuka dan mempelajari penurunan rumus fisika L2',
    unlocked: true,
    iconType: 'compass' as const,
  },
  {
    id: 'keluarga-kompak',
    title: 'Keluarga Sains',
    desc: 'Belajar kolaboratif bersama 4 profil anggota keluarga',
    unlocked: true,
    iconType: 'star' as const,
  },
];

export const OFFLINE_PACKAGES = [
  {
    id: 'fisika-l0-l2',
    title: 'Paket Fisika Dasar & Gerak (L0–L2)',
    details: '6 cerita bergambar · 4 simulasi interaktif',
    size: '42,5 MB',
    downloaded: true,
  },
  {
    id: 'matematika-l0-l2',
    title: 'Paket Matematika Visual & Persen',
    details: '5 cerita bergambar · 3 latihan adaptif',
    size: '28,0 MB',
    downloaded: true,
  },
  {
    id: 'studi-kasus-industri',
    title: 'Paket Studi Kasus Industri Nusantara',
    details: 'Ilustrasi satelit, jembatan, & energi terbarukan',
    size: '19,4 MB',
    downloaded: false,
  },
];
