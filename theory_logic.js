document.addEventListener("DOMContentLoaded", function () {
  const p = loadProgress();
  if (!p) return;

  const topicId = new URLSearchParams(location.search).get("topic");
  const topic = findTopic(topicId);
  document.getElementById("theory-title").textContent =
    topic ? topic.title : "Теория";

  const images = (typeof THEORY !== "undefined" && THEORY[topicId])
    ? THEORY[topicId]
    : [];

  let idx = 0;
  const img = document.getElementById("theory-img");
  const btn = document.getElementById("next-btn");
  const back = document.getElementById("prev-btn");
  const counter = document.getElementById("theory-counter");
  const hint = document.querySelector(".theory-hint");
  const errBox = document.getElementById("img-error");

  // Если разбора нет — показываем заглушку art/4.png без надписи и без стрелок
  if (!images.length) {
    img.src = "art/4.png";
    img.classList.add("empty-picture");
    if (hint) hint.textContent = "";
    counter.textContent = "";
    btn.style.display = "none";
    back.style.display = "none";
    return; // листать нечего, обработчики стрелок не нужны
  }

  // Если картинка не нашлась — показываем путь, по которому искали
  img.addEventListener("error", function () {
    errBox.style.display = "block";
    errBox.textContent =
      "Файл не найден: " + img.getAttribute("src") +
      ". Проверьте имя файла и структуру папок (скопируйте путь из этого сообщения).";
    img.style.display = "none";
  });
  img.addEventListener("load", function () {
    errBox.style.display = "none";
    img.style.display = "block";
  });

  function show() {
    img.src = list[idx];
    counter.textContent = list.length > 1
      ? "Страница " + (idx + 1) + " из " + list.length
      : "";
  }

  // Стрелка вперёд: по кругу, после последней страницы — первая
  btn.addEventListener("click", function () {
    idx = (idx + 1) % list.length;
    show();
  });

  // Стрелка назад: по кругу, с первой страницы — последняя
  back.addEventListener("click", function () {
    idx = (idx - 1 + list.length) % list.length;
    show();
  });

  const list = images;
  show();
});
