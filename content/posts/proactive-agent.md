---
title: "Proactive Agent"
date: 2026-11-06T23:55:00+07:00
draft: false
toc: false
author: "Robin Syihab"
description: "Teknologi agentic AI hari ini belum layak disebut personal assistant: kita masih harus menyuruh. PR terberatnya ada di relevancy, materiality, dan economy. Decision model mengubah hitungannya."
categories: ["Teknologi"]
tags: ["agentic-ai", "proactive-agent", "decision-model", "llm", "keamanan-siber"]
aliases:
  - /posts/proactive-agent-ketika-ai-berhenti-menunggu-disuruh/
images:
  - /images/proactive-agent-diagram.jpg
---

Teknologi agentic AI yang ada saat ini sebenarnya tidak layak untuk disebut dan digunakan sebagai personal assistant. Dia hanya genAI dengan tools. Kita tetap harus menyuruh untuk membuatnya bekerja.

Personal assistant di dunia nyata tidak selalu menunggu disuruh untuk bekerja. Dia bisa proaktif, cari info sendiri, riset sendiri, kemudian memberi masukan dan saran. Lebih dari itu, dia bisa menganalisis dan memprediksi apa yang akan terjadi pada tuannya berdasarkan diskusi-diskusi sebelumnya, lalu memberikan rekomendasi langkah apa yang sebaiknya dilakukan selanjutnya. Semua tanpa perlu kita minta.

Sebelumnya saya kira itu cukup pakai cron, scraper, dan LLM. Ternyata tidak semudah itu. PR terberatnya ada di tiga hal: relevancy, materiality, dan economy.

**Relevancy** adalah bagaimana kita bisa memfilter ribuan data yang masuk tadi menjadi hanya data yang benar-benar relevan dengan kita. Contoh: apakah data ini nyambung dengan masalah yang sedang ingin kita selesaikan? Tahap ini memilah data menjadi signal.

**Materiality** adalah bagaimana data yang sudah relevan tadi akan berdampak pada kita. Bisa jadi data memang relevan, tapi belum tentu berdampak buat kita, dan seberapa besar dampaknya? Di sini kita mengkalkulasikan urgency. Contoh: apakah data yang nyambung tadi punya dampak yang cukup besar untuk kita?

**Economy** adalah seberapa murah biayanya. Biaya ini bisa dalam bentuk literal, benar-benar biaya pemrosesan, juga bisa dalam bentuk worthiness: apakah benar-benar layak untuk dikirim ke user? Apakah layak untuk dikerjakan?

Ketiga hal itu butuh formula khusus serta engineering yang hati-hati. Dulu, untuk menghasilkan data menjadi signal saja butuh resource yang mahal, apalagi sampai ke material. Bahkan di era LLM seperti saat ini pun masih tetap sama.

Kemudian semuanya berubah ketika decision model muncul. Kini bisa lebih murah. Bahkan saya berhasil membuatnya hanya menggunakan dua model di bawah 10B, satu LLM dan satu decision model. Menariknya lagi, semuanya bisa berjalan secara lokal, berkat Evonic yang mendukung decision model secara native, sehingga bisa digunakan sebagai framework untuk sistem ini.

![Evonic Proactive Agent System](/images/proactive-agent-diagram.jpg)

Yang menarik, sistem ini juga sangat bermanfaat di bidang cyber security. Ketika badai CVE datang tanpa henti, manusia tidak mungkin mengatasinya sendiri. We are the bottleneck now. Kita butuh swarm of agent yang bekerja 24/7, yang bisa merespons secara cepat dan akurat.

![Pesan proaktif dari Aisyah: CVE kernel Linux, jadwal rilis keamanan Node.js, dan ringkasan sukuk ritel](/images/proactive-agent-system.jpg)

Pada akhirnya kita bisa mendapatkan AI agent yang benar-benar terasa hidup, tidak hanya seperti personal assistant, bahkan bisa seperti pengawas: yang benar-benar sangat mengerti kita, yang bisa mengingatkan kita akan bahaya yang belum terjadi, atau mengarahkan kita pada keberuntungan yang belum terpikirkan.
