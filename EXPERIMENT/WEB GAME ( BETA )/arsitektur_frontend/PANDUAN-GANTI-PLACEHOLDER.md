# 📝 PANDUAN LENGKAP MENGGANTI PLACEHOLDER
## Game Valentine Special untuk AchaImup

---

## 🎵 1. MENGGANTI BACKGROUND MUSIC

### Langkah-langkah:
1. **Siapkan file musik** format MP3
2. **Rename file** menjadi `music.mp3`
3. **Letakkan file** di folder yang sama dengan `index.html`

```
📁 Folder Game/
  ├── index.html
  └── music.mp3  ← Taruh di sini
```

### Alternatif (jika nama file berbeda):
Buka `index.html` dengan text editor, cari baris ini (sekitar baris 670):

```html
<audio id="bgMusic" loop>
    <source src="music.mp3" type="audio/mpeg">
</audio>
```

Ganti `music.mp3` dengan nama file musik Anda, contoh:
```html
<source src="lagu-romantis.mp3" type="audio/mpeg">
```

---

## 🖼️ 2. MENGGANTI PLACEHOLDER GAMBAR AI (Level 4)

### Lokasi: Level 4 - Tebak Gambar

Cari kode ini di `index.html` (sekitar baris 813):

```html
<div class="placeholder-img">
    Placeholder Gambar AI Bintank + Acha
</div>
```

### Ganti dengan gambar:
```html
<div class="placeholder-img">
    <img src="gambar-bintank-acha.jpg" style="width:100%; height:100%; object-fit:cover; border-radius:15px;" alt="Bintank & Acha">
</div>
```

### File gambar:
- **Format**: JPG, PNG, atau WEBP
- **Ukuran**: 300x300 px (atau rasio 1:1)
- **Nama file**: Terserah (contoh: `gambar-bintank-acha.jpg`)
- **Lokasi**: Folder yang sama dengan `index.html`

```
📁 Folder Game/
  ├── index.html
  └── gambar-bintank-acha.jpg  ← Taruh di sini
```

---

## 🎨 3. MENGGANTI PLACEHOLDER GAMBAR AI (Ending Page)

### Lokasi: Halaman Ending - Bagian Atas

Cari kode ini di `index.html` (sekitar baris 894):

```html
<div class="placeholder-img" style="margin: 20px auto;">
    Placeholder Gambar AI
</div>
```

### Ganti dengan gambar:
```html
<div class="placeholder-img" style="margin: 20px auto;">
    <img src="gambar-ending.jpg" style="width:100%; height:100%; object-fit:cover; border-radius:15px;" alt="Untuk Acha">
</div>
```

### File gambar:
- **Nama file**: `gambar-ending.jpg` (atau nama lain)
- **Lokasi**: Folder yang sama dengan `index.html`

---

## 💳 4. MENGGANTI PLACEHOLDER BUKTI TOP UP (Preview)

### Lokasi: Halaman Ending - Preview Bukti

Cari kode ini di `index.html` (sekitar baris 924):

```html
<div class="preview-box">
    Placeholder Bukti Top Up
</div>
```

### Ganti dengan gambar kecil (thumbnail):
```html
<div class="preview-box" style="padding:0;">
    <img src="bukti-topup-preview.jpg" style="width:100%; border-radius:10px;" alt="Preview Bukti">
</div>
```

### File gambar:
- **Nama file**: `bukti-topup-preview.jpg`
- **Ukuran**: Bebas (akan auto-resize)
- **Lokasi**: Folder yang sama dengan `index.html`

---

## 🔍 5. MENGGANTI PLACEHOLDER BUKTI ASLI (Modal Fullscreen)

### Lokasi: Modal Pop-up (Tombol "Lihat Bukti Asli")

Cari kode ini di `index.html` (sekitar baris 945):

```html
<div style="font-size: 2em; text-align: center; padding: 60px; background: rgba(255,255,255,0.05); border-radius: 15px;">
    Placeholder Bukti Asli Top Up
</div>
```

### Ganti dengan gambar full:
```html
<div style="text-align: center; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 15px;">
    <img src="bukti-topup-asli.jpg" style="max-width:100%; max-height:80vh; border-radius:10px;" alt="Bukti Asli">
</div>
```

### File gambar:
- **Nama file**: `bukti-topup-asli.jpg`
- **Ukuran**: Resolusi tinggi (akan ditampilkan fullscreen)
- **Lokasi**: Folder yang sama dengan `index.html`

---

## 📊 6. MENGUBAH ISI TABEL HADIAH

### Lokasi: Halaman Ending - Tabel "Isi Kotak"

Cari kode ini di `index.html` (sekitar baris 902):

