# 🚀 PANDUAN DEPLOY KE RAILWAY
## Deploy Game Valentine ke Internet (Gratis!)

---

## 🎯 APA ITU RAILWAY?

Railway adalah platform hosting modern yang:
- ✅ **Gratis** untuk project kecil (500 jam/bulan)
- ✅ **Mudah** digunakan (no coding required)
- ✅ **Cepat** deploy (5-10 menit)
- ✅ **HTTPS** otomatis (secure)
- ✅ **Custom domain** support

**Perfect untuk game HTML seperti ini!**

---

## 📋 YANG DIBUTUHKAN

1. **Akun GitHub** (gratis) - https://github.com
2. **Akun Railway** (gratis) - https://railway.app
3. **File game** sudah siap:
   - `index.html` ✅
   - File gambar (jika ada)
   - File musik (jika ada)

---

## 🛠️ PERSIAPAN FILE

### LANGKAH 1: Buat File Konfigurasi

Railway butuh beberapa file tambahan untuk hosting HTML statis.

#### A. Buat file `package.json`

Buat file baru bernama `package.json` (tanpa .txt), isi dengan:

```json
{
  "name": "valentine-game",
  "version": "1.0.0",
  "description": "Game Valentine Special untuk AchaImup",
  "main": "index.html",
  "scripts": {
    "start": "npx serve -s . -l 3000"
  },
  "keywords": ["valentine", "game", "html"],
  "author": "Bintang skibidi",
  "license": "MIT",
  "dependencies": {
    "serve": "^14.2.0"
  }
}
```

**Penjelasan:**
- `serve` = Web server sederhana untuk HTML statis
- Port 3000 = Railway akan akses game di port ini

---

#### B. Buat file `.gitignore` (opsional tapi recommended)

Buat file bernama `.gitignore` (ada titik di depan), isi dengan:

```
node_modules/
.DS_Store
*.log
.env
```

**Penjelasan:**
- File ini memberitahu Git untuk tidak upload file/folder yang tidak perlu

---

### LANGKAH 2: Struktur Folder Final

Pastikan folder game Anda seperti ini:

```
📁 valentine-game/
  ├── index.html              ← File game utama
  ├── package.json            ← File konfigurasi (BARU)
  ├── .gitignore              ← File ignore (BARU, opsional)
  ├── music.mp3               ← Background music (jika ada)
  ├── gambar-ai.jpg           ← Gambar AI (jika ada)
  ├── bukti-topup.jpg         ← Bukti top up (jika ada)
  └── README.md               ← Deskripsi project (opsional)
```

---

## 🌐 DEPLOY KE RAILWAY

### METODE 1: DEPLOY VIA GITHUB (RECOMMENDED) ⭐

Metode ini paling mudah dan otomatis update jika ada perubahan.

---

#### STEP 1: Upload ke GitHub

**1.1 Buat Repository Baru**

1. Buka https://github.com
2. Login / Sign up (gratis)
3. Klik tombol **"+"** (kanan atas) → **"New repository"**
4. Isi:
   - **Repository name**: `valentine-game-acha`
   - **Description**: "Game Valentine Special untuk AchaImup"
   - **Public** ✅ (pilih ini, gratis)
   - **Add README**: ❌ (tidak perlu, sudah ada file)
5. Klik **"Create repository"**

---

**1.2 Upload File ke GitHub**

Ada 2 cara:

**CARA A: Upload via Web (Mudah, Untuk Pemula)**

1. Di halaman repository yang baru dibuat
2. Klik **"uploading an existing file"** atau **"Add file"** → **"Upload files"**
3. Drag & drop semua file game ke browser:
   - `index.html`
   - `package.json`
   - `.gitignore` (jika ada)
   - File gambar & musik (jika ada)
4. Scroll ke bawah, isi:
   - **Commit message**: "Initial commit - Valentine Game"
5. Klik **"Commit changes"**

✅ **Done!** File sudah di GitHub.

