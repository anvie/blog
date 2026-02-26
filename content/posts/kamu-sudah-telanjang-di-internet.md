---
title: "Kamu Sudah Telanjang di Internet"
date: 2026-02-26
draft: false
author: "Robin Syihab"
description: "Sebuah paper terbaru membuktikan bahwa AI bisa membongkar identitas asli pengguna anonim hanya dari teks yang mereka tulis. Privasi di internet mungkin sudah mati."
tags: ["privasi", "AI", "keamanan digital", "LLM", "deanonymization"]
images:
  - /images/2026-02-26-telanjang-internet-og.jpg
---

![Ilustrasi kerumunan orang di jalan kota, masing-masing menyeret pita kertas bertulisan yang membuka identitas mereka, sementara kaca pembesar raksasa mengawasi dari langit](/images/2026-02-26-telanjang-internet.png)

Setiap kali kamu mengetik sesuatu di internet, kamu meninggalkan sidik jari. Lebih buruk lagi, semakin banyak yang kamu ketik, semakin telanjang dirimu di Internet, cara kamu menyusun kalimat, topik yang kamu bahas, opini yang kamu lontarkan seperti pandangan politik, bahkan cara kamu memberi rating film. Semua itu, yang selama ini kamu anggap tersembunyi di balik username anonim, ternyata cukup untuk membongkar siapa kamu sebenarnya, dan itu tidak lagi sulit, thanks to LLM.

Februari 2026, sekelompok peneliti dari ETH Zurich dan Anthropic menerbitkan paper yang seharusnya membuat kita semua gelisah. Judulnya: *Large-scale online deanonymization with LLMs*. Intinya mereka membuktikan bahwa AI bisa mengidentifikasi pengguna anonim secara otomatis, massal, dan murah.

Caranya? Mereka membangun pipeline empat tahap. Pertama, AI mengekstrak "micro-data" dari tulisan seseorang: demografi, minat, gaya bahasa, detail karir yang terselip di antara komentar-komentar kasual. Kedua, data itu diubah menjadi vektor dan dicocokkan dengan jutaan profil kandidat. Ketiga, AI melakukan *reasoning* untuk memverifikasi kecocokan. Keempat, sistem mengkalibrasi tingkat keyakinannya.

Hasilnya? Dari 338 pengguna Hacker News yang mereka uji, 226 berhasil diidentifikasi dan dicocokkan dengan profil LinkedIn asli mereka. Itu 67 persen, dengan akurasi 90 persen. Biaya per profil? Satu hingga empat dolar. Yang dulu membutuhkan investigator profesional berjam-jam, sekarang bisa dilakukan AI dalam hitungan menit dengan biaya secangkir kopi. Menariknya apa yang dijadikan bahan identifikasi hanya berupa teks biasa. Bukan metadata, bukan alamat IP, bukan cookies. Hanya kata-kata yang kamu tulis.

Peneliti bahkan berhasil mencocokkan pengguna Reddit lintas komunitas hanya dari review film. Kamu suka film horor, memberi penilaian positif untuk film tertentu, menggunakan frasa khas saat mengkritik akting, dan secara tidak sadar menyebut bahwa kamu tinggal di kota tertentu. Gabungkan semua itu, dan AI punya cukup bahan untuk menunjuk tepat ke arahmu di antara puluhan ribu orang.

Setiap kali kamu mengetik prompt ke ChatGPT, kamu menyerahkan micro-data tentang dirimu. Cara kamu bertanya mengungkapkan tingkat keahlianmu. Topik yang kamu tanyakan mengungkapkan pekerjaanmu. Bahasa campuran yang kamu gunakan mengungkapkan latar belakangmu. Detail-detail kecil yang kamu sebutkan sambil lalu, yang kamu pikir tidak berarti apa-apa, ternyata adalah puzzle pieces yang bisa disusun menjadi potret lengkap tentang siapa kamu.

Ini ironis, ketika kita berlomba-lomba mengadopsi AI untuk produktivitas, untuk kenyamanan, untuk efisiensi. Tapi teknologi yang sama yang membantu kita menulis email juga bisa membaca siapa kita dari cara kita menulis email itu. Kita memberi makan mesin dengan data paling intim tentang diri kita, pikiran kita, kekhawatiran kita, ambisi kita, semuanya dikemas dalam prompt-prompt yang kita anggap privat.

Selama ini kita merasa aman bukan karena anonimitas kita kuat, tapi karena membongkarnya terlalu mahal dan terlalu sulit. Inilah yang disebut sebagai *practical obscurity*. Seperti rumah yang tidak dikunci tapi terletak di ujung gang sempit yang tidak ada orang lewat. Kita merasa aman bukan karena pintunya terkunci, tapi karena tidak ada yang mau repot-repot datang. LLM mengubah kalkulasi itu secara fundamental. Sekarang untuk ke rumah "privat"-mu itu sangat mudah dan murah.

Kamu sudah telanjang di internet. Kamu hanya belum tahu siapa yang sedang memperhatikan.

—Robin Syihab
