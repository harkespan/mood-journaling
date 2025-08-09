# 📱 User Guide - Panduan Penggunaan Mood Journal

Panduan lengkap untuk menggunakan aplikasi Mood Journal dalam melacak mood harian dan menulis jurnal pribadi.

## 🔐 Memulai - Login

### 1. Akses Aplikasi
- Buka aplikasi di browser
- Anda akan melihat halaman login yang indah dengan gradient background

### 2. Login dengan Google
- Klik tombol **"Sign in with Google"**
- Pilih akun Google yang ingin digunakan
- Berikan permission yang diminta aplikasi
- Setelah berhasil, Anda akan diarahkan ke halaman utama

### 3. Tampilan Setelah Login
- Navbar atas menampilkan:
  - Logo "🌟 Mood Journal"
  - Menu navigasi (Today, History)  
  - Tombol Logout
  - Avatar dan nama Anda

## 📝 Menulis Entry Harian

### 1. Halaman Today (Halaman Utama)
Ini adalah tempat Anda menulis entry untuk hari ini.

#### Informasi yang Ditampilkan:
- **Tanggal hari ini** dalam format lengkap (contoh: "Monday, January 15, 2024")
- **Status entry**: 
  - Jika belum ada entry: "Let's capture how you're feeling today!"
  - Jika sudah ada: "You already logged your mood today. You can update it below."

### 2. Memilih Mood

#### Mood Options yang Tersedia:
- 😊 **Happy** - Saat Anda merasa gembira
- 😢 **Sad** - Saat Anda merasa sedih
- 😡 **Angry** - Saat Anda merasa marah atau kesal  
- 😴 **Tired** - Saat Anda merasa lelah atau mengantuk
- 😎 **Cool** - Saat Anda merasa tenang dan keren
- 😰 **Anxious** - Saat Anda merasa cemas atau khawatir
- 🥳 **Excited** - Saat Anda merasa bersemangat
- 😌 **Calm** - Saat Anda merasa damai dan tenang

#### Cara Memilih:
1. Lihat grid mood yang tersedia
2. Klik pada emoji yang paling sesuai dengan perasaan Anda hari ini
3. Mood yang dipilih akan ter-highlight dengan warna biru

### 3. Menulis Cerita (Journal Entry)

#### Text Area Features:
- **Placeholder text** memberikan inspirasi tentang apa yang bisa ditulis
- **Character counter** menunjukkan jumlah karakter (maksimal 1000)
- **Auto-resize** text area menyesuaikan tinggi dengan konten

#### Tips Menulis Journal yang Baik:
- **Jujur dengan perasaan** - Tulis apa yang benar-benar Anda rasakan
- **Detail spesifik** - Ceritakan kejadian yang membuat Anda merasa mood tersebut
- **Refleksi** - Pikirkan tentang mengapa Anda merasa demikian
- **Gratitude** - Sebutkan hal-hal yang Anda syukuri hari ini
- **Goals** - Tulis harapan atau rencana untuk esok hari

#### Contoh Entry yang Baik:
```
Hari ini aku merasa sangat excited karena berhasil menyelesaikan 
project yang sudah dikerjakan selama 2 minggu. Meeting dengan klien 
berjalan lancar dan mereka sangat puas dengan hasil kerja tim. 

Tapi di sisi lain, aku juga sedikit anxious memikirkan deadline 
project berikutnya yang cukup tight. 

Grateful untuk:
- Tim yang solid dan saling support
- Klien yang kooperatif  
- Coffee yang enak di kantor

Tomorrow: Mulai planning project baru dan jangan lupa workout sore!
```

### 4. Menyimpan Entry

#### Validasi:
- **Mood harus dipilih** - Tidak bisa save tanpa memilih mood
- **Story tidak boleh kosong** - Harus menulis minimal 1 karakter
- Tombol "Save Entry" akan disabled jika validasi belum terpenuhi

#### Proses Saving:
1. Klik tombol **"Save Entry"** atau **"Update Entry"** (jika sudah ada entry hari ini)
2. Tombol akan berubah jadi "Saving..." dengan status loading
3. Jika berhasil: Muncul pesan sukses "Your entry has been saved successfully! 🎉"
4. Jika gagal: Muncul pesan error dengan instruksi untuk mencoba lagi

#### Update Entry:
- Anda bisa mengubah mood dan story untuk hari yang sama
- Entry lama akan ditimpa dengan yang baru
- Hanya ada 1 entry per hari

## 📖 Melihat Riwayat (History)

### 1. Navigasi ke History
- Klik menu **"📖 History"** di navbar
- Halaman akan menampilkan AI Mood Summary, filter controls, dan entries berdasarkan filter aktif

