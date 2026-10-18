// Проверка доступа к заданиям. Теория этот файл НЕ подключает.
const ACCESS_CODES = ["огэ2026", "математика"]; // кодовые слова, пиши маленькими буквами

function accessGranted() {
  return localStorage.getItem("oge_access") === "yes";
}

function requireAccess() {
  if (accessGranted()) return; // уже вошли — продолжаем

  let ok = false;
  while (!ok) {
    const code = prompt("Введите кодовое слово (даёт учитель):");
    if (code === null) { // нажали «Отмена» — на главную
      location.href = "main.html";
      return;
    }
    if (ACCESS_CODES.includes(code.trim().toLowerCase())) {
      localStorage.setItem("oge_access", "yes");
      ok = true;
    } else {
      alert("Неверный код. Обратитесь к учителю за кодовым словом.");
    }
  }
}