---

**CARA B: Upload via Git (Advanced)**

Jika familiar dengan Git:

```bash
# Di folder game, buka terminal/cmd

# 1. Init git
git init

# 2. Add semua file
git add .

# 3. Commit
git commit -m "Initial commit - Valentine Game"

# 4. Connect ke GitHub
git remote add origin https://github.com/USERNAME/valentine-game-acha.git

# 5. Push
git branch -M main
git push -u origin main
```

Ganti `USERNAME` dengan username GitHub Anda.

---

#### STEP 2: Deploy ke Railway

**2.1 Login ke Railway**

1. Buka https://railway.app
2. Klik **"Login"** atau **"Start a New Project"**
3. Pilih **"Login with GitHub"**
4. Authorize Railway (allow access ke GitHub)

---

**2.2 Buat Project Baru**

1. Di dashboard Railway, klik **"New Project"**
2. Pilih **"Deploy from GitHub repo"**
3. Pilih repository **`valentine-game-acha`**
4. Klik repository untuk deploy

---

**2.3 Tunggu Deploy Selesai**

1. Railway akan otomatis:
   - ✅ Detect file `package.json`
   - ✅ Install dependencies
   - ✅ Run command `npm start`
   - ✅ Deploy ke server
2. Tunggu 2-5 menit (lihat log di tab "Deployments")
3. Kalau ada tulisan **"Success"** atau **"Deployed"** → ✅ Selesai!

---

**2.4 Dapatkan URL Game**

1. Di dashboard project Railway
2. Klik tab **"Settings"**
3. Scroll ke bagian **"Domains"**
4. Klik **"Generate Domain"**
5. Railway akan kasih URL gratis, contoh:
   ```
   https://valentine-game-production.up.railway.app
   ```
6. **Copy URL ini** dan buka di browser

🎉 **GAME SUDAH LIVE DI INTERNET!**

---

### METODE 2: DEPLOY VIA CLI (ALTERNATIVE)

Jika ingin deploy langsung tanpa GitHub:

#### STEP 1: Install Railway CLI

**Windows:**
```bash
npm install -g @railway/cli
```

**Mac/Linux:**
```bash
npm install -g @railway/cli
# atau
brew install railway
```

---

#### STEP 2: Login

```bash
railway login
```

Browser akan terbuka, login dengan GitHub.

---

#### STEP 3: Deploy

Di folder game, jalankan:

```bash
# 1. Init project
railway init

# 2. Link ke Railway
railway link

# 3. Deploy
railway up
```

Railway akan auto-deploy dan kasih URL.

---

## 🎨 CUSTOM DOMAIN (OPSIONAL)

Jika punya domain sendiri (misal: `valentine.achaимup.com`):

### Di Railway:

1. Buka project di Railway
2. Klik tab **"Settings"**
3. Scroll ke **"Domains"**
4. Klik **"Custom Domain"**
5. Masukkan domain: `valentine.achaимup.com`
6. Copy **CNAME** record yang diberikan

### Di Domain Provider (GoDaddy/Namecheap/Cloudflare):

1. Login ke dashboard domain
2. Buka **DNS Settings**
3. Tambahkan CNAME record:
   - **Name/Host**: `valentine` (atau `@` untuk root domain)
   - **Value/Points to**: [CNAME dari Railway]
   - **TTL**: Auto atau 3600
4. Save

Tunggu 5-60 menit untuk DNS propagation.

✅ Game bisa diakses di domain custom!

---

## 🔄 UPDATE GAME (SETELAH DEPLOY)

Jika ada perubahan pada game:

### Via GitHub (Otomatis):

1. Edit file di GitHub, atau
2. Upload file baru via web, atau
3. Push perubahan via Git:
   ```bash
   git add .
   git commit -m "Update game"
   git push
   ```
4. Railway **otomatis deploy ulang** dalam 2-3 menit!

### Via CLI:

```bash
railway up
```