## 🧠 AI Mood Insights

### 1. Smart Summary Card
Di bagian atas History page, Anda akan melihat **AI Mood Insights** card yang memberikan analisis intelligent tentang pola mood Anda.

#### Summary Features:
- **🎯 Main Summary**: Insight utama seperti "Mostly positive vibes!" atau "Mixed emotions recently"
- **📊 Mood Distribution**: Bar chart visual menunjukkan persentase mood positive, negative, dan neutral
- **🔍 Expandable Details**: Klik tombol panah untuk melihat analisis mendalam
- **💡 Personal Recommendations**: Saran actionable berdasarkan pola mood Anda

### 2. AI Analysis Categories

#### 🎭 **Mood Dominance Analysis**
- **"Mostly Happy"** - Jika 60%+ entries adalah mood positif
- **"Mixed Emotions"** - Jika seimbang antara positive dan negative
- **"Challenging Period"** - Jika dominan mood negative
- **"Stable Mood"** - Jika konsisten dalam satu kategori

#### 📈 **Trend Analysis** 
- **"Improving Trend"** - Mood membaik dari waktu ke waktu
- **"Declining Pattern"** - Mood menurun 
- **"Fluctuating Widely"** - Mood sangat berubah-ubah
- **"Consistent Pattern"** - Mood stabil sepanjang periode

#### 🔍 **Pattern Recognition**
- **Streak Detection**: "5 consecutive happy days" 
- **Consistency Score**: Seberapa stabil mood Anda
- **Most Frequent Mood**: Mood yang paling sering muncul

### 3. Detailed Insights (Expandable)

Klik tombol **▼** di AI Summary card untuk melihat:

#### 📊 **Detailed Statistics**
- Breakdown persentase setiap kategori mood
- Trend direction dengan confidence level
- Longest streak positive/negative days
- Consistency rating dari "Very Consistent" hingga "Highly Variable"

#### 🎯 **Contextual Insights**
- Analisis spesifik berdasarkan timeframe yang dipilih
- Pattern yang terdeteksi dalam data mood Anda
- Perbandingan dengan periode sebelumnya (jika ada data cukup)

#### 💡 **Smart Recommendations**
Berdasarkan analisis AI, Anda akan mendapat rekomendasi seperti:
- **🌟 Keep up the momentum!** (untuk trend positif)
- **💙 Consider self-care activities** (untuk periode challenging)
- **⚖️ Try establishing consistent routines** (untuk mood yang fluktuatif)
- **🤗 Reach out for support** (jika diperlukan)

### 4. Dynamic Analysis

AI Summary akan berubah secara real-time berdasarkan filter yang Anda pilih:
- **Last 7 Days**: Analisis weekly patterns dan recent trends
- **Date Range**: Insight spesifik untuk periode yang dipilih
- **Monthly**: Pattern dan trend bulanan
- **Yearly**: Overview mood sepanjang tahun dengan seasonal analysis

### 2. Filter Options

#### 📅 Last 7 Days (Default)
- Menampilkan entry dari 7 hari terakhir (termasuk hari ini)
- Filter default yang langsung aktif saat membuka halaman History
- Cocok untuk melihat aktivitas mood recent

#### 📆 Date Range (Custom Range)
- Pilih tanggal mulai dan tanggal akhir secara manual
- Input date picker yang user-friendly
- Flexible untuk periode tertentu yang Anda inginkan
- Contoh: Lihat mood selama liburan bulan lalu

#### 🗓️ By Month
- Filter berdasarkan bulan tertentu
- Dropdown menampilkan bulan dan tahun yang tersedia
- Format: "January 2024", "December 2023"
- Hanya bulan yang memiliki entry yang akan muncul

#### 📊 By Year  
- Filter berdasarkan tahun tertentu
- Dropdown menampilkan tahun yang tersedia
- Cocok untuk review mood sepanjang tahun
- Hanya tahun yang memiliki entry yang akan muncul

### 3. Menggunakan Filter

#### Cara Menggunakan:
1. **Pilih tab filter** yang diinginkan (Last 7 Days, Date Range, By Month, By Year)
2. **Atur parameter** (jika diperlukan):
   - Date Range: Pilih tanggal start dan end
   - By Month: Pilih bulan dari dropdown
   - By Year: Pilih tahun dari dropdown
3. **Lihat hasil** yang otomatis ter-update
4. **Clear filter** dengan tombol "✕ Clear Filter" untuk kembali ke Last 7 Days

#### Filter Information:
- **Entries count**: Menampilkan jumlah entry yang ditemukan
- **Dynamic header**: Deskripsi berubah sesuai filter aktif
- **Clear filter button**: Tersedia untuk semua filter kecuali "Last 7 Days"

