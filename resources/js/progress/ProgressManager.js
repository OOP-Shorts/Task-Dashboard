import ProgressIndicator from "./ProgressIndicator.js";

let completedTasks = JSON.parse(localStorage.getItem("COMPLETED_TASK")) || [],
    knownTasks = [],
    indicator = new ProgressIndicator(document.querySelector(".progress-indicator"));

function showFirework(time) {
    let firework = document.createElement("div");
    firework.innerHTML = "<div class=\"pyro\"><div class=\"before\"></div><div class=\"after\"></div></div>";
    firework = firework.firstChild;
    document.body.append(firework);
    setTimeout(() => firework.remove(), time);
}

function updateProgressIndicator(fromEvent = true) {
    indicator.setCompletedTaskNumber(completedTasks.length);
    indicator.setTotalTaskNumber(knownTasks.length);
}

class ProgressManager {

    markTaskAsClosed(taskId) {
        if (completedTasks.includes(taskId.toString())) {
            return;
        }
        completedTasks.push(taskId.toString());
        localStorage.setItem("COMPLETED_TASK", JSON.stringify(completedTasks));
        updateProgressIndicator();
    }

    markTaskAsOpen(taskId) {
        if (!completedTasks.includes(taskId.toString())) {
            return;
        }
        completedTasks.splice(completedTasks.indexOf(taskId.toString()), 1);
        localStorage.setItem("COMPLETED_TASK", JSON.stringify(completedTasks));
        updateProgressIndicator();
    }

    registerTask(taskId) {
        if(knownTasks.includes(taskId.toString())) {
            return;
        }
        knownTasks.push(taskId.toString());
        updateProgressIndicator(false);
    }

    isMarkedAsCompleted(taskId) {
        return completedTasks.includes(taskId.toString());
    }

}

export default new ProgressManager();