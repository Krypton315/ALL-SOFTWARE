Siapp 😎✨
Ini versi revisi prompt untuk Claude AI, sudah ditambahkan effect visual pada kolom/jawaban jika salah tanpa mengubah aturan sebelumnya.

Kamu tinggal copy–paste 👇

🎯 PROMPT UNTUK CLAUDE AI (REVISI + EFFECT SALAH)

Buatkan saya frontend website interaktif menggunakan:

HTML

CSS

Vanilla JavaScript (tanpa framework)

Semua dalam 1 file index.html

Responsive (mobile friendly)

Animasi halus dan smooth transition antar halaman

Tanpa mengubah sedikitpun isi teks yang saya berikan

⚠️ PENTING:

Dilarang mengubah, memperbaiki, merapikan, atau mengganti teks.

Semua typo, emoji, huruf kapital, dan gaya bahasa harus tetap sama persis.

Jangan tambahkan teks baru.

Jangan hapus teks apapun.

Gunakan teks EXACT seperti yang saya kirim.

🌌 TEMA DESIGN

Tema: Langit malam romantis

Detail visual:

Background gradasi biru tua ke hitam

Efek bintang-bintang kecil berkedip (CSS animation)

Partikel bintang bergerak pelan

Glow lembut pada card

Tombol dengan efek hover glowing

Font clean dan modern

Transisi fade in/out antar halaman

Animasi kecil saat tombol ditekan

Tambahkan:

Placeholder background music (audio tag dengan comment: "Ganti dengan file music")

Tombol toggle music ON/OFF

❗ EFFECT JIKA JAWABAN SALAH (WAJIB ADA)

Jika user memilih jawaban yang salah, berikan effect visual pada kolom/jawaban yang diklik:

Shake animation (getar kiri-kanan cepat 0.4s)

Border merah glow

Background merah transparan tipis

Efek pulse merah 1x

Munculkan teks feedback sesuai level

Setelah 1 detik kembali normal

Tidak langsung pindah halaman

Jika jawaban benar:

Border hijau glow

Efek scale sedikit membesar

Confetti kecil

Setelah 1 detik baru lanjut / aktifkan tombol lanjut

Gunakan CSS animation + class toggle via JavaScript.

🧱 STRUKTUR GAME

Gunakan sistem SPA (Single Page Application):

Semua halaman dalam 1 file

Hide/show section dengan JS

Transisi fade antar halaman

Halaman:

Intro

Transisi

Level 1

Level 2

Level 3

Level 4

Level 5

Transisi hadiah

Ending page

🎮 LOGIC LEVEL

LEVEL 1
Jawaban benar: B

LEVEL 2
Jawaban benar: 🏎

LEVEL 3
Jawaban benar: 😳 Salting

LEVEL 4
Jawaban benar: C

LEVEL 5
Mini game:

Grid 10x10

Karakter 👫

Tombol ⬅️ ➡️ ⬆️ ⬇

Rintangan random:

api (3)

kucink (3)

tikus (3)

mobil (3)

Collision → reset posisi + tampilkan feedback

Sampai 🎁 → lanjut halaman

Tambahkan popup kecil di atas karakter saat kena rintangan.

🖼 PLACEHOLDER WAJIB

Placeholder Tebak Gambar (Level 4)

Kotak 300x300

Tulisan:
"Placeholder Gambar AI Bintank + Acha"

Border glow

Placeholder Bukti Top Up

Card preview dummy

Tombol "Lihat Bukti Asli"

Modal fullscreen

Isi modal:
"Placeholder Bukti Asli Top Up"

Placeholder Gambar AI Ending

Card:
"Placeholder Gambar AI"

🎁 ENDING PAGE DESIGN

Urutan:
🎨 Gambar AI + pesan
🎁 Section “Isi Kotak”
💳 Card Top Up
🖼 Preview Bukti
🔍 Modal Fullscreen

Style:

Glassmorphism

Glow lembut

Chest goyang pelan

Partikel ✨

Confetti saat halaman muncul

Tambahkan tombol:

Simpan (html2canvas)

Replay (reset game)

🧠 TAMBAHAN TEKNIS

Modular JS per level

Rintangan random tiap reload

Clean structure

Banyak comment penjelasan

Animasi smooth

Tidak boleh mengubah teks

📝 GUNAKAN TEKS BERIKUT TANPA DIUBAH SEDIKITPUN:

Halaman intro :

🎮 Game pengganti Cokelat 🎉🍫
Ini game spesial buwat hari valentine.
Gamenya khusus hanya untuk AchaImup🥳😘.

Sebenarnya saya mawu kasih cokelat buat Achaa,
tapi cokelatnya sudah mencyair😭😹
jadi saya ganti pake game ini saja buwatan Bintang skibidi soalnya saya pero kalau soal coding😎👌  .

Gamenya bukan teka-teki biasa. Tapi tentang saya sama Acha,
Terus ada juga semdikit kagetan… mangsudnya kejutan 😁✨.

⏱️ Waktu mainnya : ± 10 Menit
🧩 Isi gamenya : Teka-teki tentang kita😚.

Ohhwj iyahj, nanti kalau Acha bingung atau ada Error, langsung chat saya saja🤓🔧👍.

Silahkan Main😊👐.
Tekan tombol "MULAI" yang ada di bawah ituw 👇

[ MULAI ]

---

