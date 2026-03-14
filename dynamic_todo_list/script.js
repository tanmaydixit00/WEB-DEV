const taskInput = document.getElementById("taskInput");
const reminderTimeInput = document.getElementById("reminderTime");
const emailInput = document.getElementById("emailInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

let tasks = [];

function updateStatus() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    totalTasks.textContent = `Total: ${total}`;
    completedTasks.textContent = `Completed: ${completed}`;
    pendingTasks.textContent = `Pending: ${pending}`;
}

function setReminder(task) {
    if (!task.reminderTime) return;

    const reminderDate = new Date(task.reminderTime).getTime();
    const now = new Date().getTime();
    const delay = reminderDate - now;

    if (delay > 0) {
        setTimeout(() => {
            alert(`Reminder: ${task.text}`);

            if (task.email) {
                window.location.href =
                    `mailto:${task.email}?subject=Task Reminder&body=Reminder for task: ${task.text}`;
            }
        }, delay);
    }
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.onchange = () => {
            tasks[index].completed = checkbox.checked;
            renderTasks();
        };

        const span = document.createElement("span");
        span.textContent = task.text;
        span.className = "task-text";

        const actions = document.createElement("div");
        actions.className = "actions";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";
        editBtn.onclick = () => {
            const newText = prompt("Edit your task:", task.text);
            if (newText && newText.trim() !== "") {
                tasks[index].text = newText.trim();
                renderTasks();
            }
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => {
            tasks.splice(index, 1);
            renderTasks();
        };

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(actions);

        taskList.appendChild(li);
    });

    updateStatus();
}

addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    const reminderTime = reminderTimeInput.value;
    const email = emailInput.value.trim();

    if (text === "") return;

    const newTask = {
        text,
        completed: false,
        reminderTime,
        email
    };

    tasks.push(newTask);
    setReminder(newTask);

    taskInput.value = "";
    reminderTimeInput.value = "";
    emailInput.value = "";

    renderTasks();
});