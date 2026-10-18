function topicHTML(t) {
  if (t.separator) {
    return "<div class='separator'>" + t.title + "</div>";
  }
  let inner = "";
  if (t.children && t.children.length) {
    inner = t.children.map(topicHTML).join("");
  } else {
    inner =
      "<div class='leaf-actions'>" +
      "<button onclick=\"location.href='theory.html?topic=" + t.id + "'\">Теория и примеры</button>" +
      "<button onclick=\"location.href='variant.html?topic=" + t.id + "'\">Решение случайного варианта</button>" +
      "</div>";
  }
  return (
    "<div class='topic-item'>" +
    "<div class='topic-header' onclick=\"this.parentElement.classList.toggle('open')\">" +
    "<span>" + t.title + "</span><span class='arrow'>▾</span>" +
    "</div>" +
    "<div class='topic-children'>" + inner + "</div>" +
    "</div>"
  );
}

document.addEventListener("DOMContentLoaded", function () {
  const p = loadProgress();
  if (!p) return;
  document.getElementById("hello").textContent = "Привет, " + p.nick + "!";
  document.getElementById("topics-block").innerHTML =
    TOPICS.map(topicHTML).join("");
  renderRating("rating-block");
});
