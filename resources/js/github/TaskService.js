import {
    Errors
} from "../utils/Log.js";
import Task from "./Task.js";

const REPOS_PER_PAGE_REQUEST = 100,
    /*
      Github returns a set of public repositories sorted ascending by creation date. By reversing this direction 
      we will get more new repositories from each call. Since it is more likely that new tasks rather then
      other types of repositories (tools, pages, ...) will be added to the organization, this approach will
      enable use to stop making api calls, when no more tasks were returned.
    */
    API_URL = "https://api.github.com/orgs/$SOURCE/repos?page=$PAGE&per_page=$MAX&direction=desc&type=public";

async function fetchRepos(source, page = 1) {
    let url, response, repos = [];
    try {
        url = API_URL.replace("$SOURCE", source).replace("$PAGE", page).replace("$MAX", REPOS_PER_PAGE_REQUEST);
        response = await fetch(url);
        repos = await response.json();
    } catch (error) {
        Errors.log(error);
    }
    return repos;
}

function sortTasksByCategory(tasks) {
    return tasks.sort((a, b) => {
        if (a.position.category < b.position.category) {
            return -1;
        }
        if (a.position.category > b.position.category) {
            return 1;
        }
        if (a.position.inCategory < b.position.inCategory) {
            return -1;
        }
        return 1;
    });
}

async function fetchAvailableTasksFrom(source) {
    let tasks,
        taskRepos = [],
        shouldFetchNextPage = true,
        nextPage = 1;

    while (shouldFetchNextPage) {
        let repos = [];
        try {
            repos = await fetchRepos(source, nextPage);
        } catch (error) {
            Errors.log(error);
        }
        if (repos.length === 0) {
            shouldFetchNextPage = false;
            break;
        }
        taskRepos = taskRepos.concat(repos.filter((repo) => repo.topics.includes("published")));
        if (repos.length < REPOS_PER_PAGE_REQUEST) {
            shouldFetchNextPage = false;
        }
    }
    tasks = taskRepos.map((repo) => Task.fromRepo(repo));
    return sortTasksByCategory(tasks);
}

class TaskService {

    async loadTasks(source) {
        let repos = [];
        try {
            repos = await fetchAvailableTasksFrom(source);
        } catch (error) {
            Errors.log(error);
        }
        return repos;
    }

}

export default new TaskService();