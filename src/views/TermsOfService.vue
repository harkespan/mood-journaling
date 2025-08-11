<template>
  <div class="terms-page">
    <div class="terms-container">
      <div class="terms-header">
        <div class="header-content">
          <h1>📜 Terms of Service</h1>
          <p class="subtitle">Mood Journal - Free & Open Source</p>
        </div>
        <button @click="goBack" class="back-button">
          ← Back to Login
        </button>
      </div>

      <div class="terms-content">
        <div class="terms-section">
          <div class="section-icon">🌟</div>
          <h2>Welcome to Mood Journal</h2>
          <p>
            Mood Journal adalah aplikasi web <strong>gratis</strong> yang membantu Anda melacak mood harian dan menulis jurnal pribadi. 
            Aplikasi ini dikembangkan dengan tujuan membantu pengguna memahami pola emosional mereka melalui refleksi harian.
          </p>
        </div>

        <div class="terms-section">
          <div class="section-icon">🆓</div>
          <h2>Aplikasi Gratis</h2>
          <div class="highlight-box free">
            <p><strong>100% GRATIS SELAMANYA</strong></p>
            <ul>
              <li>✅ Tidak ada biaya pendaftaran</li>
              <li>✅ Tidak ada biaya berlangganan</li>
              <li>✅ Tidak ada fitur premium berbayar</li>
              <li>✅ Tidak ada iklan atau monetisasi</li>
              <li>✅ Semua fitur tersedia untuk semua pengguna</li>
            </ul>
          </div>
        </div>

        <div class="terms-section">
          <div class="section-icon">🔓</div>
          <h2>Open Source</h2>
          <p>
            Mood Journal adalah proyek <strong>open source</strong> yang kode sumbernya tersedia untuk umum. 
            Anda dapat melihat, mempelajari, memodifikasi, dan mendistribusikan aplikasi ini sesuai kebutuhan.
          </p>
          
          <div class="github-section">
            <div class="github-card">
              <div class="github-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <div class="github-content">
                <h3>Source Code Repository</h3>
                <p>Kode sumber tersedia di GitHub untuk transparansi dan kolaborasi</p>
                <a 
                  href="https://github.com/harkespan/mood-journaling" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="github-link"
                >
                  🔗 github.com/harkespan/mood-journaling
                  <span class="external-icon">↗</span>
                </a>
              </div>
            </div>
          </div>

          <div class="license-info">
            <h4>📋 Lisensi</h4>
            <p>
              Aplikasi ini dirilis di bawah lisensi MIT yang memungkinkan Anda untuk:
            </p>
            <ul>
              <li>🔍 Melihat dan mempelajari kode sumber</li>
              <li>📝 Memodifikasi sesuai kebutuhan</li>
              <li>📤 Mendistribusikan ulang</li>
              <li>💼 Menggunakan untuk keperluan komersial</li>
              <li>🤝 Berkontribusi pada pengembangan</li>
            </ul>
          </div>
        </div>

        <div class="terms-section">
          <div class="section-icon">🔒</div>
          <h2>Privasi & Data</h2>
          <p>
            Kami sangat menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda.
          </p>
          
          <div class="privacy-grid">
            <div class="privacy-item">
              <div class="privacy-icon">💾</div>
              <h4>Penyimpanan Lokal</h4>
              <p>Data mood dan jurnal disimpan di browser Anda (localStorage). Tidak ada data yang dikirim ke server kami.</p>
            </div>
            
            <div class="privacy-item">
              <div class="privacy-icon">🔐</div>
              <h4>Google OAuth</h4>
              <p>Login menggunakan Google hanya untuk identifikasi. Kami hanya menerima nama, email, dan foto profil.</p>
            </div>
            
            <div class="privacy-item">
              <div class="privacy-icon">🚫</div>
              <h4>No Tracking</h4>
              <p>Tidak ada pelacakan, analytics, atau pengumpulan data untuk tujuan marketing.</p>
            </div>
            
            <div class="privacy-item">
              <div class="privacy-icon">📱</div>
              <h4>Device-Specific</h4>
              <p>Data terikat pada browser dan device yang Anda gunakan. Tidak ada sinkronisasi antar perangkat.</p>
            </div>
          </div>
        </div>

        <div class="terms-section">
          <div class="section-icon">👤</div>
          <h2>Tanggung Jawab Pengguna</h2>
          <p>Dengan menggunakan aplikasi ini, Anda setuju untuk:</p>
          <ul>
            <li>📝 Menggunakan aplikasi untuk tujuan yang sah dan positif</li>
            <li>🤝 Tidak menyalahgunakan fitur atau sistem aplikasi</li>
            <li>🔒 Menjaga keamanan akun Google Anda sendiri</li>
            <li>💭 Menghargai bahwa ini adalah alat refleksi pribadi, bukan pengganti konseling profesional</li>
            <li>🚫 Tidak menggunakan aplikasi untuk konten yang melanggar hukum atau merugikan</li>
          </ul>
        </div>

        <div class="terms-section">
          <div class="section-icon">⚠️</div>
          <h2>Disclaimer & Batasan</h2>
          <div class="disclaimer-box">
            <h4>🏥 Bukan Alat Medis</h4>
            <p>
              Aplikasi ini adalah alat refleksi pribadi dan <strong>bukan pengganti</strong> konsultasi kesehatan mental profesional. 
              Jika Anda mengalami masalah kesehatan mental yang serius, silakan konsultasi dengan tenaga medis yang berkualifikasi.
            </p>
          </div>

          <div class="disclaimer-box">
            <h4>🔧 As-Is Basis</h4>
            <p>
              Aplikasi disediakan "apa adanya" tanpa jaminan apa pun. Kami tidak bertanggung jawab atas kehilangan data, 
              gangguan teknis, atau masalah lain yang mungkin timbul dari penggunaan aplikasi.
            </p>
          </div>

          <div class="disclaimer-box">
            <h4>💾 Backup Data</h4>
            <p>
              Karena data disimpan di browser lokal, kami menyarankan Anda untuk secara berkala membuat backup 
              (screenshot atau copy-paste) dari jurnal penting Anda.
            </p>
          </div>
        </div>

        <div class="terms-section">
          <div class="section-icon">📞</div>
          <h2>Kontak & Dukungan</h2>
          <p>
            Jika Anda memiliki pertanyaan, saran, atau menemukan masalah dengan aplikasi ini:
          </p>
          
          <div class="contact-grid">
            <div class="contact-item">
              <div class="contact-icon">🐛</div>
              <h4>Bug Reports</h4>
              <p>Laporkan bug atau masalah teknis melalui GitHub Issues</p>
              <a href="https://github.com/harkespan/mood-journaling/issues" target="_blank" class="contact-link">
                Report Issue ↗
              </a>
            </div>
            
            <div class="contact-item">
              <div class="contact-icon">💡</div>
              <h4>Feature Requests</h4>
              <p>Usulkan fitur baru atau perbaikan melalui GitHub Discussions</p>
              <a href="https://github.com/harkespan/mood-journaling/discussions" target="_blank" class="contact-link">
                Suggest Feature ↗
              </a>
            </div>
            
            <div class="contact-item">
              <div class="contact-icon">🤝</div>
              <h4>Contributions</h4>
              <p>Kontribusi code, dokumentasi, atau terjemahan sangat diterima</p>
              <a href="https://github.com/harkespan/mood-journaling" target="_blank" class="contact-link">
                Contribute ↗
              </a>
            </div>
          </div>
        </div>

        <div class="terms-section final-section">
          <div class="section-icon">📅</div>
          <h2>Pembaruan Terms</h2>
          <p>
            Terms of Service ini dapat diperbarui dari waktu ke waktu untuk mencerminkan perubahan pada aplikasi atau persyaratan hukum. 
            Pembaruan akan diumumkan melalui repository GitHub.
          </p>
          <p class="last-updated">
            <strong>Terakhir diperbarui:</strong> {{ getCurrentDate() }}
          </p>
        </div>

        <div class="terms-footer">
          <div class="footer-content">
            <p>
              🌟 Terima kasih telah menggunakan Mood Journal! 
              Kami berharap aplikasi ini membantu Anda dalam perjalanan self-awareness dan kesehatan mental yang lebih baik.
            </p>
            <button @click="goBack" class="return-button">
              ← Kembali ke Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TermsOfService',
  methods: {
    getCurrentDate() {
      return new Date().toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    
    goBack() {
      // Navigate back to login/home page
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.terms-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px 0;
}

.terms-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.terms-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.header-content h1 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 2.5em;
  font-weight: 600;
}

.subtitle {
  margin: 0;
  color: #666;
  font-size: 1.1em;
}

.back-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 500;
  transition: transform 0.3s ease;
}

