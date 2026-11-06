---
title: "Proactive Agent: Ketika AI Berhenti Menunggu Disuruh"
date: 2026-11-06T23:55:00+07:00
draft: false
author: "Robin Syihab"
description: "Teknologi agentic AI hari ini masih jauh dari asisten pribadi yang sebenarnya: kita masih harus menyuruh. Tulisan ini membedah tiga masalah intinya — relevancy, materiality, dan economy — dan bagaimana decision model membuat sistem proaktif akhirnya masuk akal secara biaya."
categories: ["Teknologi"]
tags: ["agentic-ai", "proactive-agent", "decision-model", "llm", "keamanan-siber"]
images:
  - /images/proactive-agent-diagram.jpg
---

![Evonic Proactive Agent System](/images/proactive-agent-diagram.jpg)

Teknologi agentic AI yang ada saat ini sebenarnya belum layak disebut — apalagi dipakai sebagai — personal assistant. Yang kita punya sekarang pada dasarnya adalah genAI dengan tools. Bedanya dengan chatbot biasa cuma satu: dia bisa memanggil fungsi. Tapi inisiatifnya tetap milik kita. Kita yang menyusun prompt, kita yang menyiapkan konteks, kita yang menyuruh, dan kita juga yang harus ingat kalau ada sesuatu yang perlu dikerjakan.

Padahal personal assistant di dunia nyata tidak bekerja seperti itu.

Asisten yang benar tidak selalu menunggu disuruh. Dia mencari informasi sendiri, melakukan riset sendiri, lalu datang membawa masukan dan saran. Lebih dari itu, dia bisa menganalisis dan memprediksi apa yang akan terjadi pada orang yang dia bantu berdasarkan diskusi-diskusi sebelumnya, kemudian merekomendasikan langkah selanjutnya. Semua tanpa diminta.

Jarak antara dua gambaran itu bukan soal model yang lebih pintar. Ini soal arsitektur.

## Tiga masalah yang tidak selesai oleh prompt yang lebih bagus

Beberapa waktu lalu saya sempat berpikir bahwa sistem proaktif cukup dibangun dari tiga komponen sederhana: cron, scraper, dan LLM. Cron untuk membangunkan sistem secara berkala, scraper untuk mengambil data dari luar, LLM untuk memahami isinya. Ternyata tidak semudah itu.

Begitu sistem mulai berjalan, masalah sebenarnya langsung terlihat, dan letaknya bukan di kualitas model. Ada tiga hal yang harus diselesaikan lebih dulu, dan ketiganya adalah pekerjaan engineering yang serius, bukan pekerjaan prompt.

**Relevancy.** Data yang masuk tidak pernah satu atau dua. Ia datang dalam ribuan aliran: berita, rilis vendor, advisory keamanan, pengumuman regulator, diskusi publik, dokumen baru, harga pasar. Yang kita butuhkan bukan ringkasan semuanya, melainkan kemampuan memfilter lautan itu menjadi segelintir hal yang benar-benar nyambung dengan masalah yang sedang ingin kita selesaikan. Tahap ini tugasnya satu: mengubah data menjadi signal. Tanpa filter yang benar, informasi yang relevan justru tenggelam oleh hal-hal yang kebetulan terdengar penting.

**Materiality.** Ini pertanyaan berikutnya, dan jauh lebih sulit. Boleh jadi sebuah data memang relevan dengan kita, tapi belum tentu berdampak. Dan kalau berdampak, seberapa besar? Di sini sistem harus menghitung semacam _urgency_: apakah data yang sudah lolos filter tadi punya konsekuensi yang cukup besar untuk mengubah keputusan kita, atau cukup untuk sekadar kita ketahui sambil lalu. Salah menilai tahap ini membuat sistem terasa berisik, dan sistem yang berisik akan berhenti dibaca dalam hitungan hari.

**Economy.** Terakhir, dan paling sering dilupakan: seberapa murah biayanya. Biaya di sini ada dua bentuk. Yang pertama literal, benar-benar biaya komputasi dan token untuk memproses sekian banyak data setiap hari. Yang kedua adalah _worthiness_, apakah sesuatu benar-benar layak dikirim ke pengguna. Setiap notifikasi yang kita kirim memakan perhatian orang, dan perhatian adalah sumber daya yang paling terbatas di seluruh sistem ini.

Ketiga hal itu menuntut formula yang khusus, plus engineering yang hati-hati. Dulu, untuk mengubah data menjadi signal saja butuh resource yang mahal. Apalagi sampai ke tahap menilai materialitas. Dan menariknya, di era LLM seperti sekarang pun biayanya masih tetap sama besarnya. Model yang lebih pintar tidak otomatis membuat proses ini lebih murah; ia hanya membuat kesalahannya lebih meyakinkan.

## Semua berubah ketika decision model muncul

Perubahan besar datang dari satu komponen yang posisinya justru tidak glamor: decision model.

Kalau LLM dipakai untuk memahami dan menulis, decision model dipakai untuk memutuskan. Tugasnya sempit dan terukur: menilai apakah sebuah item lolos ambang relevansi, seberapa besar dampaknya, dan apakah nilainya sepadan dengan biaya mengirimkannya. Karena tugasnya sempit, modelnya bisa kecil, dan karena kecil, ia bisa dipanggil ribuan kali sehari tanpa membuat tagihan meledak.

