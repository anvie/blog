---
title: "Menahan belasan ribu serangan perhari: Catatan Pertahanan Siber di Balik Muktamar 35 NU"
date: 2026-09-06T11:00:00+07:00
draft: false
toc: false
tags: ["siber", "keamanan-informasi", "muktamar-nu", "infrastruktur-it", "dokumentasi-teknis"]
images:
  - /images/2026-09-06-grafik-serangan-ssh.svg
---

Maghrib di hari pertama registrasi, kabel internet kami dipotong orang.

Bukan putus sendiri. Dipotong. Seseorang memanfaatkan sela-sela pergantian shift keamanan, menggunting kabel di area registrasi, lalu menghilang. Padahal acara baru dimulai hari itu juga, Muktamar ke-35 Nahdlatul Ulama, 27-30 Agustus 2026, di Pondok Pesantren Bahrul Ulum, Tambakberas, Jombang. Enam ribu peserta datang dari seluruh Indonesia, dan masalah di area registrasi langsung muncul di malam pertama.

Yang menyelamatkan malam itu bukan teknologi mahal. Tim teknisi jaringan di lapangan bergerak cepat, dipimpin Gus Rif'an dengan tim teknis jaringannya, Zainal Arifin, panitia lokal sudah menyiapkan peralatan cadangan sejak jauh hari. Kurang dari 45 menit kemudian koneksi pulih. Sebelum Isya selesai, proses registrasi kembali normal.

Insiden itu hanya satu momen, dan pelakunya dekat secara fisik. Serangan yang lebih panjang, lebih sunyi, dan datang dari jarak ribuan kilometer sudah berlangsung berminggu-minggu sebelumnya.

## Serangan mulai jauh sebelum acara

Sejak H-7, server muktamar menerima rata-rata 1.700 serangan per hari. Hampir semuanya berjenis SSH brute force, pola yang sudah sangat dikenal siapa pun 
yang pernah memegang server Linux, yakni mencoba login berulang-ulang, menebak kombinasi nama pengguna dan kata sandi, dari alamat yang berganti-ganti. 
Volume segini masih lumrah kalau hanya berlangsung sehari dua hari. Tapi ini tidak berhenti, menjelang hari H, angkanya meningkat drastis.

Tanggal 27 Agustus, hari pertama registrasi, percobaan melonjak ke ~6.000 per hari. Puncaknya jatuh dua hari kemudian, pada 29 Agustus meningkat hingga ~12.000 percobaan dalam sehari, itu baru untuk satu jenis serangan saja.

![Grafik serangan SSH brute force per hari selama Muktamar 35](/images/2026-09-06-grafik-serangan-ssh.svg)

Angka sebesar itu tidak pernah membuat kami panik, karena dari awal kami sudah menutup jalur serangan dari arah itu. Autentikasi berbasis kata sandi di server kami nonaktifkan sejak awal, kami hanya memakai autentikasi berbasis private key, yakni sepasang kunci yang dibuat exclusive di setiap perangkat team engineer kami, dan server hanya menerima login dari kunci yang sudah didaftarkan. Kata sandi bisa ditebak dan dicoba berulang-ulang, namun private key tidak bisa ditebak dengan harga murah. Begitu kata sandi tidak lagi diterima, serangan brute force jadi sia-sia.

SSH bukan satu-satunya arah masuk yang mereka coba. Aplikasi web juga dipindai terus-menerus, 600 sampai 1.000 kali per hari, mencari celah, mencoba endpoint yang tidak semestinya terbuka, menguji parameter yang rentan. Itu semua belum termasuk percobaan DDoS (Distributed Denial of Service), yakni membanjiri server utama dengan data palsu sampai sistem kewalahan dan melambat.

DDoS kami hadapi lewat desain, bukan lewat perangkat tambahan yang mahal. Web untuk publik sengaja kita buat statis, halaman yang sudah jadi, tinggal dikirim ke pengunjung, tidak perlu diproses atau dirakit ulang oleh server setiap kali ada permintaan. Server yang tidak sedang bekerja berat tidak mudah dibuat kewalahan. Hanya bagian-bagian tertentu yang kami buat dinamis, dan di bagian itulah anti-bot kita pasang. Alhasil, banjir permintaan yang biasanya dipakai untuk menjatuhkan situs tidak punya banyak celah yang bisa dibanjiri.

Ada satu temuan yang menurut kami sangat penting. Sejak H-1 hingga 30 Agustus, pola serangannya berubah. Tidak lagi seperti bot liar yang berjalan sendiri-sendiri, tapi terkordinir seperti ada yang mengatur, apalagi di era agentic AI seperti sekarang ini, antara bot terprogram dan manusia sudah sulit untuk dibedakan, mereka datang menyerang secara bersamaan maupun bergantian dengan berbagai metode berbeda, menyasar area yang berbeda. Serangan terkoordinasi. Beberapa alamat IP yang terlibat berhasil kami tangkap dan simpan baik-baik. Kalau suatu saat perlu ditelusuri asal-usulnya, jejaknya masih ada.


