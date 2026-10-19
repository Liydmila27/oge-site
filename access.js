// Доступ к заданиям. Теория, главная и «Обо мне» открыты всем.
const ACCESS_CODES = ["огэ2026", "математика"]; // маленькими буквами

function isLogged() {
  return localStorage.getItem("oge_access") === "yes";
}

// Ставим на страницах с заданиями: не вошёл — отправляем на страницу входа
function requireAccess() {
  if (isLogged()) return;
  location.href = "index.html";
}

function logout() {
  localStorage.removeItem("oge_access");
  location.href = "index.html";
}

// Кнопка «Войти»/«Выйти» в шапке
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("auth-btn");
  if (!btn) return;
  if (isLogged()) {
    btn.textContent = "Выйти";
    btn.onclick = logout;
  } else {
    btn.textContent = "Войти";
    btn.onclick = () => { location.href = "index.html"; };
  }
});
