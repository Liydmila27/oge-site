const CHECKLIST_PREFIX = "oge-checklist_";

const MOTTOES = [
  "Математика — это гимнастика ума. Немного усилий каждый день — и результат придёт!",
  "Не бойся ошибаться: каждая ошибка — шаг к верному решению.",
  "Маленькие шаги каждый день сильнее одного большого рывка.",
  "Понять одну задачу лучше, чем запомнить десять.",
  "Твоя оценка — не приговор, а карта: она показывает, куда идти."
];

// Блоки чек-листа: заголовок + id тем из topics.js
const CHECK_GROUPS = [
  {
    title: "№1–5. Практико-ориентированные задачи",
    topics: ["dacha", "mestnost", "kvartira", "bumaga", "pech", "tarify", "shiny"]
  },
  {
    title: "Блок алгебры",
    topics: [
      "chisla", "neravenstva-koord", "vychisleniya", "uravneniya",
      "veroyatnosti", "grafiki", "formuly", "sistemy-ner", "progressii"
    ]
  },
  {
    title: "Блок геометрии",
    topics: ["treugolnik", "okruzhnost", "chetyrehug", "reshetka", "vykazyvaniya"]
  },
  {
    title: "Вторая часть с развёрнутым ответом",
    topics: ["vyrazheniya", "tekstovye", "funkcii", "geom-vych", "geom-dok", "geom-slozh"]
  }
];

function loadChecklist() {
  const code = getCurrentCode();
  if (!code) return {};
  try { return JSON.parse(localStorage.getItem(CHECKLIST_PREFIX + code)) || {}; }
  catch (e) { return {}; }
}

function saveChecklist(data) {
  const code = getCurrentCode();
  if (!code) return;
  data.updated = new Date().toISOString();
  localStorage.setItem(CHECKLIST_PREFIX + code, JSON.stringify(data));
}

// Строка с тремя радиокнопками для одной темы
function markRow(topicId, saved) {
  const topic = findTopic(topicId);
  const title = topic ? topic.title : topicId;
  const val = saved[topicId] || "";
  return (
    "<tr>" +
    "<td>" + title + "</td>" +
    "<td><input type='radio' name='cl-" + topicId + "' value='ok'" +
      (val === "ok" ? " checked" : "") + " onchange=\"setMark('" + topicId + "','ok')\"></td>" +
    "<td><input type='radio' name='cl-" + topicId + "' value='mid'" +
      (val === "mid" ? " checked" : "") + " onchange=\"setMark('" + topicId + "','mid')\"></td>" +
    "<td><input type='radio' name='cl-" + topicId + "' value='hard'" +
      (val === "hard" ? " checked" : "") + " onchange=\"setMark('" + topicId + "','hard')\"></td>" +
    "</tr>"
  );
}

function renderChecklist() {
  const saved = loadChecklist();
  let html = "";

  CHECK_GROUPS.forEach(function (group) {
    html += "<tr class='group-header'><td colspan='4'>" + group.title + "</td></tr>";
    group.topics.forEach(function (id) {
      html += markRow(id, saved);
    });
  });

  document.getElementById("checklist-body").innerHTML = html;
}

function setMark(topicId, mark) {
  const data = loadChecklist();
  data[topicId] = mark;
  saveChecklist(data);
  const note = document.getElementById("saved-note");
  note.textContent = "Сохранено ✓ (" + new Date().toLocaleString() + ")";
  setTimeout(function () { note.textContent = ""; }, 2000);
}

document.addEventListener("DOMContentLoaded", function () {
  const p = loadProgress();
  if (!p) return;
  document.getElementById("hello").textContent = "Привет, " + p.nick + "!";
  document.getElementById("motto").textContent =
    "«" + MOTTOES[Math.floor(Math.random() * MOTTOES.length)] + "»";
  renderChecklist();
});
