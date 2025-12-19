const input = document.getElementById("habitInput");
const addBtn = document.getElementById("addHabitBtn");
const list = document.getElementById("habitList");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

/*
Habit structure:
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

    const text = document.createElement("span");
    text.textContent = habit.name;

    const flip = document.createElement("div");
    flip.className = "flip" + (habit.done ? " done" : "");

    flip.innerHTML = `
      <div class="flip-inner">
        <div class="flip-face flip-front">✖</div>
        <div class="flip-face flip-back">✔</div>
      </div>
    `;

    // 🔥 KEY: NO RE-RENDER ON CLICK
    flip.addEventListener("click", () => {
      flip.classList.toggle("done");       // animate
      habits[index].done = !habits[index].done;
      save();                              // persist
    });

    li.appendChild(text);
    li.appendChild(flip);
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

/* Service worker (unchanged) */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js");
}
