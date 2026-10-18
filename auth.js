function login() {
  const input = document.getElementById("code-input");
  const error = document.getElementById("error");
  const code = input.value.trim().toLowerCase();
  if (!code) { error.textContent = "Введите кодовое слово."; return; }

  const found = Object.keys(CODES).find(k => k.toLowerCase() === code);
  if (found) {
    localStorage.setItem("oge-current-code", found);
    location.href = "main.html";
  } else {
    error.textContent = "Кодовое слово не найдено. Спросите у учителя.";
    input.value = "";
  }
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") login();
});
