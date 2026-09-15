/**
 * DATA PANITIA DAN DIVISI PARAMPA 2026-2027
 * Berisi seluruh nama staf yang lolos open recruitment, informasi divisi, dan kontak koordinator.
 */

const PARAMPA_CONFIG = {
  eventName: "PARAMPA 2026-2027",
  themeTitle: "WE'RE BACK! THE PIRATE EXPEDITION",
  organizer: "FPMIPA Universitas Pendidikan Indonesia",
  year: "2026-2027",
  waGroupGeneral: "https://chat.whatsapp.com/invite/PARAMPA2027GeneralFleet",
  helpdesk: {
    name: "Diki",
    phone: "6283867125858",
    role: "Helpdesk PARAMPA 2026-2027"
  },
  ketuaPelaksana: {
    name: "Kapten Pelaksana PARAMPA",
    phone: "6281234567891",
    role: "Ketua Pelaksana PARAMPA 2026-2027"
  }
};

const PRODI_LIST = [
  "Biologi",
  "Fisika",
  "Ilmu Komputer",
  "IPSE",
  "Kimia",
  "Matematika",
  "Pendidikan Biologi",
  "Pendidikan Fisika",
  "Pendidikan Ilmu Komputer",
  "Pendidikan Kimia",
  "Pendidikan Matematika"
];

const DIVISIONS = {
  "SEKRETARIS": {
    id: "sekretaris",
    name: "Sekretaris",
    badge: "📜 Fleet Scribes",
    icon: "fa-scroll",
    color: "#eab308",
    description: "Mengelola persuratan, administrasi armada, perizinan, notulensi rapat akbar, dan tata kelola arsip resmi PARAMPA 2026-2027.",
    coordinator: {
      name: "Nayla",
      phone: "6285694159733",
      role: "Sekretaris PARAMPA 2026-2027"
    }
  },
  "BENDAHARA": {
    id: "bendahara",
    name: "Bendahara",
    badge: "💰 Treasure Keepers",
    icon: "fa-coins",
    color: "#f59e0b",
    description: "Mengelola arus peti kas, anggaran per divisi, transparansi keuangan, dan sirkulasi dana operasional petualangan PARAMPA.",
    coordinator: {
      name: "Amanda",
      phone: "6281223203674",
      role: "Bendahara PARAMPA 2026-2027"
    }
  },
  "ACARA PERLOMBAAN": {
    id: "acara-perlombaan",
    name: "Acara Perlombaan",
    badge: "⚔️ Arena Navigators",
    icon: "fa-trophy",
    color: "#ef4444",
    description: "Merancang konsep teknis kompetisi, aturan main perlombaan, juri, penilaian, dan memandu jalannya arena persaingan maritim.",
    coordinator: {
      name: "Ryan",
      phone: "62895385854623",
      role: "Koordinator Acara Perlombaan"
    }
  },
  "ACARA OPENING CLOSING": {
    id: "acara-opening-closing",
    name: "Acara Opening & Closing",
    badge: "🎭 Gala Festivities",
    icon: "fa-masks-theater",
    color: "#ec4899",
    description: "Meramu pertunjukan megah pembukaan dan penutupan pesta PARAMPA, panggung hiburan, seremonial bendera bajak laut, dan penampilan spesial.",
    coordinator: {
      name: "Dinda",
      phone: "628970634900",
      role: "Koordinator Acara Opening & Closing"
    }
  },
  "HUMAS": {
    id: "humas",
    name: "Humas",
    badge: "📢 Fleet Emissaries",
    icon: "fa-bullhorn",
    color: "#3b82f6",
    description: "Menjadi garda terdepan komunikasi luar armada, penghubung antar-instansi, undangan sekolah/kampus, publikasi relasi, dan media partner.",
    coordinator: {
      name: "Kamila",
      phone: "6282319548380",
      role: "Koordinator Divisi Humas"
    }
  },
  "MEDIS": {
    id: "medis",
    name: "Medis",
    badge: "🩺 Fleet Surgeons",
    icon: "fa-briefcase-medical",
    color: "#10b981",
    description: "Menjaga kebugaran, kesehatan, dan keselamatan seluruh awak kru kapal serta peserta petualangan sepanjang rute PARAMPA 2026-2027.",
    coordinator: {
      name: "Hamdi",
      phone: "6282288206271",
      role: "Koordinator Divisi Medis"
    }
  },
  "SPEKTATOR LOGISTIK": {
    id: "spektator-logistik",
    name: "Spektator & Logistik",
    badge: "⚓ Quartermasters & Riggers",
    icon: "fa-anchor",
    color: "#8b5cf6",
    description: "Menyiapkan perlengkapan panggung, tata letak lokasi, akomodasi penonton, pergerakan massa suporter, serta logistik kapal.",
    coordinator: {
      name: "Arif",
      phone: "6281316411445",
      role: "Koordinator Spektator & Logistik"
    }
  },
  "SPONSOR DANA USAHA": {
    id: "sponsor-dana-usaha",
    name: "Sponsor & Dana Usaha",
    badge: "💎 Merchants & Buccaneers",
    icon: "fa-gem",
    color: "#14b8a6",
    description: "Menghimpun pundi-pundi emas melalui kerja sama kemitraan sponsor eksternal, bazar wirausaha kreatif, merchandise, dan fundraising armada.",
    coordinator: {
      name: "Kahla",
      phone: "6285797904702",
      role: "Koordinator Sponsor & Dana Usaha"
    }
  },
  "PDDD": {
    id: "pddd",
    name: "PDDD",
    badge: "🎨 Visual Chroniclers",
    icon: "fa-camera-retro",
    color: "#f97316",
    description: "Mengabadikan setiap momentum petualangan maritim lewat lensa foto & video, visual branding bajak laut yang memukau, feed media sosial, dan dekorasi megah.",
    coordinator: {
      name: "Syakira",
      phone: "6287726836023",
      role: "Koordinator Divisi PDDD"
    }
  }
};

