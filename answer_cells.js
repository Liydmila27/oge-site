// Бланк ответа: каждый символ — в отдельной клеточке.
// Работает с любым полем ввода, которому добавлен класс oge-answer.
function initOgeAnswer(input) {
  const max = parseInt(input.getAttribute("maxlength")) || 15;

  // Собираем блок: табличка «Бланк ответа» + ряд клеток
  const wrap = document.createElement("div");
  wrap.className = "oge-blank";
  wrap.innerHTML =
    '<div class="oge-blank-label">Бланк ответа</div>' +
    '<div class="oge-cells"></div>';
  const cellsBox = wrap.querySelector(".oge-cells");

  const cells = [];
  for (let i = 0; i < max; i++) {
    const c = document.createElement("div");
    c.className = "oge-cell";
    // Клик по клетке ставит курсор в это место
    c.addEventListener("click", function () {
      input.focus();
      const pos = Math.min(i, input.value.length);
      input.setSelectionRange(pos, pos);
      render();
    });
    cellsBox.appendChild(c);
    cells.push(c);
  }

  // Прячем исходное поле, но оставляем его рабочим —
  // старый код проверки читает input.value, как раньше
  input.classList.add("oge-answer-hidden");
  input.parentNode.insertBefore(wrap, input);

  function render() {
    const val = input.value;
    for (let i = 0; i < max; i++) {
      cells[i].textContent = val[i] || "";
    }
    let pos = val.length;
    if (typeof input.selectionStart === "number") pos = input.selectionStart;
    cells.forEach(function (c, i) {
      c.classList.toggle("active", i === pos);
    });
  }

  input.addEventListener("input", render);
  input.addEventListener("click", render);
  input.addEventListener("keyup", render);
  render();
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("input.oge-answer").forEach(initOgeAnswer);
});