```html
<table class="gift-table">
    <tr>
        <td>Player</td>
        <td>AchaImup</td>
    </tr>
    <tr>
        <td>Game</td>
        <td>Mobile Legends</td>
    </tr>
    <tr>
        <td>Item</td>
        <td>💎 Diamonds</td>
    </tr>
    <tr>
        <td>Dari</td>
        <td>Bintang skibidi</td>
    </tr>
    <tr>
        <td>Status</td>
        <td>✅ Sudah di top up</td>
    </tr>
</table>
```

### Cara ubah:
- **Player**: Ganti `AchaImup` dengan username/nama
- **Game**: Ganti `Mobile Legends` dengan nama game lain
- **Item**: Ganti `💎 Diamonds` dengan item yang di-top up
- **Dari**: Ganti `Bintang skibidi` dengan nama pengirim
- **Status**: Ganti status sesuai kebutuhan

### Contoh untuk game lain:
```html
<tr>
    <td>Game</td>
    <td>Free Fire</td>
</tr>
<tr>
    <td>Item</td>
    <td>💎 500 Diamonds</td>
</tr>
```

---

## 🎯 STRUKTUR FOLDER FINAL

Setelah semua diganti, struktur folder harus seperti ini:

```
📁 Folder Game Valentine/
  ├── index.html                    (File utama)
  ├── music.mp3                     (Background music)
  ├── gambar-bintank-acha.jpg      (Gambar Level 4)
  ├── gambar-ending.jpg            (Gambar Ending)
  ├── bukti-topup-preview.jpg      (Preview bukti)
  └── bukti-topup-asli.jpg         (Bukti fullscreen)
```

---

## 🛠️ TOOLS YANG DIBUTUHKAN

### Untuk Edit File HTML:
- **Notepad++** (Windows) - Gratis
- **Visual Studio Code** (Semua OS) - Gratis
- **Sublime Text** (Semua OS) - Gratis
- **Notepad** bawaan Windows juga bisa

### Download:
- Notepad++: https://notepad-plus-plus.org/
- VS Code: https://code.visualstudio.com/

---

## 📱 CARA BUKA/EDIT FILE

### Windows:
1. Klik kanan `index.html`
2. Pilih **"Open with"** atau **"Buka dengan"**
3. Pilih **Notepad++** atau **VS Code**

### Mac:
1. Klik kanan `index.html`
2. Pilih **"Open With"**
3. Pilih **TextEdit** atau **VS Code**

### Online (Tanpa Install):
Bisa pakai https://playcode.io/html atau https://codepen.io/

---

## ⚠️ TIPS PENTING

1. **Backup File Original**
   - Copy `index.html` sebelum edit
   - Rename jadi `index-backup.html`

2. **Nama File Gambar**
   - Jangan pakai spasi (❌ `gambar acha.jpg`)
   - Pakai dash/underscore (✅ `gambar-acha.jpg` atau `gambar_acha.jpg`)
   - Huruf kecil semua lebih aman

3. **Format Gambar**
   - JPG untuk foto (file kecil)
   - PNG untuk gambar dengan transparansi
   - WEBP untuk kualitas terbaik & file kecil

4. **Ukuran File**
   - Music: Max 5MB (biar cepat load)
   - Gambar: Kompres dulu jika terlalu besar
   - Tools kompres: https://tinypng.com/ atau https://compressor.io/

5. **Testing**
   - Setiap kali edit, refresh browser (F5)
   - Test di browser berbeda (Chrome, Firefox, Edge)
   - Test di HP juga

---

## 🆘 TROUBLESHOOTING

### Gambar tidak muncul?
✅ Cek nama file sama persis (case-sensitive)
✅ Cek file ada di folder yang sama
✅ Refresh browser (Ctrl+F5 atau Cmd+Shift+R)

### Music tidak play?
✅ Cek format file (harus MP3)
✅ Klik tombol Music ON di kanan atas
✅ Cek volume browser tidak mute

### Error setelah edit?
✅ Cek tanda `<` dan `>` tidak hilang
✅ Cek tanda kutip `"` masih lengkap
✅ Restore dari backup dan coba lagi

---

## 📞 BUTUH BANTUAN?

Jika ada error atau bingung:
1. Screenshot bagian yang error
2. Copy kode yang di-edit
3. Chat Bintang atau tanya Claude AI lagi

---

## ✨ BONUS: CUSTOM LEBIH LANJUT

### Ubah Warna Tema
Cari bagian CSS (baris 15-20):
```css
background: linear-gradient(to bottom, #0a1128, #001f54, #000000);
```

Ganti kode warna sesuai selera:
- `#0a1128` = Warna atas
- `#001f54` = Warna tengah  
- `#000000` = Warna bawah

### Ubah Font
Tambahkan di bagian `<head>` (setelah baris 6):
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">
```

Lalu di CSS (baris 17), ganti:
```css
font-family: 'Poppins', sans-serif;
```

---

**🎮 Selamat Mengedit & Happy Valentine! 💖**

Dibuat dengan ❤️ oleh Claude AI untuk Bintang skibidi