Dengan pembagian kerja ini, arsitekturnya jadi masuk akal:

1. **Ingestion.** Scraper dan feeder menarik data dari banyak sumber secara terjadwal.
2. **Signal extraction.** Decision model menilai relevansi tiap item terhadap konteks pengguna, lalu membuang mayoritas besar di antaranya.
3. **Materiality scoring.** Item yang lolos dihitung urgensi dan besarnya dampak, dipetakan ke konteks dan riwayat diskusi pengguna.
4. **Economy gate.** Sistem memutuskan apakah item ini layak dikirim sekarang, ditunda, atau didiamkan sama sekali.
5. **Composition.** Hanya untuk item yang lolos semua gerbang, LLM menyusun penjelasan, konteks, dan rekomendasi tindakan.

Yang menarik: seluruh sistem ini bisa berjalan dengan hanya dua model di bawah 10B. Satu LLM, satu decision model. Dan semuanya bisa berjalan secara lokal.

Itu bukan detail kecil. Berjalan lokal berarti data yang diproses, termasuk riwayat diskusi pribadi dan konteks internal, tidak perlu keluar dari mesin sendiri. Biaya marginalnya juga turun drastis, karena tidak ada lagi perhitungan per token untuk setiap item yang discan. Sistem yang tadinya hanya bisa dipakai sebagai demo akhirnya bisa dinyalakan 24/7 tanpa rasa sakit setiap kali melihat tagihan.

Untuk itu saya memakai [Evonic](https://x.com/evonic_ai), yang mendukung decision model secara native. Jadi decision model bukan tempelan di luar framework, melainkan bagian dari cara kerja sistemnya, dan bisa langsung dipakai sebagai fondasi untuk membangun sistem proaktif seperti ini.

## Di keamanan siber, ini bukan kemewahan

Kalau di ranah asisten pribadi sistem proaktif terasa seperti peningkatan kenyamanan, di keamanan siber ia sudah menjadi keharusan.

Badai CVE tidak pernah berhenti. Setiap minggu ada rilis kernel, patch library, advisory framework, dan pengumuman vendor yang jumlahnya jauh melampaui kemampuan manusia untuk membacanya satu per satu. Manusia tidak mungkin mengatasinya sendiri. Kita sudah menjadi _bottleneck_-nya. Bukan karena kurang kompeten, tapi karena jumlah jam kerja manusia terbatas sementara jumlah permukaan serangan terus bertambah.

Yang dibutuhkan adalah _swarm of agent_ yang bekerja 24/7: memantau, menyaring, menilai relevansi terhadap infrastruktur yang benar-benar kita kelola, lalu merespons dengan cepat dan akurat. Bukan agent yang menunggu disuruh, karena justru masalahnya adalah tidak ada yang sempat menyuruh.

![Pesan proaktif dari Aisyah: CVE kernel Linux, jadwal rilis keamanan Node.js, dan ringkasan sukuk ritel yang sedang dipertimbangkan](/images/proactive-agent-system.jpg)

Gambar di atas adalah contoh nyatanya. Bukan demo, bukan mockup. Catatan pagi tentang tiga CVE kernel Linux yang relevan dengan server yang saya kelola, pengingat bahwa Node.js akan merilis perbaikan HIGH severity tanggal 11 November untuk release line 22.x, 24.x, dan 26.x, lengkap dengan tawaran untuk mengecek versi yang terpasang sebelum tanggal itu tiba. Semua itu datang tanpa saya minta, di jam yang masuk akal, dari sistem yang tahu proyek mana yang berjalan di atas Node.js.

Perhatikan bahwa nilai informasinya bukan pada "ada CVE baru". Nilai informasi itu ada pada kaitan antara CVE dan jadwal rilis, dengan proyek spesifik milik saya, tiga hari sebelum tenggatnya. Itu pekerjaan relevancy dan materiality, bukan pekerjaan model yang lebih besar.

## Yang paling sulit ternyata bukan teknis

Setelah semua gerbang itu berdiri, ada satu hal yang baru terasa dan tidak pernah muncul di dokumen arsitektur: kapan sistem sebaiknya diam.

Sistem yang bisa berbicara kapan saja akan berbicara terlalu sering. Formula relevansi yang longgar membuat agent terasa pintar di minggu pertama dan menjengkelkan di minggu kedua. Jadi bagian tersulit dari membangun proactive agent bukanlah membuatnya menemukan hal menarik, melainkan membuatnya menghargai perhatian orang yang dia bantu. Ambang batas, penundaan, pengelompokan, dan pemilihan waktu pengiriman sama pentingnya dengan modelnya sendiri.

Pada akhirnya, yang kita kejar bukan agent yang lebih sering muncul, melainkan agent yang benar-benar terasa hidup. Bukan sekadar personal assistant yang menunggu perintah, tapi sesuatu yang lebih dekat ke pengawas: yang benar-benar mengerti kita, yang mengingatkan kita akan bahaya yang belum terjadi, atau mengarahkan kita pada keberuntungan yang belum terpikirkan.

Itu bukan masa depan yang jauh. Dengan dua model kecil, satu decision model, dan arsitektur yang benar, sebagian besar dari itu sudah bisa dijalankan hari ini, di mesin sendiri, tanpa awan.
