const STATUS_LABELS = { ok: "Легко", mid: "Ошибаюсь", hard: "Не понимаю" };

function collectStudents() {
  const students = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;
    if (key.indexOf("oge-progress_") === 0) {
      try {
        const p = JSON.parse(localStorage.getItem(key));
        students.push({
          nick: p.nick || "Ученик",
          score: totalScore(p),
          results: p.results || {},
          checklist: JSON.parse(localStorage.getItem("oge-checklist_" + key.replace("oge-progress_", ""))) || {}
        });
      } catch (e) {}
    }
  }
  return students.sort(function (a, b) { return b.score - a.score; });
}

function renderTeacher() {
  const students = collectStudents();
  const block = document.getElementById("teacher-block");
  if (!students.length) {
    block.innerHTML = "<p>Данных пока нет.</p>";
    return;
  }
  let html = "<table class='rating'><tr><th>Ник</th><th>Баллы</th><th>Самооценка (Л / О / Н)</th><th>Обновлено</th></tr>";
  students.forEach(function (s) {
    let ok = 0, mid = 0, hard = 0;
    for (const t in s.checklist) {
      if (t === "updated") continue;
      if (s.checklist[t] === "ok") ok++;
      else if (s.checklist[t] === "mid") mid++;
      else if (s.checklist[t] === "hard") hard++;
    }
    const upd = s.checklist.updated ? new Date(s.checklist.updated).toLocaleDateString() : "—";
    html += "<tr><td>" + s.nick + "</td><td>" + s.score + "</td><td>" +
      ok + " / " + mid + " / " + hard + "</td><td>" + upd + "</td></tr>";
  });
  html += "</table>";
  block.innerHTML = html;
}

function downloadSummary() {
  const students = collectStudents();
  const data = students.map(function (s) {
    const cl = {};
    for (const t in s.checklist) {
      if (t !== "updated") cl[t] = STATUS_LABELS[s.checklist[t]] || s.checklist[t];
    }
    return { nick: s.nick, score: s.score, checklist: cl,
             checklistUpdated: s.checklist.updated || null, results: s.results };
  });
  const text = JSON.stringify(data, null, 2);
  const blob = new Blob([text], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "oge-отчёт-" + new Date().toISOString().slice(0, 10) + ".json";
  a.click();
}

document.addEventListener("DOMContentLoaded", renderTeacher);
