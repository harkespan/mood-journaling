# 🔧 Setup & Configuration Guide

Panduan lengkap untuk mengatur dan menjalankan aplikasi Mood Journal.

## 📋 Prerequisites

### System Requirements
- **Node.js**: v20.19.0 atau lebih tinggi
- **npm**: v8.0.0 atau lebih tinggi (biasanya sudah termasuk dengan Node.js)
- **Browser**: Chrome, Firefox, Safari, atau Edge (versi terbaru)

### Verifikasi Instalasi
```bash
node --version    # Harus v20.19.0+
npm --version     # Harus v8.0.0+
```

## 🚀 Instalasi Project

### 1. Download/Clone Project
```bash
# Jika menggunakan git
git clone [repository-url]
cd mood-journaling

# Atau download dan extract ZIP file
```

### 2. Install Dependencies
```bash
npm install
```

Perintah ini akan menginstall:
- Vue.js 3.5.18
- Vue Router 4.5.1
- @google-cloud/local-auth 3.0.1
- googleapis 155.0.0
- Vite 7.0.6

## 🔑 Konfigurasi Google OAuth

### 1. Buat Google Cloud Project

1. Kunjungi [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih project yang sudah ada
3. Aktifkan Google+ API dan Google Identity API

### 2. Konfigurasi OAuth Consent Screen

1. Di Google Cloud Console, pergi ke **APIs & Services** → **OAuth consent screen**
2. Pilih **External** untuk testing atau **Internal** jika dalam organisasi
3. Isi informasi aplikasi:
   - **App name**: Mood Journal
   - **User support email**: Email Anda
   - **Developer contact information**: Email Anda
4. Klik **Save and Continue**

### 3. Buat OAuth 2.0 Client ID

1. Pergi ke **APIs & Services** → **Credentials**
2. Klik **Create Credentials** → **OAuth client ID**
3. Pilih **Web application**
4. Atur konfigurasi:
   - **Name**: Mood Journal Web Client
   - **Authorized JavaScript origins**: 
     - `http://localhost:5173` (untuk development)
     - `https://yourdomain.com` (untuk production)
   - **Authorized redirect URIs**: (kosongkan untuk web app sederhana)
5. Klik **Create**
6. Copy **Client ID** yang dihasilkan

### 4. Konfigurasi Environment Variables

1. Copy file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```

2. Edit file `.env` dan ganti dengan Client ID yang Anda dapatkan:
```env
VITE_GOOGLE_CLIENT_ID=your-actual-client-id.apps.googleusercontent.com
VITE_APP_NAME=Mood Journal
VITE_APP_DESCRIPTION=Track your daily mood and write your story
```

3. File `auth.js` sudah dikonfigurasi untuk membaca dari environment variables:
```javascript
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
```

**⚠️ PENTING**: 
- File `.env` sudah ada di `.gitignore` dan tidak akan ter-commit
- Gunakan `.env.example` sebagai template untuk team members
- Untuk production, set environment variables di platform hosting

## 🏃‍♂️ Menjalankan Aplikasi

### Development Server
```bash
npm run dev
```

Aplikasi akan tersedia di: `http://localhost:5173`

### Production Build
```bash
npm run build
```

File build akan tersedia di folder `dist/`

### Preview Production Build
```bash
npm run preview
```

## 🔧 Konfigurasi Tambahan

### Environment Variables

File `.env` sudah dibuat dengan konfigurasi yang diperlukan. Anda tinggal mengedit nilai CLIENT_ID:

```env
VITE_GOOGLE_CLIENT_ID=your-actual-client-id.apps.googleusercontent.com
VITE_APP_NAME=Mood Journal
VITE_APP_DESCRIPTION=Track your daily mood and write your story
```

**Validation**: Aplikasi akan memberikan error yang jelas jika VITE_GOOGLE_CLIENT_ID tidak diset:
```javascript
if (!CLIENT_ID) {
  console.error('Google OAuth Client ID not found. Please check your .env file');
  throw new Error('Missing Google OAuth configuration');
}
```

### Kustomisasi Domain untuk Production

Jika deploy ke domain custom, update:

1. **Google Cloud Console** → **Credentials** → Edit OAuth client
2. Tambahkan domain production ke **Authorized JavaScript origins**:
   - `https://yourdomain.com`
   - `https://www.yourdomain.com`

## 🧪 Testing Setup

### Test Login Functionality
1. Jalankan `npm run dev`
2. Buka `http://localhost:5173`
3. Klik tombol "Sign in with Google"
4. Login dengan akun Google test
5. Verifikasi redirect ke halaman utama

### Test Mood Entry
1. Setelah login, pilih mood emoji
2. Tulis story di text area
3. Klik "Save Entry"
4. Verifikasi data tersimpan di localStorage browser

### Test History View
1. Klik navigasi "History" 
2. Verifikasi entry yang baru disimpan tampil
3. Klik entry untuk expand detail

## ❗ Troubleshooting

### Error: "OAuth client ID not found"
- Pastikan Client ID sudah benar di `auth.js`
- Verifikasi domain di Google Cloud Console

### Error: "This app isn't verified"
- Normal untuk development/testing
- Klik "Advanced" → "Go to [App Name] (unsafe)" untuk melanjutkan
- Untuk production, submit app untuk verification

### Error: "Access blocked"
- Pastikan email Anda ditambahkan ke test users di OAuth consent screen
- Atau ubah ke "Internal" jika dalam organisasi

### Error: Dependencies tidak terinstall
```bash
# Hapus node_modules dan package-lock.json
rm -rf node_modules package-lock.json
npm install
```

### Error: Port 5173 sudah digunakan
- Vite akan otomatis mencari port lain (5174, 5175, dst)
- Atau set port manual: `npm run dev -- --port 3000`

## 🔒 Security Notes

### Development
- Client ID bisa dilihat di browser (ini normal)
- Data disimpan di localStorage browser
- Tidak ada server backend yang perlu diamankan

### Production
- Gunakan HTTPS untuk domain production  
- Pastikan domain terdaftar di Google Cloud Console
- Consider menggunakan environment variables
- Regular update dependencies untuk security patches

## 📱 Mobile Testing

### Chrome DevTools
1. Buka DevTools (F12)
2. Toggle device toolbar
3. Test di berbagai ukuran screen

### Real Device Testing
1. Pastikan development server accessible di network
2. Gunakan IP address: `http://192.168.1.xxx:5173`
3. Update Google OAuth origins jika perlu

---

Jika mengalami masalah, periksa console browser untuk error messages dan pastikan semua langkah setup sudah diikuti dengan benar.