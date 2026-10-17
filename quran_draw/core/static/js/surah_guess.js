
  const DATA = [
    { ayah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۝ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", surah: "الفاتحة" },
    { ayah: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ", surah: "البقرة" },
    { ayah: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ", surah: "البقرة" },
    { ayah: "وَلَنَبْلُوَنَّكُم بِشَيْءٍ مِّنَ الْخَوْفِ وَالْجُوعِ وَنَقْصٍ مِّنَ الْأَمْوَالِ", surah: "البقرة" },
    { ayah: "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ", surah: "الإخلاص" },
    { ayah: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", surah: "الكوثر" },
    { ayah: "أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ", surah: "الفيل" },
    { ayah: "إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ", surah: "القدر" },
    { ayah: "وَالْعَصْرِ ۝ إِنَّ الْإِنسَانَ لَفِي خُسْرٍ", surah: "العصر" },
    { ayah: "أَلْهَاكُمُ التَّكَاثُرُ ۝ حَتَّىٰ زُرْتُمُ الْمَقَابِرَ", surah: "التكاثر" },
    { ayah: "وَيْلٌ لِّكُلِّ هُمَزَةٍ لُّمَزَةٍ", surah: "الهمزة" },
    { ayah: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", surah: "الفلق" },
    { ayah: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ", surah: "الناس" },
    { ayah: "أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ", surah: "الماعون" },
    { ayah: "لِإِيلَافِ قُرَيْشٍ ۝ إِيلَافِهِمْ رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ", surah: "قريش" },
    { ayah: "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ", surah: "المسد" },
    { ayah: "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ", surah: "النصر" },
    { ayah: "إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا", surah: "الزلزلة" },
    { ayah: "وَالْعَادِيَاتِ ضَبْحًا", surah: "العاديات" },
    { ayah: "الْقَارِعَةُ ۝ مَا الْقَارِعَةُ", surah: "القارعة" },
    { ayah: "سَبِّحِ اسْمَ رَبِّكَ الْأَعْلَى", surah: "الأعلى" },
    { ayah: "وَالشَّمْسِ وَضُحَاهَا", surah: "الشمس" },
    { ayah: "إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا", surah: "الفتح" },
    { ayah: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا", surah: "الطلاق" },
    { ayah: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", surah: "الشرح" },
    { ayah: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ", surah: "البقرة" },
    { ayah: "وَقُل رَّبِّ زِدْنِي عِلْمًا", surah: "طه" },
    { ayah: "إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ", surah: "النحل" }
  ];

  const SINGLE_TOTAL = 5;   // أسئلة اللاعب الواحد
  const DUO_TOTAL = 10;     // ٥ أسئلة لكل لاعب
  const API_EDITION = "quran-simple";
  const MAX_LEN = 240;
  const MIN_LEN = 15;

  const $ = id => document.getElementById(id);
  const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";
  const toAr = n => String(n).replace(/\d/g, d => AR_DIGITS[+d]);

  function normalize(str) {
    return (str || "")
      .replace(/[\u0617-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED\u0640]/g, "")
      .replace(/[أإآٱ]/g, "ا")
      .replace(/ى/g, "ي")
      .replace(/ة/g, "ه")
      .replace(/[^\u0621-\u064A]/g, "")
      .trim();
  }

  function acceptedForms(surah) {
    const n = normalize(surah);
    const set = new Set([n]);
    if (n.startsWith("ال") && n.length > 2) set.add(n.slice(2));
    return set;
  }

  function isCorrect(input, surah) {
    const ans = normalize(input);
    if (!ans) return false;
    return acceptedForms(surah).has(ans);
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Remove a leading basmala from an ayah (some editions prepend it to first ayah)
  function stripBasmala(text) {
    const n = normalize(text);
    const b = normalize("بسم الله الرحمن الرحيم");
    if (!n.startsWith(b)) return text.trim();
    let seen = 0, cut = 0;
    for (let i = 0; i < text.length; i++) {
      if (/[\u0621-\u064A]/.test(text[i])) {
        seen++;
        if (seen === b.length) { cut = i + 1; break; }
      }
    }
    return text.slice(cut).trim();
  }

  // API returns names like "سُورَةُ النَّبَإِ"; drop the leading word "سورة"
  function cleanSurahName(name) {
    const words = (name || "").trim().split(/\s+/);
    if (words.length > 1 && normalize(words[0]) === normalize("سورة")) {
      return words.slice(1).join(" ");
    }
    return (name || "").trim();
  }

  // ---- History: keep the verse keys used in the last 2 rounds ----
  const HISTORY_KEY = "quranQuizHistoryV2";
  const HISTORY_ROUNDS = 2;

  function loadHistory() {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  function saveHistory(history) {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(-HISTORY_ROUNDS)));
    } catch (e) { /* ignore */ }
  }

  function localPool() {
    return DATA.map((d, i) => ({ text: d.ayah, surah: d.surah, key: "L" + i }));
  }

  async function fetchJuzPool(juzList) {
    const rounds = await Promise.all(juzList.map(async juz => {
      const res = await fetch("https://api.alquran.cloud/v1/juz/" + juz + "/" + API_EDITION);
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      if (data.code !== 200 || !data.data || !data.data.ayahs) throw new Error("API error");
      return data.data.ayahs;
    }));

    const out = [];
    const seen = new Set();
    rounds.forEach(ayahs => ayahs.forEach(a => {
      const key = "A" + a.surah.number + ":" + a.numberInSurah;
      if (seen.has(key)) return;
      seen.add(key);
      const text = stripBasmala(a.text || "");
      if (!text) return;
      out.push({ text, surah: cleanSurahName(a.surah.name), key });
    }));
    return out;
  }

  function filterPool(pool) {
    const good = pool.filter(q => q.text.length >= MIN_LEN && q.text.length <= MAX_LEN);
    return good.length >= TOTAL ? good : pool;
  }

  function pickQuestions(pool, total) {
    const history = loadHistory();
    const used = new Set();
    history.forEach(round => (round || []).forEach(k => used.add(k)));

    const fresh = pool.filter(q => !used.has(q.key));
    const old = pool.filter(q => used.has(q.key));

    // Prefer fresh verses; only reuse old ones if not enough remain
    const chosen = shuffle(fresh).concat(shuffle(old)).slice(0, total);

    history.push(chosen.map(q => q.key));
    saveHistory(history);
    return chosen;
  }

  function getSelectedJuz() {
    return Array.from(document.querySelectorAll(".chip[data-juz].on")).map(c => +c.dataset.juz);
  }

  function getNumPlayers() {
    const on = document.querySelector("#playersRow .chip.on");
    return on ? +on.dataset.players : 1;
  }

  function setStatus(msg, isErr) {
    const s = $("status");
    s.textContent = msg || "";
    s.className = "status" + (isErr ? " err" : "");
  }

  function goHome() {
    window.location.href = "/";
  }

  function buildPlayers(n) {
    if (n === 2) {
      const n1 = $("name1").value.trim() || "اللاعب ١";
      const n2 = $("name2").value.trim() || "اللاعب ٢";
      return [{ name: n1, score: 0 }, { name: n2, score: 0 }];
    }
    return [{ name: "أنت", score: 0 }];
  }

  // اللاعب الحالي = حسب عدد الأسئلة المجابة (تناوب)
  const currentPlayer = () => players[idx % players.length];

  function scoresText() {
    if (players.length === 1) return "النقاط: " + toAr(players[0].score);
    return players.map(p => p.name + ": " + toAr(p.score)).join(" • ");
  }

  async function startGame() {
    const juz = getSelectedJuz();
    let pool;
    setStatus("");

    players = buildPlayers(getNumPlayers());
    TOTAL = players.length === 2 ? DUO_TOTAL : SINGLE_TOTAL;

    if (juz.length) {
      const btn = $("startBtn");
      btn.disabled = true;
      btn.textContent = "جارٍ تحميل الآيات...";
      try {
        pool = await fetchJuzPool(juz);
        if (pool.length < TOTAL) throw new Error("not enough");
      } catch (e) {
        setStatus("تعذّر تحميل الآيات من الإنترنت، سيتم اللعب من المجموعة الجاهزة.", true);
        pool = localPool();
      }
      btn.disabled = false;
      btn.textContent = "ابدأ اللعبة";
    } else {
      pool = localPool();
    }

    questions = pickQuestions(filterPool(pool), TOTAL);
    idx = 0;
    $("start").classList.add("hidden");
    $("result").classList.add("hidden");
    $("game").classList.remove("hidden");
    renderQuestion();
  }

  function renderQuestion() {
    answered = false;
    const q = questions[idx];
    const p = currentPlayer();
    $("ayah").textContent = "﴿ " + q.text + " ﴾";
    $("counter").textContent = "السؤال " + toAr(idx + 1) + " من " + toAr(TOTAL);
    $("turnInfo").textContent = players.length > 1 ? "دور: " + p.name : "لعبة فردية";
    $("scoreNow").textContent = scoresText();
    $("bar").style.width = ((idx) / TOTAL * 100) + "%";

    const input = $("answer");
    input.value = "";
    input.disabled = false;
    input.focus();

    const fb = $("feedback");
    fb.className = "feedback";
    fb.textContent = "";

    $("checkBtn").classList.remove("hidden");
    $("nextBtn").classList.add("hidden");
  }

  function checkAnswer() {
    if (answered) return;
    const input = $("answer");
    const val = input.value.trim();
    if (!val) { input.focus(); return; }

    answered = true;
    const q = questions[idx];
    const p = currentPlayer();
    const ok = isCorrect(val, q.surah);
    if (ok) p.score++;

    const fb = $("feedback");
    const who = players.length > 1 ? p.name + ": " : "";
    if (ok) {
      fb.className = "feedback ok";
      fb.textContent = "إجابة صحيحة! ✔ " + who + "السورة هي: " + q.surah;
    } else {
      fb.className = "feedback no";
      fb.textContent = "إجابة خاطئة! " + who + "الإجابة الصحيحة: " + q.surah;
    }

    $("scoreNow").textContent = scoresText();
    input.disabled = true;
    $("checkBtn").classList.add("hidden");
    $("nextBtn").classList.remove("hidden");

    if (idx === TOTAL - 1) {
      $("nextBtn").textContent = "عرض النتيجة";
    } else {
      const nextP = players[(idx + 1) % players.length];
      $("nextBtn").textContent = players.length > 1
        ? "دور " + nextP.name + " ←"
        : "التالي";
    }
    $("nextBtn").focus();
  }

  function nextQuestion() {
    idx++;
    if (idx >= TOTAL) finish();
    else renderQuestion();
  }

  function finish() {
    $("game").classList.add("hidden");
    $("result").classList.remove("hidden");

    if (players.length === 1) {
      $("finalScore").textContent = toAr(players[0].score) + " / " + toAr(TOTAL);
      let msg;
      if (players[0].score === TOTAL) msg = "ممتاز! أجبت على جميع الآيات بشكل صحيح.";
      else if (players[0].score >= 3) msg = "جيد جداً! استمر في التدريب.";
      else msg = "حاول مرة أخرى لتحسين نتيجتك.";
      $("finalMsg").textContent = msg;
      $("rankList").innerHTML = "";
      return;
    }

    // وضع اللاعبين: ترتيب تنازلي مع الفائز أولاً
    const ranked = players.slice().sort((a, b) => b.score - a.score);
    const tie = ranked[0].score === ranked[1].score;
    const perPlayer = TOTAL / players.length; // عدد أسئلة كل لاعب

    $("finalScore").textContent = toAr(ranked[0].score) + " / " + toAr(perPlayer);
    $("finalMsg").textContent = tie
      ? "تعادل رائع بين " + ranked[0].name + " و" + ranked[1].name + "! 🤝"
      : "🎉 فاز " + ranked[0].name + " بفارق " + toAr(ranked[0].score - ranked[1].score) + " نقاط!";

    const medals = ["🥇", "🥈"];
    $("rankList").innerHTML = ranked.map((p, i) =>
      '<li class="' + (i === 0 && !tie ? "win" : "") + '">' +
      '<span>' + medals[i] + " " + p.name + '</span>' +
      '<span>' + toAr(p.score) + " / " + toAr(perPlayer) + '</span>' +
      '</li>'
    ).join("");
  }

  // Build the 30 juz chips
  (function buildJuzGrid() {
    const grid = $("juzGrid");
    for (let i = 1; i <= 30; i++) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.dataset.juz = i;
      b.textContent = toAr(i);
      b.addEventListener("click", () => b.classList.toggle("on"));
      grid.appendChild(b);
    }
  })();

  // اختيار عدد اللاعبين
  document.querySelectorAll("#playersRow .chip").forEach(c => {
    c.addEventListener("click", () => {
      document.querySelectorAll("#playersRow .chip").forEach(x => x.classList.remove("on"));
      c.classList.add("on");
      $("namesBox").classList.toggle("hidden", c.dataset.players !== "2");
    });
  });

  $("allJuz").addEventListener("click", () => {
    document.querySelectorAll(".chip[data-juz]").forEach(c => c.classList.add("on"));
  });
  $("clearJuz").addEventListener("click", () => {
    document.querySelectorAll(".chip[data-juz]").forEach(c => c.classList.remove("on"));
  });

  let questions = [];
  let idx = 0;
  let TOTAL = SINGLE_TOTAL;
  let players = [{ name: "أنت", score: 0 }];
  let answered = false;

  $("startBtn").addEventListener("click", startGame);
  $("againBtn").addEventListener("click", startGame);
  $("homeBtn").addEventListener("click", goHome);
  $("checkBtn").addEventListener("click", checkAnswer);
  $("nextBtn").addEventListener("click", nextQuestion);
  $("answer").addEventListener("keydown", e => {
    if (e.key === "Enter") {
      if (answered) nextQuestion();
      else checkAnswer();
    }
  });
