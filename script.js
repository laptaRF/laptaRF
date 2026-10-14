const questions = [
  ["Как называется предмет для отбивания мяча?", ["Бита", "Клюшка", "Ракетка", "Шест"], 0],
  ["Что обычно делает игрок после удачного удара?", ["Выполняет пробежку", "Сразу покидает поле", "Передаёт биту судье", "Останавливает игру"], 0],
  ["Что важно для командной лапты?", ["Взаимодействие игроков", "Только сила удара", "Только скорость", "Только точность"], 0],
  ["К какому виду относится лапта?", ["К традиционным народным играм", "К настольным", "К водным", "К зимним"], 0],
  ["Что помогают сохранять народные игры?", ["Традиции и опыт поколений", "Только спортивные рекорды", "Только форму одежды", "Только правила судейства"], 0]
];

let qi = 0;
let score = 0;
let answered = false;

const qbox = document.getElementById("qbox");
const result = document.getElementById("result");

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function showQ() {
  answered = false;
  const q = questions[qi];
  const answers = shuffle(q[1].map((text, index) => ({
    text,
    correct: index === q[2]
  })));

  qbox.innerHTML =
    '<div class="kicker">ВОПРОС ' + (qi + 1) + ' ИЗ ' + questions.length + '</div>' +
    '<h3>' + q[0] + '</h3>' +
    '<div class="answers">' +
    answers.map((a, i) =>
      '<button onclick="pick(' + i + ')" data-correct="' + a.correct + '">' + a.text + '</button>'
    ).join("") +
    '</div>';
}

function pick(i) {
  if (answered) return;
  answered = true;

  const buttons = [...qbox.querySelectorAll(".answers button")];
  const button = buttons[i];
  const correct = button.dataset.correct === "true";

  button.classList.add(correct ? "ok" : "no");
  if (correct) score++;

  setTimeout(() => {
    qi++;
    if (qi < questions.length) {
      showQ();
    } else {
      qbox.innerHTML = "<h3>Тест завершён!</h3>";
      result.textContent =
        "Результат: " + score + " из " + questions.length + ". " +
        (score === 5 ? "Отлично!" : score >= 3 ? "Хороший результат!" : "Повтори материал и попробуй ещё раз.");
    }
  }, 650);
}

showQ();

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => io.observe(el));