---

## 📊 MONITORING & LOGS

### Cek Status Deploy:

1. Buka dashboard Railway
2. Klik tab **"Deployments"**
3. Lihat status: Building → Deploying → Success

### Lihat Error Logs:

1. Tab **"Deployments"**
2. Klik deployment yang error
3. Lihat **"Build Logs"** atau **"Deploy Logs"**

### Cek Metrics:

1. Tab **"Metrics"**
2. Lihat:
   - CPU usage
   - Memory usage
   - Network traffic

---

## 💰 PRICING & LIMITS (GRATIS)

Railway free tier:

- ✅ **$5 credit** per bulan (cukup untuk 500 jam)
- ✅ **Unlimited projects**
- ✅ **1GB disk** per project
- ✅ **1GB memory** per service
- ✅ **HTTPS** gratis
- ✅ **Custom domain** support

**Untuk game HTML statis = GRATIS SELAMANYA!**

Game kamu pakai resource minimal:
- CPU: < 1%
- Memory: ~50MB
- Traffic: Ringan

---

## ⚠️ TROUBLESHOOTING

### 1. Deploy Failed - "No build script"

**Solusi:** Pastikan file `package.json` ada dan benar.

Cek isi `package.json`:
```json
{
  "scripts": {
    "start": "npx serve -s . -l 3000"
  }
}
```

---

### 2. Deploy Success tapi 404 Not Found

**Solusi:** Port salah atau file tidak ketemu.

**Cek:**
- File `index.html` ada di root folder?
- Port di `package.json` = 3000?

---

### 3. Gambar/Music Tidak Load

**Solusi:** Path file salah.

**Perbaiki path di `index.html`:**

❌ **Salah:**
```html
<img src="C:/Users/Desktop/gambar.jpg">
<audio src="D:/Music/lagu.mp3">
```

✅ **Benar:**
```html
<img src="gambar.jpg">
<audio src="lagu.mp3">
```

Path harus **relative**, bukan absolute.

---

### 4. Deploy Lambat / Stuck

**Solusi:**
1. Refresh halaman Railway
2. Cek tab "Deployments" → lihat log
3. Kalau stuck > 10 menit, klik "Redeploy"

---

### 5. Domain Tidak Bisa Diakses

**Solusi:**
1. Tunggu 5-10 menit setelah generate domain
2. Clear browser cache (Ctrl + Shift + Del)
3. Coba incognito mode
4. Coba browser lain

---

## 🔒 TIPS KEAMANAN

### 1. Jangan Commit Credentials

Jika ada API key atau password, jangan masukkan di code!

Gunakan **Environment Variables**:

Di Railway:
1. Tab **"Variables"**
2. Klik **"New Variable"**
3. Tambahkan key-value
4. Akses di code:
   ```javascript
   const apiKey = process.env.API_KEY;
   ```

---

### 2. Enable HTTPS

Railway otomatis kasih HTTPS, pastikan:
- URL pakai `https://` bukan `http://`
- Semua resource (gambar, JS, CSS) juga HTTPS

---

## 🚀 TIPS OPTIMASI

### 1. Kompres File

Sebelum upload:
- **Gambar**: Kompres di https://tinypng.com
- **Music**: Convert ke format lebih kecil (AAC/OGG)

### 2. Enable Caching

Tambahkan di `package.json`:
```json
{
  "scripts": {
    "start": "npx serve -s . -l 3000 --cors"
  }
}
```

### 3. Minify Code (Advanced)

Untuk production, minify HTML/CSS/JS:
- Tools: https://minifier.org

---

## 📱 SHARE KE ACHA

Setelah deploy, share link dengan cara:

### 1. Short URL

Buat short link via:
- **Bitly**: https://bitly.com
- **TinyURL**: https://tinyurl.com

Contoh:
```
https://valentine-game-production.up.railway.app
↓
https://bit.ly/valentine-acha
```

### 2. QR Code

