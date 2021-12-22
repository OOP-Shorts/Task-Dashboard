import { Errors } from "./utils/Log.js"; 
import TaskService from "./github/TaskService.js";
import ProgressManager from "./progress/ProgressManager.js";
import TaskView from "./ui/TaskView.js";
import TourGuide from "./ui/TourGuide.js";

function renderTasks(tasks) {
  tasks.forEach(task => {
    ProgressManager.registerTask(task.id);
    TaskView.append(task);
  });
  let tour = new TourGuide();
  tour.prepare();
  tour.start();
}

TaskView.setRoot(document.querySelector(".tasks"));
TaskService.loadTasks("OOP-Shorts").then(renderTasks).catch(Errors.log);