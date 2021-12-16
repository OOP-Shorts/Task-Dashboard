const TASK_TEMPLATE = document.querySelector("#task-template").innerHTML.trim();

function onTaskSelected(event) {
}

class TaskView {

    setRoot(el) {
        this.root = el;
    }

    onTaskSelected(event) {
        console.log(`Task selected: ${event.target.getAttribute("data-id")}`);
    }

    append(task) {
        let taskEl = document.createElement("div");
        taskEl.innerHTML = TASK_TEMPLATE;
        taskEl = taskEl.firstChild;
        taskEl.setAttribute("data-id", task.id);
        taskEl.querySelector(".category").innerHTML = task.category;
        taskEl.querySelector(".title").innerHTML = task.title;
        taskEl.querySelector(".description").innerHTML = task.description;
        taskEl.querySelector("[data-action=\"starter\"] a").href = task.starter; 
        taskEl.querySelector("[data-action=\"solution\"] a").href = task.solution; 
        taskEl.querySelector("[data-action=\"support\"] a").href = task.support; 
        taskEl.querySelector("[data-action=\"more\"]").addEventListener("click", () => this.onTaskSelected());
        task.topics.forEach(topic => {
            let topicEl = document.createElement("li");
            topicEl.innerHTML = topic;
            taskEl.querySelector(".topics").append(topicEl);
        });
        this.root.append(taskEl);
    }

}

export default new TaskView();