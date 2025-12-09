[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/PAiQDgnZ)

# RevoFun Game Center

RevoFun adalah platform game berbasis web yang menyediakan koleksi permainan interaktif sederhana. Proyek ini dikembangkan sebagai bagian dari Milestone 2 untuk mendemonstrasikan penggunaan HTML, CSS (Tailwind), dan JavaScript (Canvas API & DOM Manipulation).

## Daftar Isi

1.  [Deskripsi Proyek](#deskripsi-proyek)
2.  [Daftar Permainan](#daftar-permainan)
3.  [Struktur Folder](#struktur-folder)
4.  [Cara Menjalankan Proyek](#cara-menjalankan-proyek)
5.  [Teknologi yang Digunakan](#teknologi-yang-digunakan)

## Deskripsi Proyek

Aplikasi ini berfungsi sebagai portal game (Game Center) di mana pengguna dapat memilih dan memainkan berbagai jenis permainan mini langsung dari browser tanpa perlu instalasi tambahan. Setiap permainan dirancang dengan logika JavaScript murni dan styling menggunakan Tailwind CSS.

## Daftar Permainan

### 1. Volley Game
Permainan bola voli 1 lawan 1 menggunakan fisika sederhana.
-   **Kontrol Pemain 1 (Biru):** Tombol `W` (Lompat), `A` (Kiri), `D` (Kanan).
-   **Kontrol Pemain 2 (Kuning):** Tombol `Panah Atas` (Lompat), `Panah Kiri`, `Panah Kanan`.
-   **Fitur:** Deteksi tabrakan (collision detection), gravitasi, dan skor otomatis.

### 2. Tebak Gambar (Hybrid Animals)
Permainan asah otak di mana pemain harus menebak nama hewan berdasarkan gambar.
-   **Mekanisme:** Pemain diberikan gambar potongan atau sebagian (Puzzle).
-   **Fitur Hint:** Jika pemain salah menebak sebanyak 2 kali, gambar akan otomatis berubah menjadi gambar utuh (Hint) untuk membantu pemain.
-   **Aset:** Menggunakan file gambar lokal yang disimpan di folder assets.

### 3. Whack-a-Mole
Permainan ketangkasan klasik memukul tikus tanah.
-   **Mekanisme:** Tikus akan muncul secara acak dari lubang. Pemain harus mengklik tikus tersebut sebelum menghilang.
-   **Fitur:** Sistem skor, batas waktu (timer), dan rendering grafis menggunakan HTML5 Canvas.

## Struktur Folder

Berikut adalah struktur direktori lengkap dari proyek ini:

```
milestone-2-yogaaaa123/
├── dist/
│   └── output.css          # File CSS hasil kompilasi Tailwind
├── games/                  # Folder utama berisi semua permainan
│   ├── tebak-gambar/       # Folder khusus game Tebak Gambar
│   │   ├── assets/         # Menyimpan gambar soal (ayam.jpg, ayam1.jpg, dll)
│   │   ├── index.html      # Halaman utama game Tebak Gambar
│   │   └── TebakGambar.js  # Logika permainan Tebak Gambar
│   ├── volley/             # Folder khusus game Volley
│   │   ├── Ball.js         # Class untuk objek Bola
│   │   ├── Game.js         # Class utama logika permainan (Loop, Score)
│   │   ├── InputHandler.js # Class untuk menangani input keyboard
│   │   ├── Player.js       # Class untuk objek Pemain (Slime)
│   │   ├── constants.js    # Konstanta fisika (Gravitasi, Kecepatan)
│   │   ├── index.html      # Halaman utama game Volley
│   │   └── main.js         # Entry point script game Volley
│   └── whack-a-mole/       # Folder khusus game Whack-a-Mole
│       ├── index.html      # Halaman utama game Whack-a-Mole
│       └── WhackAMole.js   # Logika permainan Whack-a-Mole (Canvas)
├── node_modules/           # Folder dependensi NPM (Tailwind, dll)
├── index.html              # Halaman Beranda (Menu Utama)
├── package.json            # File konfigurasi proyek dan dependensi
├── package-lock.json       # File lock versi dependensi
├── styles.css              # File CSS sumber (input) untuk Tailwind
└── README.md               # Dokumentasi proyek ini
```

## Cara Menjalankan Proyek

### Prasyarat
Pastikan Anda telah menginstal **Node.js** dan **npm** di komputer Anda.

### Langkah-langkah

1.  **Instalasi Dependensi**
    Buka terminal di folder root proyek dan jalankan perintah berikut untuk menginstal Tailwind CSS:
    ```bash
    npm install
    ```

2.  **Kompilasi CSS (Tailwind)**
    Jalankan perintah berikut untuk menghasilkan file CSS:
    ```bash
    npx @tailwindcss/cli -i ./styles.css -o ./dist/output.css --watch
    ```
    Biarkan terminal ini terbuka jika Anda sedang melakukan pengembangan agar CSS otomatis diperbarui saat ada perubahan.

3.  **Menjalankan Aplikasi**
    Disarankan menggunakan ekstensi **Live Server** di VS Code.
    -   Buka file `index.html` di VS Code.
    -   Klik kanan dan pilih "Open with Live Server".
    -   Browser akan otomatis terbuka menampilkan halaman beranda.

## Teknologi yang Digunakan

-   **HTML5:** Struktur halaman dan elemen Canvas.
-   **CSS3 (Tailwind CSS v4):** Styling responsif dan modern.
-   **JavaScript (ES6+):** Logika permainan, manipulasi DOM, dan Canvas API.