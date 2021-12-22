const TASK_TEMPLATE = document.querySelector("#task-template").innerHTML.trim();

let completedTasks = JSON.parse(localStorage.getItem("COMPLETED_TASK")) || [];

function addCompletedTaskToStorage(taskId) {
    if (completedTasks.includes(taskId)) {
        return;
    }
    completedTasks.push(taskId);
    localStorage.setItem("COMPLETED_TASK", JSON.stringify(completedTasks));
    updateProgressIndicator();
}

function removeCompletedTaskFromStorage(taskId) {
    if (!completedTasks.includes(taskId)) {
        return;
    }
    completedTasks.splice(completedTasks.indexOf(taskId), 1);
    localStorage.setItem("COMPLETED_TASK", JSON.stringify(completedTasks));
    updateProgressIndicator();
}

function updateProgressIndicator(fromEvent = true) {
    document.querySelector(".progress .finished-shorts").innerHTML = completedTasks.length;
    document.querySelector(".progress .total-shorts").innerHTML = document.querySelectorAll(".task-view-item").length;
    if(fromEvent && completedTasks.length > 0 && (completedTasks.length === document.querySelectorAll(".task-view-item").length)) {
        showFirework(3000);
    }
}

function showFirework(time) {
    let firework = document.createElement("div");
    firework.innerHTML = "<div class=\"pyro\"><div class=\"before\"></div><div class=\"after\"></div></div>";
    firework = firework.firstChild;
    document.body.append(firework);
    setTimeout(() => firework.remove(), time);
}

class TaskView {

    setRoot(el) {
        this.root = el;
    }

    toggleHints(taskEl) {
        taskEl.querySelector(".hints").classList.toggle("closed");
    }

    toggleStatus(taskEl) {
        taskEl.classList.toggle("closed");
        if (taskEl.classList.contains("closed")) {
            addCompletedTaskToStorage(taskEl.getAttribute("data-id"));
        } else {
            removeCompletedTaskFromStorage(taskEl.getAttribute("data-id"));
        }
    }

    copyRepoURL(taskEl) {
        navigator.clipboard.writeText(taskEl.querySelector("[data-action=\"link\"] i").getAttribute("data-repo"));
    }

    append(task) {
        let previousSibling, taskEl = document.createElement("div");
        taskEl.innerHTML = TASK_TEMPLATE;
        taskEl = taskEl.firstChild;
        taskEl.classList.add("task-view-item");
        taskEl.setAttribute("data-id", task.id);
        taskEl.setAttribute("data-category", task.category);
        taskEl.querySelector(".category .text").innerHTML = `${task.position.category}. ${task.category} | Aufgabe ${task.position.inCategory}`;
        taskEl.querySelector(".title").innerHTML = task.title;
        taskEl.querySelector(".estimate .time").innerHTML = task.estimate;
        taskEl.querySelector(".description").innerHTML = task.description;
        taskEl.querySelector("[data-action=\"starter\"] a").href = task.starter;
        taskEl.querySelector("[data-action=\"solution\"] a").href = task.solution;
        taskEl.querySelector("[data-action=\"support\"] a").href = task.support;
        task.getHints().then((hints) => {
            taskEl.querySelector(".hints .text").innerHTML = hints;
        });
        task.topics.forEach(topic => {
            let topicEl = document.createElement("li");
            topicEl.innerHTML = topic;
            taskEl.querySelector(".topics").append(topicEl);
        });
        taskEl.querySelector(".menu").addEventListener("click", () => this.toggleHints(taskEl));
        taskEl.querySelector(".category i").addEventListener("click", () => this.toggleStatus(taskEl));
        if (completedTasks.includes(task.id.toString())) {
            this.toggleStatus(taskEl);
        }
        previousSibling = Array.from(document.querySelectorAll(`[data-category="${task.category}"]`)).reverse()[0];
        if (previousSibling) {
            previousSibling.after(taskEl);
        } else {
            this.root.append(taskEl);
        }
        
        updateProgressIndicator(false);
    }

}

export default new TaskView();