const VARIANT_PREFIX = "oge-variant_";

function loadVariant() {
  const code = getCurrentCode();
  if (!code) return {};
  try { return JSON.parse(localStorage.getItem(VARIANT_PREFIX + code)) || {}; }
  catch (e) { return {}; }
}

function saveVariant(data) {
  const code = getCurrentCode();
  if (!code) return;
  data.updated = new Date().toISOString();
  localStorage.setItem(VARIANT_PREFIX + code, JSON.stringify(data));
}

document.addEventListener("DOMContentLoaded", function () {
  const p = loadProgress();
  if (!p) return;

  const select = document.getElementById("topic-select");
  const textEl = document.getElementById("task-text");
  const imgEl  = document.getElementById("task-img");
  const answer = document.getElementById("answer");
  const result = document.getElementById("task-result");
  const score  = document.getElementById("topic-score");
  const theoryLink = document.getElementById("theory-link");

  let topicId = null;
  let taskIdx = 0;
  let solvedThisSession = [];

  // Заполняем список тем
  TOPICS.forEach(function (t) {
    if (t.children) return;
    const opt = document.createElement("option");
    opt.value = t.id;
    opt.textContent = t.title;
    select.appendChild(opt);
  });

  // Если тема пришла из адресной строки — открываем её
  const fromUrl = new URLSearchParams(location.search).get("topic");
  if (fromUrl) select.value = fromUrl;

  function taskList() {
    return (typeof TASKS !== "undefined" && TASKS[topicId]) ? TASKS[topicId] : [];
  }

  function showScore() {
    const st = loadVariant();
    const done = st[topicId] || 0;
    score.textContent = taskList().length
      ? "Решено задач по теме: " + done
      : "Задачи для этой темы пока не добавлены.";
  }

  function showTask() {
    const list = taskList();
    if (!list.length) {
      textEl.textContent = "Задачи для этой темы пока не добавлены.";
      imgEl.style.display = "none";
      result.textContent = "";
      showScore();
      return;
    }
    taskIdx = taskIdx % list.length;
    const task = list[taskIdx];
    textEl.textContent = "Задача " + (taskIdx + 1) + ". " + task.text;
    if (task.img) {
      imgEl.src = task.img;
      imgEl.style.display = "block";
    } else {
      imgEl.style.display = "none";
    }
    answer.value = "";
    answer.dispatchEvent(new Event("input"));
    result.textContent = "";
    showScore();
  }

  select.addEventListener("change", function () {
    topicId = select.value;
    taskIdx = 0;
    theoryLink.href = "theory.html?topic=" + topicId;
    showTask();
  });

  document.getElementById("check-btn").addEventListener("click", function () {
    const list = taskList();
    if (!list.length) return;
    const task = list[taskIdx];
    const user = answer.value.trim().replace(".", ",");
    const right = String(task.answer).replace(".", ",");
    if (!user) {
      result.textContent = "Сначала введи ответ в бланк.";
      return;
    }
    if (user === right) {
      result.textContent = "Верно! ✓";
      if (!solvedThisSession.includes(taskIdx)) {
        solvedThisSession.push(taskIdx);
        const st = loadVariant();
        st[topicId] = (st[topicId] || 0) + 1;
        saveVariant(st);
      }
    } else {
      result.textContent = "Пока неверно. Посмотри разбор в теории и попробуй ещё раз.";
    }
    showScore();
  });

  document.getElementById("next-btn-task").addEventListener("click", function () {
    if (!taskList().length) return;
    taskIdx = (taskIdx + 1) % taskList().length;
    showTask();
  });

  // Старт: тема из адреса или первая в списке
  topicId = select.value;
  theoryLink.href = "theory.html?topic=" + topicId;
  showTask();
});
