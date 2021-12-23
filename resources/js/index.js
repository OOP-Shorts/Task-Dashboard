import { Errors } from "./utils/Log.js";
import TaskService from "./github/TaskService.js";
import ProgressManager from "./progress/ProgressManager.js";
import TaskView from "./ui/TaskView.js";
import TourGuide from "./onboarding/TourGuide.js";

let tour;

function startTour(force = false) {
  if (tour === undefined) {
    tour = new TourGuide();
    tour.prepare();
  }
  tour.start(force);
}

function renderTasks(tasks) {
  tasks.forEach(task => {
    ProgressManager.registerTask(task.id);
    TaskView.append(task);
  });
  startTour();
}

document.querySelector(".tour").addEventListener("click", () => startTour(true));
TaskView.setRoot(document.querySelector(".tasks"));
TaskService.loadTasks("OOP-Shorts").then(renderTasks).catch(Errors.log);