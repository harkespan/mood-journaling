# 🌟 Mood Journal - Aplikasi Tracking Mood & Journaling

Aplikasi web berbasis Vue.js untuk melacak mood harian dan menulis jurnal pribadi dengan autentikasi Google OAuth.

## ✨ Fitur Utama

- 🔐 **Login dengan Google** - Autentikasi aman menggunakan Google OAuth 2.0
- 😊 **Mood Tracking** - Pilih dari 8 emoji mood yang berbeda (Happy, Sad, Angry, Tired, Cool, Anxious, Excited, Calm)
- 📝 **Daily Journaling** - Tulis cerita harian hingga 1000 karakter
- 📖 **Advanced History** - Lihat riwayat dengan filtering: 7 hari terakhir, range tanggal custom, per bulan, atau per tahun
- 🧠 **AI Mood Insights** - Summary dan analisis pola mood otomatis dengan rekomendasi personal
- 📱 **Responsive Design** - Bekerja dengan baik di desktop dan mobile
- 💾 **Local Storage** - Data tersimpan di browser untuk pengalaman yang cepat

## 🚀 Quick Start

### Prerequisites
- Node.js (v20.19.0 atau lebih tinggi)
- npm atau yarn
- Google OAuth Client ID

### Instalasi

1. Clone atau download project ini
2. Install dependencies:
   ```bash
   npm install
   ```

3. Konfigurasi Google OAuth (lihat [SETUP.md](./SETUP.md) untuk detail)

4. Jalankan development server:
   ```bash
   npm run dev
   ```

5. Buka browser dan akses `http://localhost:5173`

## 🏗️ Teknologi yang Digunakan

- **Vue.js 3** - Framework frontend dengan Composition API
- **Vue Router** - Routing untuk single page application
- **Vite** - Build tool yang cepat
- **Google OAuth 2.0** - Autentikasi user
- **LocalStorage** - Penyimpanan data di browser
- **CSS3** - Styling dengan gradient dan animasi

## 📁 Struktur Project

```
mood-journaling/
├── docs/                   # Dokumentasi
├── public/                 # Static files
├── src/
│   ├── components/         # Vue components
│   │   ├── LoginPage.vue   # Halaman login
│   │   ├── MoodSelector.vue # Komponen pilihan mood
│   │   └── JournalEntry.vue # Komponen input jurnal
│   ├── views/              # View components
│   │   ├── HomeView.vue    # Halaman utama
│   │   └── HistoryView.vue # Halaman riwayat
│   ├── services/           # Business logic
│   │   ├── auth.js         # Service autentikasi
│   │   └── moodService.js  # Service mood & journal
│   ├── router/             # Vue Router config
│   ├── App.vue             # Root component
│   └── main.js             # Entry point
├── package.json
└── vite.config.js
```

## 📖 Dokumentasi Lengkap

- [Setup & Configuration](./SETUP.md)
- [User Guide](./USER_GUIDE.md)
- [Architecture Overview](./ARCHITECTURE.md)
- [API Reference](./API_REFERENCE.md)
- [Deployment Guide](./DEPLOYMENT.md)

## 🤝 Kontribusi

Aplikasi ini dibuat untuk pembelajaran. Jika ingin berkontribusi:

1. Fork repository
2. Buat feature branch
3. Commit changes
4. Push ke branch
5. Buat Pull Request

## 📝 License

MIT License - lihat file LICENSE untuk detail.

## 🔮 Future Improvements

- [ ] Export data ke PDF atau CSV
- [ ] Mood analytics dan statistik dengan charts
- [ ] Reminder notifikasi harian
- [ ] Tema dark mode
- [ ] Backup ke cloud storage  
- [ ] Social sharing features
- [ ] Mood correlation dengan cuaca
- [ ] Advanced filtering (mood type, keywords, etc)
- [ ] Calendar view untuk history
- [ ] Mood streak tracking

## 💡 Tips Penggunaan

- Gunakan aplikasi setiap hari untuk mendapat insight yang lebih baik tentang mood Anda
- Tulis jurnal dengan jujur dan detail untuk refleksi yang lebih bermakna
- Review riwayat mood untuk melihat pola dan tren emosional
- Gunakan data untuk memahami trigger positif dan negatif dalam hidup Anda

---

Dibuat dengan ❤️ menggunakan Vue.js