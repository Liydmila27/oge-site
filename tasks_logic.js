const ATTEMPT_LIMIT = 3;
let attempts = {};

function findTask(id) {
  return TASKS.find(function (t) { return t.id === id; });
}

function renderPrototype() {
  const t = TASKS[0];
  const block = document.getElementById("prototype-block");
  block.innerHTML =
    "<div class='task-card'>" +
    "<p><strong>Прототип задания " + t.ogeNumber + ":</strong> " + t.prototype.statement + "</p>" +
    "<div class='steps' id='steps-" + t.id + "'></div>" +
    "<button id='step-btn-" + t.id + "' onclick='nextStep(\"" + t.id + "\")'>Показать следующий шаг</button>" +
    "</div>";
}

function nextStep(taskId) {
  const t = findTask(taskId);
  attempts["steps-" + taskId] = attempts["steps-" + taskId] || 0;
  const i = attempts["steps-" + taskId];
  const box = document.getElementById("steps-" + taskId);
  if (i < t.prototype.steps.length) {
    box.innerHTML += "<p>" + (i + 1) + ") " + t.prototype.steps[i] + "</p>";
    attempts["steps-" + taskId]++;
  }
  if (attempts["steps-" + taskId] >= t.prototype.steps.length) {
    document.getElementById("step-btn-" + taskId).disabled = true;
  }
}

function renderPractice() {
  const t = TASKS[0];
  const block = document.getElementById("practice-block");
  let html = "";
  t.practice.forEach(function (task, idx) {
    const key = t.id + "-" + idx;
    html +=
      "<div class='task-card'>" +
      "<p><strong>Задача " + (idx + 1) + ".</strong> " + task.statement + "</p>" +
      "<div class='answer-row'>" +
      "<input type='text' id='ans-" + key + "' placeholder='Ответ (число)' autocomplete='off'>" +
      "<button id='btn-" + key + "' onclick='check(\"" + t.id + "\"," + idx + ")'>Проверить</button>" +
      "</div>" +
      "<div class='fb' id='fb-" + key + "'></div>" +
      "</div>";
  });
  block.innerHTML = html;
}

function check(taskId, idx) {
  const t = findTask(taskId);
  const task = t.practice[idx];
  const key = taskId + "-" + idx;
  attempts[key] = attempts[key] || 0;

  const input = document.getElementById("ans-" + key).value.trim().replace(",", ".");
  const fb = document.getElementById("fb-" + key);
  const num = parseFloat(input);

  if (input === "" || isNaN(num)) {
    fb.textContent = "Введите число.";
    fb.className = "fb wrong";
    return;
  }

  if (Math.abs(num - task.answer) < 0.001) {
    const score = attempts[key] === 0 ? 1 : 0.5;
    addResult(taskId, idx, score, attempts[key] + 1);
    fb.textContent = "Верно! " + score + " балл(а).";
    fb.className = "fb ok";
    document.getElementById("btn-" + key).disabled = true;
    renderRating("rating-block");
  } else {
    attempts[key]++;
    if (attempts[key] === 1) {
      fb.textContent = "Неверно. Попробуйте ещё раз.";
      fb.className = "fb wrong";
    } else if (attempts[key] === 2) {
      fb.textContent = "Подсказка: " + task.hints[0];
      fb.className = "fb hint";
    } else {
      const answerStr = String(task.answer).replace(".", ",");
      fb.textContent = "Полное решение: " + task.solution + " Ответ: " + answerStr +
        ". Задача засчитана за 0,5 балла.";
      fb.className = "fb solution";
      addResult(taskId, idx, 0.5, attempts[key]);
      document.getElementById("btn-" + key).disabled = true;
      renderRating("rating-block");
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const p = loadProgress();
  if (!p) return;
  const hello = document.getElementById("hello");
  if (hello) hello.textContent = "Привет, " + p.nick + "!";
  renderPrototype();
  renderPractice();
  renderRating("rating-block");
});
