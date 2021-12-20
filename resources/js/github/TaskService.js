import Task from "./Task.js";

const API_URL = "https://api.github.com/orgs/$SOURCE/repos";

async function fetchAvailableTasksFrom(source) {
    let response = await fetch(API_URL.replace("$SOURCE", source)),
        repos = await response.json(),
        taskRepos = repos.filter((repo) => repo.topics.includes("published"));
    return taskRepos.map(taskRepo => Task.fromRepo(taskRepo)).sort((a, b) => {
        if(a.position.category < b.position.category) {
            return -1;
        }
        if(a.position.category > b.position.category) {
            return 1;
        }
        if(a.position.inCategory < b.position.inCategory) {
            return -1;
        }
        return 1;
    });
}

class TaskService {

    async loadTasks(source) {
        let repos = await fetchAvailableTasksFrom(source);
        return repos;
    }

}

export default new TaskService();