### 4. Tampilan History

#### Jika Belum Ada Entry:
- Menampilkan empty state dengan emoji 📝
- Pesan disesuaikan dengan filter aktif
- Tombol "Write Your First Entry" untuk kembali ke halaman utama

#### Jika Sudah Ada Entry:
- Daftar entry diurutkan dari yang terbaru
- Setiap entry card menampilkan:
  - **Emoji mood** yang besar di sebelah kiri
  - **Tanggal lengkap** (contoh: "Monday, January 15, 2024")  
  - **Relative time** (contoh: "Today", "Yesterday", "3 days ago")
  - **Expand icon** (▼) untuk melihat detail

### 5. Melihat Detail Entry

#### Cara Expand Entry:
- Klik pada card entry yang ingin dilihat
- Card akan expand dan menampilkan detail lengkap
- Icon panah akan berubah arah (▲)

#### Detail yang Ditampilkan:
- **Mood info**: "Mood: Happy 😊"
- **Story content**: Full text journal dalam box khusus
- **Entry metadata**: "Saved on Jan 15, 2024, 10:30 AM"

#### Fitur Interactive:
- **Smooth animation** saat expand/collapse
- **Multiple entries** bisa di-expand bersamaan
- **Click to collapse** - klik lagi untuk menutup

### 6. Tips Penggunaan History

#### Untuk Analisis Mood:
- **Weekly review**: Gunakan "Last 7 Days" untuk melihat tren mingguan
- **Monthly pattern**: Pilih "By Month" untuk melihat pola mood bulanan
- **Seasonal analysis**: Gunakan "By Year" untuk analisis mood tahunan
- **Event correlation**: Gunakan "Date Range" untuk mengecek mood sebelum/sesudah event penting

#### Relative Time Labels:
- **Today** - Entry hari ini
- **Yesterday** - Entry kemarin  
- **X days ago** - Kurang dari 1 minggu
- **X weeks ago** - Kurang dari 1 bulan
- **X months ago** - Lebih dari 1 bulan

## 🔧 Fitur Tambahan

### 1. Responsive Design
- **Desktop**: Layout 3 kolom dengan spacing luas
- **Tablet**: Layout 2 kolom yang pas
- **Mobile**: Layout 1 kolom dengan font yang disesuaikan
- **Touch-friendly**: Tombol dan area klik yang cukup besar

### 2. Persistent Data
- **Auto-save di localStorage**: Data tersimpan otomatis di browser
- **Tidak perlu internet**: Setelah login, bisa digunakan offline  
- **Data tetap ada**: Meski browser ditutup, data tidak hilang
- **Per-browser basis**: Data terpisah untuk setiap browser

### 3. User Experience Features
- **Loading states**: Feedback visual saat saving
- **Success/error messages**: Notifikasi yang jelas
- **Smooth transitions**: Animasi yang halus
- **Form validation**: Mencegah input yang tidak valid

## 🚪 Logout

### Cara Logout:
1. Klik tombol **"👋 Logout"** di navbar
2. Anda akan langsung logout dan kembali ke halaman login
3. Data tetap tersimpan di localStorage browser

### Setelah Logout:
- Session Google OAuth dihapus
- Kembali ke halaman login
- Data mood/journal tetap tersimpan
- Bisa login kembali kapan saja dengan akun yang sama

## 💡 Tips & Best Practices

### 1. Konsistensi
- **Tulis setiap hari** untuk mendapat insight yang lebih baik
- **Waktu yang sama** - misal selalu malam sebelum tidur
- **Jujur dengan perasaan** - jangan menulis yang mengada-ada

### 2. Kualitas Entry
- **Detail kejadian** - ceritakan apa yang terjadi hari ini
- **Emotional context** - jelaskan mengapa merasa demikian  
- **Reflection** - apa yang bisa dipelajari dari hari ini
- **Future planning** - apa yang ingin dilakukan esok hari

### 3. Review Berkala
- **Lihat history** secara rutin untuk melihat pola mood
- **Identify triggers** - hal-hal yang membuat mood naik/turun
- **Celebrate progress** - apresiasi perkembangan positif
- **Learn from patterns** - gunakan insight untuk self-improvement

### 4. Privacy & Security
- **Personal device**: Gunakan di device pribadi 
- **Private browser**: Consider gunakan incognito untuk shared device
- **Regular backup**: Screenshot penting jika perlu
- **Secure login**: Pastikan akun Google aman dengan 2FA

---

Selamat menggunakan Mood Journal! 🌟 
Aplikasi ini dirancang untuk membantu Anda lebih memahami emosi dan perkembangan personal melalui refleksi harian.