Alhamdulillah, hingga acara Muktamar selesai tidak ada satu pun yang berhasil masuk ke sistem IT muktamar. Tidak ada data peserta yang bocor, tidak ada layanan yang terhenti.

Kami tidak menyebut itu keberuntungan. Sejak awal, pertahanannya memang disusun dengan asumsi serangan akan datang, bukan dengan harapan pada kondisi ideal, bahkan saya perlu mereview kode-kode yg ditulis oleh kedua engineer saya, ditambah penggunaan vibe-coding  yang dipakai engineer kami juga perlu mendapatkan perhatian, untuk itu perlu dilakukan review mendalam sampai di lapisan protokol paling bawah, melakukan threat-analysis dan simulasi serangan pada kondisi ekstrem pun kita lakukan.

Di sisi digital, area-area vital di web dipasangi anti-bot. Tujuannya untuk membedakan manusia yang benar-benar akan mendaftar dari program otomatis yang mengirim permintaan ribuan kali per detik. Lalu ada arsitektur server yang sengaja dibuat berlapis. Satu server utama melayani kebutuhan sehari-hari, ditemani dua server cadangan yang standby penuh dari dua data center yang berbeda. Bila server utama tumbang, lalu lintas tinggal dialihkan ke server dua atau tiga. Rencananya seperti itu. Praktiknya, server utama ternyata bertahan sampai acara selesai. Dua server cadangan berdiri diam sepanjang Muktamar, tidak pernah sempat dipakai. Kami lega, tapi tidak menyesal menyiapkannya.

Kami menyadari serangan tidak selalu datang dari internet. Karena itu, di lapangan, by design, semua koneksi sengaja dibuat non-wireless. Tidak ada yang bergantung pada WiFi atau sinyal seluler; semuanya lewat kabel. Alasannya sinyal radio bisa di-jam dengan mudah, sedangkan k
abel harus dipotong secara fisik, dan orang yang memotongnya pasti terlihat atau setidaknya meninggalkan jejak.

Pilihan ini yang membuat insiden di malam pertama registrasi bisa ditangani. Kabel yang digunting orang memang sempat menghentikan registrasi, tapi perbaikannya cepat karena jaringannya jelas, peralatannya ada, dan orangnya siap. Inilah juga kenapa insiden serupa, atau gangguan sinyal, tidak pernah benar-benar melumpuhkan sistem Muktamar.

Satu sistem yang paling kami perhatikan adalah gate akses, tempat ribuan peserta melewati pemeriksaan setiap hari. Sistem ini kami rancang agar bisa berjalan dalam mode offline penuh. Saat internet tersedia, ia sinkron dengan server pusat. Saat internet hilang, ia tetap bekerja, dalam praktiknya, membuat sistem seperti ini tidalah mudah, karena dalam satu venue bisa ada lebih dari satu perangkat gate yang harus singkron satu sama lain dan bisa membuatkan rekap untuk absensi/kehadiran.

Ujiannya datang di area pleno, saat koneksi internet di sana hilang total. Entah karena diganggu atau karena kapasitas. Yang jelas gate tetap berfungsi, peserta tetap masuk, tidak ada antrean panjang yang mengular. Dari semua komponen sistem sepertinya bagian gate ini yang paling over-engineered, kita bahkan menanam AI agent untuk setiap perangkat gate, dengan desain awal agar bisa melakukan self-healing ketika program error atau rusak, hal ini kita lakukan karena gate adalah bagian yang paling tidak boleh berhenti. 

Semua yang kami tulis di atas baru sebagian kecil dari keseluruhan cerita. Masih banyak hal menarik yang belum sempat diceritakan di artikel ini, baik dari sisi operasional maupun detail teknis, keputusan-keputusan kecil yang dibuat buru-buru, malam-malam panjang sebelum acara, dan hal-hal di lapangan yang tidak akan tertulis di media mainstream. Mungkin suatu hari akan kami tulis di lain artikel.

Kalau ditanya apa yang paling menentukan, jawabannya tidak hanya ada di diagram arsitektur. Server cadangan, anti-bot, jaringan kabel, gate offline, semua itu cuma alat. Alat baru berguna kalau ada orang yang tahu cara memakainya dan siap saat dibutuhkan.

Faktor penentu kesuksesan yang tidak kalah pentingnya adalah kegigihan panitia lokal yang memegang peranan besar. Mereka yang memimpin langsung di lapangan di bawah arahan Gus Rozaq dan tangan dingin Gus Rif'an. Mereka yang menyiapkan peralatan cadangan sebelum insiden terjadi, yang berlari saat kabel dipotong, yang memastikan registrasi kembali jalan sebelum Isya. Tanpa mereka, desain sebaik apa pun hanya akan jadi dokumen.

Alhamdulillah Muktamar selesai dengan sukses, ~6.000 peserta pulang, dan tidak ada yang tahu seberapa dekat sistemnya dengan badai serangan. Mungkin memang itu ukuran keberhasilan yang paling nyata, ketika pertahanan bekerja, tidak ada yang menyadarinya.

[] Robin Syihab