const STAFF_MEMBERS = [
  // SEKRETARIS
  { no: 1, name: "Carissa Haifa Ramadhani", nim: "2503686", prodi: "Pendidikan Matematika", division: "SEKRETARIS" },
  { no: 2, name: "Mohammad Zaidan Miftahul Falah", nim: "2406641", prodi: "Fisika", division: "SEKRETARIS" },

  // BENDAHARA
  { no: 1, name: "Chery Tio Madeline Simanjuntak", nim: "2605203", prodi: "Pendidikan Matematika", division: "BENDAHARA" },

  // ACARA PERLOMBAAN
  { no: 1, name: "Adiba Adzkia Azzahra", nim: "2508556", prodi: "Pendidikan Ilmu Komputer", division: "ACARA PERLOMBAAN" },
  { no: 2, name: "Aisya Shafa Fahira", nim: "2506419", prodi: "Pendidikan Ilmu Komputer", division: "ACARA PERLOMBAAN" },
  { no: 3, name: "Alifian Nur Fadilah", nim: "2500186", prodi: "Fisika", division: "ACARA PERLOMBAAN" },
  { no: 4, name: "Alya Mulyani", nim: "2600465", prodi: "Pendidikan Ilmu Komputer", division: "ACARA PERLOMBAAN" },
  { no: 5, name: "Anisa Ramadani", nim: "2608415", prodi: "Pendidikan Ilmu Komputer", division: "ACARA PERLOMBAAN" },
  { no: 6, name: "Arika Rifda Ranasari", nim: "2508073", prodi: "Biologi", division: "ACARA PERLOMBAAN" },
  { no: 7, name: "Aulia Secha Farzana", nim: "2601481", prodi: "Biologi", division: "ACARA PERLOMBAAN" },
  { no: 8, name: "Aulia Shinta Pratama", nim: "2402930", prodi: "Fisika", division: "ACARA PERLOMBAAN" },
  { no: 9, name: "Aura Rezkiya Damani Putri", nim: "2614228", prodi: "Matematika", division: "ACARA PERLOMBAAN" },
  { no: 10, name: "Deca Fairuz Sudiana Putri", nim: "2602476", prodi: "Pendidikan Ilmu Komputer", division: "ACARA PERLOMBAAN" },
  { no: 11, name: "Faiz Muhammad Ghazali", nim: "2504531", prodi: "Ilmu Komputer", division: "ACARA PERLOMBAAN" },
  { no: 12, name: "Fariz Azam Muqoma", nim: "2605270", prodi: "Pendidikan Kimia", division: "ACARA PERLOMBAAN" },
  { no: 13, name: "Jauza Hasna Hafizha", nim: "2600353", prodi: "Pendidikan Biologi", division: "ACARA PERLOMBAAN" },
  { no: 14, name: "Keysha Ega Magani", nim: "2507925", prodi: "Ilmu Komputer", division: "ACARA PERLOMBAAN" },
  { no: 15, name: "Khoerunisa Adya Ramadhani", nim: "2506413", prodi: "Pendidikan Matematika", division: "ACARA PERLOMBAAN" },
  { no: 16, name: "Marhaniswa Miladia Raima", nim: "2606895", prodi: "Pendidikan Fisika", division: "ACARA PERLOMBAAN" },
  { no: 17, name: "Marwah Adzkiah Ma'ruf", nim: "2604511", prodi: "Pendidikan Kimia", division: "ACARA PERLOMBAAN" },
  { no: 18, name: "Mentari Yanuari Basirun", nim: "2408798", prodi: "Matematika", division: "ACARA PERLOMBAAN" },
  { no: 19, name: "Muhammad Luthfan 'Ainun Najib A", nim: "2505649", prodi: "Fisika", division: "ACARA PERLOMBAAN" },
  { no: 20, name: "Nada Salma Ramdania", nim: "2606959", prodi: "Kimia", division: "ACARA PERLOMBAAN" },
  { no: 21, name: "Nadia Ningsih", nim: "2405377", prodi: "IPSE", division: "ACARA PERLOMBAAN" },
  { no: 22, name: "Nazwa Sriaulia Febryana", nim: "2405515", prodi: "Pendidikan Biologi", division: "ACARA PERLOMBAAN" },
  { no: 23, name: "Nisa Agustin", nim: "2505580", prodi: "Pendidikan Ilmu Komputer", division: "ACARA PERLOMBAAN" },
  { no: 24, name: "Nurul Izzah Devi", nim: "2504309", prodi: "Pendidikan Matematika", division: "ACARA PERLOMBAAN" },
  { no: 25, name: "Pipit Iah Supendi", nim: "2407838", prodi: "Fisika", division: "ACARA PERLOMBAAN" },
  { no: 26, name: "Raihannun Keyzia Al Qallifi", nim: "2612442", prodi: "Pendidikan Kimia", division: "ACARA PERLOMBAAN" },
  { no: 27, name: "Raisya Fahira Mayla", nim: "2510599", prodi: "Biologi", division: "ACARA PERLOMBAAN" },
  { no: 28, name: "Rangga Juliyanto Therik", nim: "2506739", prodi: "Fisika", division: "ACARA PERLOMBAAN" },
  { no: 29, name: "Risma Juliyanti", nim: "2501380", prodi: "Fisika", division: "ACARA PERLOMBAAN" },
  { no: 30, name: "Rizka Meylinda", nim: "2609202", prodi: "Pendidikan Kimia", division: "ACARA PERLOMBAAN" },
  { no: 31, name: "Sakinah Khairunnisa", nim: "2602319", prodi: "Matematika", division: "ACARA PERLOMBAAN" },
  { no: 32, name: "Shafa Dzakira", nim: "2310435", prodi: "Pendidikan Biologi", division: "ACARA PERLOMBAAN" },
  { no: 33, name: "Silvia Imelda Hak", nim: "2511659", prodi: "Pendidikan Matematika", division: "ACARA PERLOMBAAN" },
  { no: 34, name: "Soffa Nadya Akasyah", nim: "2502028", prodi: "Biologi", division: "ACARA PERLOMBAAN" },
  { no: 35, name: "Syafina Naura Ayu", nim: "2611286", prodi: "Pendidikan Kimia", division: "ACARA PERLOMBAAN" },
  { no: 36, name: "Syahrul Aulia Nurhakim", nim: "2607595", prodi: "Pendidikan Biologi", division: "ACARA PERLOMBAAN" },
  { no: 37, name: "Syifa Nurussalam Nazhara", nim: "2510847", prodi: "IPSE", division: "ACARA PERLOMBAAN" },
  { no: 38, name: "Vany Ramadhani", nim: "2500739", prodi: "Fisika", division: "ACARA PERLOMBAAN" },
  { no: 39, name: "Westina Lestari Silalahi", nim: "2606298", prodi: "Pendidikan Fisika", division: "ACARA PERLOMBAAN" },
  { no: 40, name: "Zahwa Sriaulia Febryanti", nim: "2400583", prodi: "IPSE", division: "ACARA PERLOMBAAN" },
  // Anggota tambahan tercatat di lembar acara/perlombaan
  { no: 41, name: "Fitri Rahmadani", nim: "2504624", prodi: "Pendidikan Fisika", division: "ACARA PERLOMBAAN" },
  { no: 42, name: "Nailah Nuha Sabiq Sihabudin", nim: "2604054", prodi: "Pendidikan Kimia", division: "ACARA PERLOMBAAN" },
  { no: 43, name: "Wilda Ibrotun Nisa", nim: "2608917", prodi: "Pendidikan Matematika", division: "ACARA PERLOMBAAN" },

  // ACARA OPENING CLOSING
  { no: 1, name: "Azmi Triani Putri", nim: "2506473", prodi: "Pendidikan Ilmu Komputer", division: "ACARA OPENING CLOSING" },
  { no: 2, name: "Haifa Zahirah Saskia Wirasana", nim: "2607934", prodi: "Biologi", division: "ACARA OPENING CLOSING" },
  { no: 3, name: "Jamilah Nur Zamzam", nim: "2505668", prodi: "Pendidikan Ilmu Komputer", division: "ACARA OPENING CLOSING" },
  { no: 4, name: "Khailani Shafaly Nurul Ulya", nim: "2612185", prodi: "Biologi", division: "ACARA OPENING CLOSING" },
  { no: 5, name: "Kharisa Adinda Queenadia", nim: "2500956", prodi: "Pendidikan Ilmu Komputer", division: "ACARA OPENING CLOSING" },
  { no: 6, name: "Luthfi Aulia Jodi", nim: "2521743", prodi: "Ilmu Komputer", division: "ACARA OPENING CLOSING" },
  { no: 7, name: "Mentari Febriani Saputri", nim: "2507111", prodi: "Pendidikan Ilmu Komputer", division: "ACARA OPENING CLOSING" },
  { no: 8, name: "Muhammad Zidni An 'Umillah Haq", nim: "2509060", prodi: "Pendidikan Ilmu Komputer", division: "ACARA OPENING CLOSING" },
  { no: 9, name: "Nazhira Nurfatriyah", nim: "2511641", prodi: "Pendidikan Ilmu Komputer", division: "ACARA OPENING CLOSING" },
  { no: 10, name: "Zahra Hikmali Mulyadi", nim: "2510189", prodi: "Biologi", division: "ACARA OPENING CLOSING" },

  // HUMAS
  { no: 1, name: "Adzka Dzikra Fahma", nim: "2506533", prodi: "Pendidikan Ilmu Komputer", division: "HUMAS" },
  { no: 2, name: "Alifia Rusliyani", nim: "2510118", prodi: "Pendidikan Matematika", division: "HUMAS" },
  { no: 3, name: "Amelia Ananda Tirtaputri", nim: "2510502", prodi: "Pendidikan Ilmu Komputer", division: "HUMAS" },
  { no: 4, name: "Angellina Saskia", nim: "2407715", prodi: "Matematika", division: "HUMAS" },
  { no: 5, name: "Dewi Ayu Wulandari", nim: "2406417", prodi: "Kimia", division: "HUMAS" },
  { no: 6, name: "Khoirunnisa", nim: "2408762", prodi: "IPSE", division: "HUMAS" },
  { no: 7, name: "Muhamad Daffa Fauzan", nim: "2610830", prodi: "Ilmu Komputer", division: "HUMAS" },
  { no: 8, name: "Muhammad Azri Nurfadhilah", nim: "2509895", prodi: "Pendidikan Fisika", division: "HUMAS" },
  { no: 9, name: "Nayla Zafira Akbar", nim: "2505596", prodi: "Fisika", division: "HUMAS" },
  { no: 10, name: "Reivani Vellika Kurnia Putri", nim: "2503883", prodi: "Pendidikan Ilmu Komputer", division: "HUMAS" },
  { no: 11, name: "Salma Putri", nim: "2501137", prodi: "Kimia", division: "HUMAS" },
  { no: 12, name: "Sheilla Dwi Andini", nim: "2608147", prodi: "Pendidikan Kimia", division: "HUMAS" },
  { no: 13, name: "Sofiyah Nur Faizah Maharani", nim: "2611133", prodi: "Pendidikan Kimia", division: "HUMAS" },
  { no: 14, name: "Syawla Mustika", nim: "2401718", prodi: "Kimia", division: "HUMAS" },
  { no: 15, name: "Syifana Aura Bintang", nim: "2607125", prodi: "Pendidikan Ilmu Komputer", division: "HUMAS" },

  // MEDIS
  { no: 1, name: "Alifia Novi Earlydani", nim: "2505673", prodi: "Fisika", division: "MEDIS" },
  { no: 2, name: "Angelica Putri Prasetya", nim: "2404876", prodi: "Fisika", division: "MEDIS" },
  { no: 3, name: "Auni jundina wafa", nim: "2506961", prodi: "Matematika", division: "MEDIS" },
  { no: 4, name: "Bening Matahati", nim: "2502455", prodi: "IPSE", division: "MEDIS" },
  { no: 5, name: "Charissa Aurellia Putri", nim: "2605685", prodi: "Kimia", division: "MEDIS" },
  { no: 6, name: "Hana Nur Ghina", nim: "2603434", prodi: "Pendidikan Biologi", division: "MEDIS" },
  { no: 7, name: "Lintang Ayudia Nurjati", nim: "2409268", prodi: "Pendidikan Biologi", division: "MEDIS" },
  { no: 8, name: "Nadia Jehan Tanisha", nim: "2504034", prodi: "Fisika", division: "MEDIS" },
  { no: 9, name: "Naila Novita Santi", nim: "2501219", prodi: "Pendidikan Ilmu Komputer", division: "MEDIS" },
  { no: 10, name: "Nazhwa Sava Azahra", nim: "2505016", prodi: "Pendidikan Ilmu Komputer", division: "MEDIS" },
  { no: 11, name: "Rainta Allaia", nim: "2405322", prodi: "Fisika", division: "MEDIS" },
  { no: 12, name: "Rifdha Medina Shasya", nim: "2503127", prodi: "Pendidikan Ilmu Komputer", division: "MEDIS" },
  { no: 13, name: "Riyani Sukma Dewi", nim: "2500047", prodi: "Pendidikan Ilmu Komputer", division: "MEDIS" },
  { no: 14, name: "Salsabila Khumairah", nim: "2603027", prodi: "Pendidikan Biologi", division: "MEDIS" },
  { no: 15, name: "Siti Hafshah Ardeya", nim: "2407424", prodi: "Pendidikan Biologi", division: "MEDIS" },
  { no: 16, name: "Vania Rahmawati", nim: "2404600", prodi: "Pendidikan Biologi", division: "MEDIS" },
  { no: 17, name: "Windi Rihanafsa", nim: "2502966", prodi: "Pendidikan Ilmu Komputer", division: "MEDIS" },
  { no: 18, name: "Yaseer Alfalah Ahmad", nim: "2507031", prodi: "Biologi", division: "MEDIS" },
  { no: 19, name: "Zahra Kinara Maulana", nim: "2508209", prodi: "Pendidikan Ilmu Komputer", division: "MEDIS" },

  // SPEKTATOR LOGISTIK
  { no: 1, name: "Abdul Bais Khoirun Anam", nim: "2502245", prodi: "Biologi", division: "SPEKTATOR LOGISTIK" },
  { no: 2, name: "Alya Kamilia Zahra", nim: "2600291", prodi: "Pendidikan Kimia", division: "SPEKTATOR LOGISTIK" },
  { no: 3, name: "Angela Merici Samantha Jane", nim: "2508087", prodi: "Biologi", division: "SPEKTATOR LOGISTIK" },
  { no: 4, name: "Argy Satya Wirawan", nim: "2611271", prodi: "Pendidikan Matematika", division: "SPEKTATOR LOGISTIK" },
  { no: 5, name: "Barra Alkayyisu Fauzi", nim: "2504352", prodi: "Pendidikan Ilmu Komputer", division: "SPEKTATOR LOGISTIK" },
  { no: 6, name: "Dhafin Ziyan Ramadhan", nim: "2505613", prodi: "Pendidikan Ilmu Komputer", division: "SPEKTATOR LOGISTIK" },
  { no: 7, name: "Diana Hernawati", nim: "2502562", prodi: "Biologi", division: "SPEKTATOR LOGISTIK" },
  { no: 8, name: "Djaka Wirawan", nim: "2501014", prodi: "Matematika", division: "SPEKTATOR LOGISTIK" },
  { no: 9, name: "Haykal Muhammad Akbar", nim: "2504482", prodi: "Biologi", division: "SPEKTATOR LOGISTIK" },
  { no: 10, name: "Mohamad Thareq Hanne", nim: "2506663", prodi: "Pendidikan Ilmu Komputer", division: "SPEKTATOR LOGISTIK" },
  { no: 11, name: "Mohammad Irfan", nim: "2500790", prodi: "Pendidikan Ilmu Komputer", division: "SPEKTATOR LOGISTIK" },
  { no: 12, name: "Muhamad Nazriel Purkon", nim: "2510755", prodi: "Pendidikan Ilmu Komputer", division: "SPEKTATOR LOGISTIK" },
  { no: 13, name: "Muhammad Zaldi Nugraha", nim: "2505612", prodi: "Pendidikan Ilmu Komputer", division: "SPEKTATOR LOGISTIK" },
  { no: 14, name: "Nopal Fauzan", nim: "2510568", prodi: "Fisika", division: "SPEKTATOR LOGISTIK" },
  { no: 15, name: "Pascalis Randi Suprayogi", nim: "2613476", prodi: "Pendidikan Matematika", division: "SPEKTATOR LOGISTIK" },
  { no: 16, name: "Queen Syah Ramadina", nim: "2607535", prodi: "Pendidikan Kimia", division: "SPEKTATOR LOGISTIK" },
  { no: 17, name: "Rizqi Akbar", nim: "2504561", prodi: "Pendidikan Biologi", division: "SPEKTATOR LOGISTIK" },
  { no: 18, name: "Siti Marlina", nim: "2510683", prodi: "Pendidikan Biologi", division: "SPEKTATOR LOGISTIK" },
  { no: 19, name: "Siti Nur’aeni", nim: "2503656", prodi: "IPSE", division: "SPEKTATOR LOGISTIK" },
  { no: 20, name: "Wafi Avicenna", nim: "2510574", prodi: "Pendidikan Biologi", division: "SPEKTATOR LOGISTIK" },
  { no: 21, name: "Zakka Hanifan", nim: "2503495", prodi: "Biologi", division: "SPEKTATOR LOGISTIK" },
  { no: 22, name: "Zilda", nim: "2500000", prodi: "FPMIPA", division: "SPEKTATOR LOGISTIK" },

  // SPONSOR DANA USAHA
  { no: 1, name: "Dea Aufa Nuraini", nim: "2509565", prodi: "Pendidikan Biologi", division: "SPONSOR DANA USAHA" },
  { no: 2, name: "Intan Fadilla", nim: "2501099", prodi: "Pendidikan Ilmu Komputer", division: "SPONSOR DANA USAHA" },
  { no: 3, name: "Kaylla Rahmadhani", nim: "2409947", prodi: "IPSE", division: "SPONSOR DANA USAHA" },
  { no: 4, name: "Nafisha Zahra Rosmaia Putri", nim: "2511355", prodi: "Pendidikan Biologi", division: "SPONSOR DANA USAHA" },
  { no: 5, name: "Najwa Muthia Amaaniha", nim: "2404523", prodi: "Pendidikan Fisika", division: "SPONSOR DANA USAHA" },
  { no: 6, name: "Neng Siti Nurparidah", nim: "2502125", prodi: "Pendidikan Ilmu Komputer", division: "SPONSOR DANA USAHA" },
  { no: 7, name: "Ratu Lintang Wati", nim: "2502830", prodi: "Pendidikan Ilmu Komputer", division: "SPONSOR DANA USAHA" },
  { no: 8, name: "Refan Maher Aysel", nim: "2509129", prodi: "Ilmu Komputer", division: "SPONSOR DANA USAHA" },
  { no: 9, name: "Salwa Fadilah Subagja", nim: "2511143", prodi: "Pendidikan Ilmu Komputer", division: "SPONSOR DANA USAHA" },
  { no: 10, name: "Sella Maria", nim: "2500156", prodi: "Pendidikan Ilmu Komputer", division: "SPONSOR DANA USAHA" },
  { no: 11, name: "Sulisthia Saf'aeni Putri", nim: "2407100", prodi: "Pendidikan Fisika", division: "SPONSOR DANA USAHA" },

  // PDDD
  { no: 1, name: "Aida Nuryanti", nim: "2409888", prodi: "Pendidikan Biologi", division: "PDDD" },
  { no: 2, name: "Ananda Rizqiya", nim: "2404436", prodi: "Pendidikan Biologi", division: "PDDD" },
  { no: 3, name: "Arditha Nur Faizah", nim: "2503872", prodi: "Pendidikan Matematika", division: "PDDD" },
  { no: 4, name: "Aura Raisya Faradiba Irvan", nim: "2507208", prodi: "Pendidikan Biologi", division: "PDDD" },
  { no: 5, name: "Daffa Ziyad Ulhaq R", nim: "2508022", prodi: "Pendidikan Ilmu Komputer", division: "PDDD" },
  { no: 6, name: "Fathia Rachma Dhiny", nim: "2506634", prodi: "Pendidikan Ilmu Komputer", division: "PDDD" },
  { no: 7, name: "Gadiza Hanun Mufida", nim: "2501762", prodi: "Pendidikan Fisika", division: "PDDD" },
  { no: 8, name: "Jihan Ulfah Talita", nim: "2613080", prodi: "Pendidikan Fisika", division: "PDDD" },
  { no: 9, name: "Khaira Zalika Anandhita", nim: "2600908", prodi: "Pendidikan Ilmu Komputer", division: "PDDD" },
  { no: 10, name: "Khalishah Naufa", nim: "2508835", prodi: "Pendidikan Matematika", division: "PDDD" },
  { no: 11, name: "Maya Rahma Larasati", nim: "2402135", prodi: "IPSE", division: "PDDD" },
  { no: 12, name: "Meiars Alisa Istiaji", nim: "2505631", prodi: "Pendidikan Matematika", division: "PDDD" },
  { no: 13, name: "Mona Sapta Nurcholisa", nim: "2521378", prodi: "Pendidikan Biologi", division: "PDDD" },
  { no: 14, name: "Muhammad Nazarudin", nim: "2503796", prodi: "Matematika", division: "PDDD" },
  { no: 15, name: "Reyha Qaidah Rafifah", nim: "2502134", prodi: "Fisika", division: "PDDD" },
  { no: 16, name: "Ridwan Nur Zidan", nim: "2505635", prodi: "Pendidikan Ilmu Komputer", division: "PDDD" },
  { no: 17, name: "Rosita Dewi", nim: "2505612", prodi: "Pendidikan Biologi", division: "PDDD" },
  { no: 18, name: "Salma Balqis Nurliena", nim: "2405804", prodi: "Pendidikan Biologi", division: "PDDD" },
  { no: 19, name: "Salma Nabila", nim: "2509514", prodi: "Pendidikan Ilmu Komputer", division: "PDDD" },
  { no: 20, name: "Salsabila Mutiara Islami Benamen", nim: "2604644", prodi: "Pendidikan Biologi", division: "PDDD" },
  { no: 21, name: "Salsabila Yasmin", nim: "2505640", prodi: "Pendidikan Biologi", division: "PDDD" },
  { no: 22, name: "Siti Ainunnisa", nim: "2503209", prodi: "IPSE", division: "PDDD" },
  { no: 23, name: "Suhaa Athifa Khairiyah", nim: "2507038", prodi: "Pendidikan Ilmu Komputer", division: "PDDD" },
  { no: 24, name: "Syifa Dellarosa", nim: "2403925", prodi: "IPSE", division: "PDDD" },
  { no: 25, name: "Zahra Agreika Putri Gunawan", nim: "2409742", prodi: "Pendidikan Matematika", division: "PDDD" }
];

