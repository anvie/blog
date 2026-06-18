---
title: "Sistem yang Layak Dipercaya Tidak Meminta Kita untuk Percaya"
date: 2026-06-18
draft: false
author: "Robin Syihab"
description: "Mengapa sistem digital rentan terhadap kecurangan senyap, bagaimana blockchain bisa menjadi bagian dari solusi, dan mengapa kombinasi tiga lapisan pengawasan lebih penting dari teknologi itu sendiri."
tags: ["teknologi", "blockchain", "pemilu", "kepercayaan", "sistem-digital"]
images:
  - /images/2026-06-18-trustless-system-og.jpg
---

![Ilustrasi](/images/2026-06-18-trustless-system.png)

Bayangkan sebuah pemilihan selesai. Hasilnya diumumkan. Lalu seseorang bertanya: "Dari mana kamu tahu angka itu benar?"

Pertanyaan ini terdengar sederhana, tapi coba dijawab dengan jujur, mengapa kita percaya? Apakah kita percaya karena panitia bilang begitu? Atau kita percaya karena sistemnya terlihat resmi? Atau kita percaya karena tidak ada yang protes? Mengapa tidak ada yang protes? Karena yang protes tidak punya bukti yang cukup kuat untuk menggugat.

Model kepercayaan semacam ini sebenarnya rapuh, karena bertumpu pada asumsi bahwa semua orang yang terlibat bertindak jujur, bahwa tidak ada tekanan dari luar, bahwa operator sistem tidak punya kepentingan tersembunyi. Asumsi-asumsi itu mungkin benar, tapi bisa jadi tidak, lalu bagaimana solusinya?

Ketika sebuah organisasi memigrasikan proses pemilihannya ke sistem digital, ada asumsi yang sering tidak diucapkan bahwa sistem digital lebih aman dari sistem manual karena terasa lebih modern, lebih rapi, lebih terukur. Padahal yang terjadi seringkali sebaliknya. Sistem digital konvensional memindahkan kepercayaan dari prosedur yang bisa diamati banyak orang, ke sebuah perangkat lunak yang hanya dipahami oleh segelintir orang. Di sana ada tim teknis dengan akses penuh. Ada basis data yang bisa dimodifikasi tanpa meninggalkan jejak yang terlihat oleh publik. Ada satu titik kegagalan yang jika berhasil dipengaruhi, dapat mengubah segalanya tanpa ada yang menyadari.

Ini yang disebut super admin problem. Bukan tuduhan bahwa seseorang pasti curang. Melainkan pengakuan bahwa arsitektur sistemnya memungkinkan kecurangan terjadi secara senyap, dan tidak ada mekanisme untuk membuktikan setelahnya.

Untuk itu setiap sistem yang mengelola kepentingan orang banyak harus bisa menjawab lima pertanyaan sekaligus. Apakah data yang masuk tidak dimanipulasi? Apakah yang aktifitas penggunanya bisa dibuktikan tanpa bisa disangkal? Apakah prosesnya bisa diverifikasi oleh pihak luar? Apakah sistemnya tahan terhadap gangguan? Apakah rekam jejaknya tersimpan secara permanen? Dalam bahasa teknis, kelima hal itu adalah integritas, non-repudiation, transparansi, ketersediaan, dan imutabilitas. Sistem konvensional biasanya memenuhi satu atau dua di antaranya. Sangat jarang ada yang memenuhi kelimanya sekaligus, dan ketika ada yang kurang, celah itu menjadi tempat di mana sengketa muncul.

Dari sinilah muncul pertanyaan: adakah solusi teknologi yang mampu memenuhi kelimanya?

Salah satu yang paling mendekati adalah Blockchain. Tetapi blockchain muncul bukan sebagai solusi total, melainkan sebagai konsekuensi logis dari masalah yang sudah kita urai. Blockchain dirancang untuk situasi di mana banyak pihak perlu menyepakati kebenaran tanpa harus mempercayai satu entitas tunggal sebagai penjaga kebenarannya biasa disebut sebagai Trustless atau Decentralized Consensus. Setiap transaksi ditandatangani secara kriptografis sehingga sumbernya tidak bisa disangkal. Setiap blok terhubung ke blok sebelumnya sehingga perubahan di satu titik akan terlihat di seluruh jaringan. Tidak ada satu pun pihak yang bisa mengubah catatan diam-diam karena tidak ada satu pun pihak yang memegang kendali penuh.

Blockhain itu memindahkan kepercayaan dari manusia ke matematika, karena matematika tidak bisa disuap, tidak bisa ditekan, dan tidak bisa lupa.

Tetapi blockchain memiliki keterbatasan, dia menjamin integritas data di dalam rantainya, tapi tidak bisa menjamin kebenaran data sebelum masuk di dalamnya, kemudian kompleksitasnya bisa menjadi kotak hitam baru bagi mereka yang tidak memiliki literasi teknis.

Lalu bagaimana solusinya?

Agar kita bisa memanfaatkan teknologi untuk hal semacam ini, solusi terbaik adalah kombinasi dari tiga lapisan yang bekerja bersama dan saling mengawasi.
Blockchain sebagai lapisan kepercayaan teknis. Setiap suara dicatat sebagai transaksi yang ditandatangani secara kriptografis, tidak bisa diubah, dan bisa diverifikasi oleh siapa pun tanpa perlu mengakses sistem inti.
Verifikasi identitas yang terdesentralisasi. Daftar pemilih yang sah tidak disimpan oleh satu pihak, harus bisa divalidasi bersama oleh beberapa entitas independen, sehingga tidak ada satu pintu masuk tunggal yang bisa dimanipulasi.
Pengawasan sosial dan prosedural di lapisan terluar. Teknologi secanggih apapun tetap membutuhkan saksi manusia yang memahami apa yang mereka awasi. Audit independen, keterbukaan kode sumber, dan literasi teknis di kalangan pengawas adalah bagian dari sistem.

Sistem yang aman adalah sistem yang jika diretas pun, semua orang bisa melihat bahwa itu terjadi. Sistem yang layak dipercaya bukan sistem yang meminta kita percaya, melainkan sistem yang membuat pengkhianatan kepercayaan mustahil disembunyikan."

Itulah standar yang seharusnya kita tuntut dari setiap sistem yang mengklaim melayani kepentingan publik.
