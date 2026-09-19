# Daftar Tugas — React Native (Expo)

Aplikasi to-do sederhana dengan React Native + Expo. Bisa langsung dicoba di iPhone
tanpa Mac dan tanpa Xcode.

## Cara test di iPhone (tanpa laptop)

1. Install **Expo Go** dari App Store.
2. Buka di browser HP: https://snack.expo.dev/@git/github.com/julian0796/react-native
   (Snack akan memuat kode dari repo ini.)
3. Di Snack, tekan tombol **Run** / **My Device**, lalu pilih buka di Expo Go.

Alternatif: buka https://snack.expo.dev di HP, lalu salin isi `App.js` repo ini ke editor Snack.

## Cara test dari laptop

```bash
npm install
npx expo start
```

Scan QR yang muncul memakai kamera iPhone → terbuka di Expo Go.

## Fitur

- Tambah tugas lewat input di atas
- Ketuk kartu untuk menandai selesai
- Tahan (long press) kartu untuk menghapus
- Penghitung tugas yang belum selesai
