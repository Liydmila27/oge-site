const PROGRESS_PREFIX = "oge-progress_";

function getCurrentCode() {
  return localStorage.getItem("oge-current-code");
}

function loadProgress() {
  const code = getCurrentCode();
  if (!code) { location.href = "index.html"; return null; }
  let p;
  try { p = JSON.parse(localStorage.getItem(PROGRESS_PREFIX + code)) || {}; }
  catch (e) { p = {}; }
  p.nick = p.nick || CODES[code] || "Ученик";
  p.code = code;
  p.results = p.results || {};
  return p;
}

function saveProgress(p) {
  localStorage.setItem(PROGRESS_PREFIX + p.code, JSON.stringify(p));
}

function addResult(taskId, taskIdx, score, attempts) {
  const p = loadProgress();
  if (!p) return null;
  p.results[taskId] = p.results[taskId] || {};
  const prev = p.results[taskId][taskIdx];
  if (!prev || score > prev.score) {
    p.results[taskId][taskIdx] = { score: score, attempts: attempts };
    saveProgress(p);
  }
  return p;
}

function totalScore(p) {
  let sum = 0;
  for (const t in p.results)
    for (const i in p.results[t]) sum += p.results[t][i].score;
  return Math.round(sum * 10) / 10;
}

function getAllProgresses() {
  const list = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.indexOf(PROGRESS_PREFIX) === 0) {
      try { list.push(JSON.parse(localStorage.getItem(key))); } catch (e) {}
    }
  }
  return list;
}

function logout() {
  localStorage.removeItem("oge-current-code");
  location.href = "index.html";
}
