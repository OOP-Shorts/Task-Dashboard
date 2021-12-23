import ProgressManager from "../progress/ProgressManager.js";

const TASK_TEMPLATE = document.querySelector("#task-template").innerHTML.trim();


function createTaskElement(taskView, task) {
    let taskEl = document.createElement("div");
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
    taskEl.querySelector(".menu").addEventListener("click", () => taskView.toggleHints(taskEl));
    taskEl.querySelector(".category i").addEventListener("click", () => taskView.toggleStatus(taskEl));
    if (ProgressManager.isMarkedAsCompleted(task.id)) {
        taskView.toggleStatus(taskEl, true);
    }
    task.topics.forEach(topic => {
        let topicEl = document.createElement("li");
        topicEl.innerHTML = topic;
        taskEl.querySelector(".topics").append(topicEl);
    });
    task.getHints().then((hints) => {
        taskEl.querySelector(".hints .text").innerHTML = hints;
    });
    return taskEl;
}

class TaskView {

    setRoot(el) {
        this.root = el;
    }

    toggleHints(taskEl) {
        taskEl.querySelector(".hints").classList.toggle("closed");
    }

    toggleStatus(taskEl, initial = false) {
        taskEl.classList.toggle("closed");
        if (initial) {
            return;
        }
        if (taskEl.classList.contains("closed")) {
            ProgressManager.markTaskAsClosed(taskEl.getAttribute("data-id"));
        } else {
            ProgressManager.markTaskAsOpen(taskEl.getAttribute("data-id"));
        }
    }

    copyRepoURL(taskEl) {
        navigator.clipboard.writeText(taskEl.querySelector("[data-action=\"link\"] i").getAttribute("data-repo"));
    }

    append(task) {
        let previousSibling = Array.from(document.querySelectorAll(`[data-category="${task.category}"]`)).reverse()[0],
            taskEl = createTaskElement(this, task);
        if (previousSibling) {
            previousSibling.after(taskEl);
        } else {
            this.root.append(taskEl);
        }
    }

}

export default new TaskView();