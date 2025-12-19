const input = document.getElementById("habitInput");
const addBtn = document.getElementById("addHabitBtn");
const list = document.getElementById("habitList");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

/*
Each habit structure:
{
  name: string,
  done: boolean
}
*/

function save() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function render() {
  list.innerHTML = "";

  habits.forEach((habit, index) => {
    const li = document.createElement("li");
    li.className = "habit";

    li.innerHTML = `
      <span>${habit.name}</span>

      <div class="flip ${habit.done ? "done" : ""}" onclick="toggleDone(${index})">
        <div class="flip-inner">
          <div class="flip-face flip-front">✖</div>
          <div class="flip-face flip-back">✔</div>
        </div>
      </div>
    `;

    list.appendChild(li);
  });
}

function addHabit() {
  const value = input.value.trim();
  if (!value) return;

  habits.push({ name: value, done: false });
  input.value = "";
  save();
  render();
}

function toggleDone(index) {
  habits[index].done = !habits[index].done;
  save();
  render();
}

addBtn.addEventListener("click", addHabit);
render();

/* Service Worker (do NOT change) */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js");
}