Halaman transisi :

Haii AchaImup 😆👋

Sekarang Acha sudah masuk ke game kecil buatan Bintang skibidi 😎🎮.
Teynang saja, ini bukan soal ujian semkolah di spendu😹.

Jawab santai saja, Kalau salah masih bisa pilih jawaban lain lagi😁.

Kalau sudah siap, ayow lanjut 😊👐.

[ LANJUT ▶ ]

---

Halaman level 01 :

Judul
Level 1 — Masih pemanasan 😆
Pertanyaan
Siapa orank yang tidurnya siang bangunnya malam 😴😹

Pilihan (UI)
A. Bintang
B. Acha
C. Kucing Xena
D. Akbar

Logic (code, bukan UI)
B = true

Feedback konsep
A → “Saya bangunnya sore 😁. Kalau malam Bintang dilangit😉🌠”
B → “Beytul 😴😂, mangkanya Acha malam² belum bobo 😆.”
C → “Kayaknya bukan Xena 😽, dia kan beybas😹.”
D → "Kalau Akbar saya tydack tahu🗿🤙."

---

Halaman level 02 :

Judul:
Level 2 — Dikit misteri 😼
Instruksi:
“Satu hal yang Bintank sama Acha sumka 😍.”
UI:
[ 🐭 ] [ 💸 ] [ 🏎 ] [ 🎮 ]
Logic:
🏎 = true
Feedback:
salah → “Mungkin yang lain 😹, Coba cari lagi😁.”
benar → “Iyahhj😆, Bintank sama Acha kan sumka Mobil - Mobilan 😉👍.”

---

Halaman level 03 :

Judul
Level 3 — Sedikits uynik 😼✨
Instruksi
“Waktu Acha eye contact sama Bintank, biasanya Bintank bagaimana 😆.”
UI
[ 😆 Senyum ]
[ 😴 Ngantuk ]
[ 😳 Salting ]
[ 😐 Biasa saja ]
Logic
😳 = true
Feedback
salah →
“Emm 😹,  Bintank sering buang muka duluan 😆.”
benar →
“Iyahjj Beytul 😏, mangkanya saya pura² lihat ke langit 😚☁️.”

---

Halaman level 04 :

Judul
Level 4 — Bingung dikit 😼🧩
Instruksi
“Coba tebak gambar ini sama kayak di mana? 😆.”

UI
Ada gambar.
A. Di semkolah
B. Di rumah Acha
C. Di Mimpi Bintank
D. Di Mimpi Acha


Contoh tema gambar:
👉 ilustrasi AI Bintank + Acha.

Logic
True : C → selesai.

Feedback
False →
“Bukann di situu😆, dimanaa yahhj 😹.”

berhasil →
“Wooowhj 😆✨, beytul 😎. Nantii jadi aseli Aamiin 🤭.”

---

Halaman level 05 :

Judul
Level 5 — Ayow ambil hadiah 😼🎁
Instruksi
“Sekarang Acha jalan ke hadiahnya 😆.
Lewatin rintangannya sampe ketemu kotak hadiah di ujung sana 😼✨.”

UI
Karakter: emoji 👫
Tombol: ⬅️ ➡️ ⬆️ ⬇
Map kecil ala mario.
Rintangan: api(3×), kucink(3x), tikus(3x), mobil(3x), semua posisi rintangannya di acak

Goal
👉 Sampai ke Chest 🎁.

Logic
Kena api → reset posisi.
Kena rintangan → reset posisi.
Sentuh 🎁 → lanjut ke Transisi.

Feedback
kena api  →
“Upshj 😹, Peylan - peylan Achaa 😆.”
kena kucink, tikus →
“Hati - hatii 😆, nnti digigit 😹.”
kena mobil  →
"Awass mobilnyaa Tajamm 😨"
deket chest →
“Ayow semangat Dikits lagii 😳✨.”
sampai chest →
“Yayyhj 😆🎁, ketemuu hadiahnya 😳.”

---

Halaman Transisi :

Judul
Selamatt... sampai di kotaknyaa 😚🎁

Isi teks
“Wooowhj 😆, Achaa heybaat.
Tadi hampir digigit titus sama kucink, hampir kebakar juga Tapii sekrang sudah sampaii 😼✨.

Kotaknya imuuppp 🤭👉👈,
tapi isinya spesial walaupun cuma dikits, khususs buwat Acha.

Sebelum dibuka…
tarik talii duluu... Ehhj napas mangsudnyaa 😚.
Siap-siap yaahjj 😆🎁.”

UI
Background lembut / gelap tipis.
Chest di tengah, goyang pelan.
Partikel kecil ✨.

Tombol
[ BUKA HADIAH 🎁 ]
Logic
Klik tombol → masuk ke Ending Page.

---

Halaman Ending :

Urutannya di halaman ending:
🎨 Gambar AI + pesan
🎁 Section “Isi Kotak”
💳 Card Top Up
🖼 Preview Bukti
🔍 Modal Fullscreen
Visualnya kayak:
Hadiah → Info → Bukti nyata.

Struktur Ui :

[ Judul Hadiah ]
[ Gambar AI ]

[ Card Hadiah Game ]
Player
Game
Item
Dari
Status

[ Preview Bukti ]
[ Tombol Lihat Bukti Asli ]

[ Tombol Simpan / Replay ]

Pesan :

lof youuch Achat gpt
