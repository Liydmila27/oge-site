function renderRating(elId) {
  const me = loadProgress();
  if (!me) return;
  const list = getAllProgresses()
    .map(function (p) { return { nick: p.nick, score: totalScore(p) }; })
    .sort(function (a, b) { return b.score - a.score; });

  const el = document.getElementById(elId);
  if (!list.length) {
    el.innerHTML = "<p>Рейтинг пуст. Решайте задания — и займите первое место!</p>";
    return;
  }
  let html = "<table class='rating'><tr><th>Место</th><th>Ник</th><th>Баллы</th></tr>";
  list.forEach(function (r, i) {
    const cls = r.nick === me.nick ? " class='me'" : "";
    html += "<tr" + cls + "><td>" + (i + 1) + "</td><td>" + r.nick + "</td><td>" + r.score + "</td></tr>";
  });
  html += "</table>";
  el.innerHTML = html;
}