.back-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.terms-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.terms-section {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  position: relative;
}

.section-icon {
  font-size: 2.5em;
  margin-bottom: 20px;
  display: block;
}

.terms-section h2 {
  color: #333;
  font-size: 1.8em;
  font-weight: 600;
  margin: 0 0 20px 0;
}

.terms-section p {
  color: #555;
  line-height: 1.7;
  margin-bottom: 15px;
}

.terms-section ul {
  color: #555;
  line-height: 1.7;
  margin-left: 20px;
}

.terms-section li {
  margin-bottom: 8px;
}

.highlight-box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 15px;
  margin: 20px 0;
}

.highlight-box.free {
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
}

.highlight-box p {
  margin-bottom: 20px;
  font-size: 1.1em;
}

.highlight-box ul {
  list-style: none;
  margin-left: 0;
  padding: 0;
}

.highlight-box li {
  margin-bottom: 12px;
  font-size: 1.05em;
}

.github-section {
  margin: 30px 0;
}

.github-card {
  background: linear-gradient(135deg, #24292e 0%, #1a1e22 100%);
  color: white;
  padding: 30px;
  border-radius: 15px;
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.github-icon {
  font-size: 3em;
  opacity: 0.9;
}

.github-content h3 {
  margin: 0 0 10px 0;
  color: white;
  font-size: 1.3em;
}

.github-content p {
  margin: 0 0 15px 0;
  color: #ccc;
}

.github-link {
  color: #58a6ff;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1em;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(88, 166, 255, 0.1);
  border: 1px solid rgba(88, 166, 255, 0.3);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.github-link:hover {
  background: rgba(88, 166, 255, 0.2);
  border-color: rgba(88, 166, 255, 0.5);
  transform: translateY(-1px);
}

.external-icon {
  font-size: 0.9em;
}

.license-info {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 12px;
  margin-top: 25px;
}

.license-info h4 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 1.2em;
}

.license-info ul {
  margin-left: 0;
  list-style: none;
  padding: 0;
}

.license-info li {
  margin-bottom: 10px;
  color: #555;
}

.privacy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 25px;
}

.privacy-item {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 12px;
  text-align: center;
}

.privacy-icon {
  font-size: 2.5em;
  margin-bottom: 15px;
  display: block;
}

.privacy-item h4 {
  margin: 0 0 12px 0;
  color: #333;
  font-size: 1.1em;
}

.privacy-item p {
  margin: 0;
  color: #666;
  font-size: 0.95em;
  line-height: 1.5;
}

.disclaimer-box {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  padding: 20px;
  border-radius: 12px;
  margin: 15px 0;
}

.disclaimer-box h4 {
  margin: 0 0 12px 0;
  color: #856404;
  font-size: 1.1em;
}

.disclaimer-box p {
  margin: 0;
  color: #856404;
  line-height: 1.6;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 25px;
}

.contact-item {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 12px;
  text-align: center;
}

.contact-icon {
  font-size: 2.5em;
  margin-bottom: 15px;
  display: block;
}

.contact-item h4 {
  margin: 0 0 12px 0;
  color: #333;
  font-size: 1.1em;
}

.contact-item p {
  margin: 0 0 15px 0;
  color: #666;
  font-size: 0.95em;
  line-height: 1.5;
}

.contact-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  padding: 8px 16px;
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 6px;
  transition: all 0.3s ease;
  display: inline-block;
}

.contact-link:hover {
  background: rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.4);
  transform: translateY(-1px);
}

.final-section {
  border: 2px solid #667eea;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
}

.last-updated {
  font-size: 0.9em;
  color: #888;
  font-style: italic;
  margin-top: 20px;
}

.terms-footer {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  margin-top: 20px;
}

.footer-content p {
  font-size: 1.1em;
  margin-bottom: 25px;
  line-height: 1.6;
}

.return-button {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  display: inline-block;
}

.return-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .terms-container {
    padding: 0 15px;
  }
  
  .terms-header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
    padding: 25px;
  }
  
  .header-content h1 {
    font-size: 2em;
  }
  
  .terms-section {
    padding: 25px;
  }
  
  .section-icon {
    font-size: 2em;
  }
  
  .terms-section h2 {
    font-size: 1.5em;
  }
  
  .github-card {
    flex-direction: column;
    text-align: center;
    padding: 25px;
  }
  
  .privacy-grid,
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .terms-section {
    padding: 20px;
  }
  
  .highlight-box,
  .github-card,
  .license-info,
  .disclaimer-box {
    padding: 20px;
  }
  
  .github-link {
    font-size: 1em;
    padding: 8px 15px;
  }
}
</style>