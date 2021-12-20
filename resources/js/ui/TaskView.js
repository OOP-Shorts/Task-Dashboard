const TASK_TEMPLATE = document.querySelector("#task-template").innerHTML.trim();

let completedTasks = JSON.parse(localStorage.getItem("COMPLETED_TASK")) || [];

function addCompletedTaskToStorage(taskId) {
    if(completedTasks.includes(taskId)) {
        return;
    }
    completedTasks.push(taskId);
    localStorage.setItem("COMPLETED_TASK", JSON.stringify(completedTasks));
}

function removeCompletedTaskFromStorage(taskId) {
    if(!completedTasks.includes(taskId)) {
        return;
    }
    completedTasks.splice(completedTasks.indexOf(taskId), 1);
    localStorage.setItem("COMPLETED_TASK", JSON.stringify(completedTasks));
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
        if(taskEl.classList.contains("closed")) {
            addCompletedTaskToStorage(taskEl.getAttribute("data-id"));
        } else {
            removeCompletedTaskFromStorage(taskEl.getAttribute("data-id"));
        }
    }

    append(task) {
        let taskEl = document.createElement("div");
        taskEl.innerHTML = TASK_TEMPLATE;
        taskEl = taskEl.firstChild;
        taskEl.setAttribute("data-id", task.id);
        taskEl.querySelector(".category .text").innerHTML = task.category;
        taskEl.querySelector(".title").innerHTML = task.title;
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
        if(completedTasks.includes(task.id.toString())) {
            this.toggleStatus(taskEl);
        }
        this.root.append(taskEl);
    }

}

export default new TaskView();