import TaskService from "./github/TaskService.js";
import TaskView from "./ui/TaskView.js";
import TourGuide from "./ui/TourGuide.js";

function renderTasks(tasks) {
  tasks.forEach(task => {
    TaskView.append(task);
  });
  let tour = new TourGuide();
  tour.prepare();
  tour.start();
}

TaskView.setRoot(document.querySelector(".tasks"));
TaskService.loadTasks("OOP-Shorts").then(renderTasks);