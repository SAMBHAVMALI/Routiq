const input = document.getElementById("habitInput");
const addBtn = document.getElementById("addHabitBtn");
const list = document.getElementById("habitList");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

/*
Each habit:
{ name: string, done: boolean }
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

      <div class="flip ${habit.done ? "done" : ""}" data-index="${index}">
        <div class="flip-inner">
          <div class="flip-face flip-front">✖</div>
          <div class="flip-face flip-back">✔</div>
        </div>
      </div>
    `;

    li.querySelector(".flip").addEventListener("click", () => {
      habits[index].done = !habits[index].done;
      save();
      render();
    });

    list.appendChild(li);
  });
}

addBtn.addEventListener("click", () => {
  const value = input.value.trim();
  if (!value) return;

  habits.push({ name: value, done: false });
  input.value = "";
  save();
  render();
});

render();

/* Service worker */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js");
}
