let taskList = [];
let editingIndex = -1;

function addTask() {
    let taskName = document.getElementById("task-name").value;
    let reminderType = document.getElementById("reminder-type").value;
    let reminderTime = new Date(document.getElementById("reminder-time").value);

    if (taskName === '' || isNaN(reminderTime.getTime())) {
        alert("Please fill in all fields correctly.");
        return;
    }

    if (editingIndex >= 0) {
        taskList[editingIndex] = {
            name: taskName,
            type: reminderType,
            time: reminderTime,
            completed: false
        };
        editingIndex = -1;
    } else {
        taskList.push({
            name: taskName,
            type: reminderType,
            time: reminderTime,
            completed: false
        });
    }

    displayTasks();
    setReminder(taskList[taskList.length - 1]); // Set reminder for the last added task
    document.getElementById("task-form").reset();
}

function displayTasks() {
    let taskListEl = document.getElementById("task-list");
    taskListEl.innerHTML = "";
    taskList.forEach((task, index) => {
        taskListEl.innerHTML += `
            <li class="${task.completed ? 'completed' : ''}">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleCompletion(${index})">
                ${task.name} - ${task.type}
                <div>
                    <button class="edit-button" onclick="editTask(${index})">Edit</button>
                    <button onclick="removeTask(${index})">Remove</button>
                </div>
            </li>
        `;
    });
}

function toggleCompletion(index) {
    taskList[index].completed = !taskList[index].completed;
    displayTasks();
}

function editTask(index) {
    document.getElementById("task-name").value = taskList[index].name;
    document.getElementById("reminder-type").value = taskList[index].type;
    document.getElementById("reminder-time").value = taskList[index].time.toISOString().slice(0, 16); // Format datetime-local input
    editingIndex = index;
}

function removeTask(index) {
    taskList.splice(index, 1);
    displayTasks();
}

function setReminder(task) {
    let now = new Date();
    let timeDifference = task.time - now;

    if (task.type === "everyday") {
        setInterval(() => {
            alert(`Reminder: ${task.name}`);
        }, 24 * 60 * 60 * 1000);  // Everyday reminder
    } else if (task.type === "one-time" && timeDifference > 0) {
        setTimeout(() => {
            alert(`Reminder: ${task.name}`);
        }, timeDifference);  // One-time reminder
    }
}