Generate QR code:
1. Buka https://qr-code-generator.com
2. Paste URL game
3. Download QR code
4. Kirim ke Acha, dia tinggal scan!

### 3. Card Preview (WhatsApp/Telegram)

Tambahkan meta tags di `<head>` index.html:

```html
<head>
    <!-- Meta tags untuk preview di chat -->
    <meta property="og:title" content="🎮 Game Valentine Special">
    <meta property="og:description" content="Game spesial dari Bintang untuk Acha 💖">
    <meta property="og:image" content="https://your-url.railway.app/preview-image.jpg">
    <meta property="og:url" content="https://your-url.railway.app">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="🎮 Game Valentine Special">
    <meta name="twitter:description" content="Game spesial dari Bintang untuk Acha 💖">
    <meta name="twitter:image" content="https://your-url.railway.app/preview-image.jpg">
</head>
```

---

## 📋 CHECKLIST DEPLOYMENT

Sebelum deploy, pastikan:

- [ ] File `index.html` sudah final
- [ ] File `package.json` sudah dibuat
- [ ] Semua path gambar/musik sudah relative
- [ ] Test game di local dulu (buka index.html)
- [ ] Akun GitHub sudah dibuat
- [ ] Akun Railway sudah dibuat
- [ ] File sudah di-upload ke GitHub
- [ ] Deploy di Railway berhasil
- [ ] URL game bisa diakses
- [ ] Game berfungsi normal di URL Railway
- [ ] Link sudah dibagikan ke Acha! 💖

---

## 🎓 ALTERNATIF HOSTING LAIN

Jika Railway tidak cocok, coba:

### 1. **Netlify** (Recommended)
- ✅ Gratis selamanya
- ✅ Drag & drop deploy
- ✅ HTTPS otomatis
- Link: https://netlify.com

### 2. **Vercel**
- ✅ Gratis
- ✅ Fast deploy
- ✅ GitHub integration
- Link: https://vercel.com

### 3. **GitHub Pages**
- ✅ Gratis
- ✅ Langsung dari repo
- ✅ URL: username.github.io/repo
- Link: https://pages.github.com

### 4. **Render**
- ✅ Gratis
- ✅ Static site support
- Link: https://render.com

### 5. **Cloudflare Pages**
- ✅ Gratis unlimited
- ✅ Super cepat (CDN global)
- Link: https://pages.cloudflare.com

---

## 💡 BONUS: ANALYTICS (TRACK VISITORS)

Mau tau berapa kali Acha buka game?

Tambahkan Google Analytics (gratis):

### Step 1: Buat Google Analytics

1. Buka https://analytics.google.com
2. Sign up / login
3. Buat property baru
4. Copy **Measurement ID** (format: G-XXXXXXXXXX)

### Step 2: Tambahkan di HTML

Di `<head>` index.html, tambahkan:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Ganti `G-XXXXXXXXXX` dengan Measurement ID Anda.

✅ Sekarang bisa lihat:
- Berapa kali game dibuka
- Dari mana (kota/negara)
- Device apa (HP/PC)
- Berapa lama main

---

## 🎉 SELAMAT!

Game Valentine Anda sekarang **LIVE DI INTERNET**! 🌐

**Next Steps:**
1. ✅ Test game di berbagai device (HP, tablet, PC)
2. ✅ Share link ke Acha 💖
3. ✅ Monitor views di Railway/Analytics
4. ✅ Update game jika perlu (push to GitHub)

---

## 📞 BUTUH BANTUAN?

**Railway Support:**
- Discord: https://discord.gg/railway
- Docs: https://docs.railway.app

**GitHub Support:**
- Docs: https://docs.github.com
- Community: https://github.community

**Chat Bintang atau tanya Claude AI lagi!** 😊

---

**🚀 Happy Deploying! Semoga Acha suka game-nya! 💖**

Dibuat dengan ❤️ oleh Claude AI untuk Bintang skibidi