// Подтемы теории вероятностей (открываются со страницы subtheory.html)
const SUBTOPICS = {
  "veroytnost_1": { id: "veroytnost_1", title: "Классическая теория вероятности" },
  "veroytnost_2": { id: "veroytnost_2", title: "Круги Эйлера" },
  "veroytnost_3": { id: "veroytnost_3", title: "Дерево случайных событий" }
};

// Структура заданий ОГЭ. separator — жирный разделитель.
const TOPICS = [
  {
    id: "praktika",
    title: "№1–5. Практико-ориентированные задачи",
    children: [
      { id: "dacha",    title: "1. Дачный участок" },
      { id: "mestnost", title: "2. План местности" },
      { id: "kvartira", title: "3. Квартира" },
      { id: "bumaga",   title: "4. Листы бумаги" },
      { id: "pech",     title: "5. Печь для бани" },
      { id: "tarify",   title: "6. Тарифы" },
      { id: "shiny",    title: "7. Шины" }
    ]
  },
  { id: "chisla",     title: "6. Числа и вычисления" },
  { id: "neravenstva-koord", title: "7. Числовые неравенства. Координатная прямая" },
  { id: "vychisleniya", title: "8. Вычисления" },
  { id: "uravneniya", title: "9. Уравнения" },
  { id: "veroytnost", title: "10. Теория вероятностей", subpage: true },
  { id: "grafiki",    title: "11. Графики функций" },
  { id: "formuly",    title: "12. Расчёты по формулам" },
  { id: "sistemy-ner", title: "13. Неравенства, системы неравенств" },
  { id: "progressii", title: "14. Задачи на прогрессии" },
  { id: "treugolnik", title: "15. Треугольник" },
  { id: "okruzhnost", title: "16. Окружность, круг и их элементы" },
  { id: "chetyrehug", title: "17. Четырёхугольники", theoryPage: "theory17.html" },
  { id: "reshetka",   title: "18. Фигуры на квадратной решётке" },
  { id: "vykazyvaniya", title: "19. Анализ геометрических высказываний",
    theoryPage: "theory19.html", variantPage: "practice19.html" },
  { separator: true, title: "Задания 20–25 с развёрнутым ответом" },
  { id: "vyrazheniya", title: "20. Алгебраические выражения, уравнения, системы уравнений, неравенства" },
  { id: "tekstovye",  title: "21. Текстовые задачи" },
  { id: "funkcii",    title: "22. Функции и их свойства. Графики функций" },
  { id: "geom-vych",  title: "23. Геометрическая задача на вычисление" },
  { id: "geom-dok",   title: "24. Геометрическая задача на доказательство" },
  { id: "geom-slozh", title: "25. Геометрическая задача повышенной сложности" }
];

// Поиск темы по id (в любом уровне вложенности)
function findTopic(id, list) {
  list = list || TOPICS;
  for (const t of list) {
    if (t.id === id) return t;
    if (t.children) {
      const f = findTopic(id, t.children);
      if (f) return f;
    }
  }
  return null;
}