const FAQS = [
  {
    q: "Apa yang harus saya lakukan setelah dinyatakan diterima?",
    a: "Segera klik tombol **'Hubungi Koordinator Divisi'** di kartu pengumuman untuk melakukan konfirmasi kehadiran dan bergabung ke **Grup WhatsApp Resmi Kru PARAMPA 2026-2027**."
  },
  {
    q: "Kapan jadwal First Gathering (Temu Perdana) Panitia?",
    a: "First Gathering seluruh kru kapal PARAMPA 2026-2027 dijadwalkan pada hari Sabtu mendatang di Gedung FPMIPA UPI. Detail waktu dan dresscode akan diumumkan koordinator divisi di grup WhatsApp resmi."
  },
  {
    q: "Bagaimana jika nama saya tidak ditemukan padahal sudah mendaftar?",
    a: "Pastikan penulisan NIM dan nama sesuai saat pendaftaran tanpa spasi berlebih. Jika tetap tidak muncul, silakan hubungi tim Helpdesk Panitia melalui tombol kontak yang tersedia di website ini untuk konfirmasi data manual."
  },
  {
    q: "Apakah saya bisa membagikan kartu kelulusan ini ke media sosial?",
    a: "Tentu saja! Klik tombol **'Unduh Kartu Kru (Story)'** pada kartu kelulusan Anda untuk mendapatkan grafis eksklusif beresolusi tinggi yang siap dibagikan ke Instagram Story atau WhatsApp Status."
  }
];

const TIMELINE = [
  {
    date: "15 September 2026",
    title: "Pengumuman Resmi Kru Kapal",
    desc: "Rilis hasil seleksi berkas & wawancara panitia PARAMPA 2026-2027."
  },
  {
    date: "18 September 2026",
    title: "Batas Konfirmasi & Masuk Grup",
    desc: "Batas akhir seluruh staf terpilih menghubungi koordinator & bergabung ke grup divisi."
  },
  {
    date: "20 September 2026",
    title: "First Gathering Akbar",
    desc: "Temu perdana seluruh kapten dan kru kapal PARAMPA di Kampus Bumi Siliwangi FPMIPA UPI."
  },
  {
    date: "Oktober 2026 - Januari 2027",
    title: "Masa Ekspedisi & Persiapan",
    desc: "Penyusunan timeline teknis, perburuan sponsor, branding publikasi, dan persiapan arena lomba."
  },
  {
    date: "Februari 2027",
    title: "Voyage of PARAMPA 2027",
    desc: "Pelaksanaan puncak acara akbar PARAMPA 2026-2027."
  }
];
