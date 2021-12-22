/* global showdown */

import {
    Errors
} from "../utils/Log.js";

const STARTER_DOWNLOAD = "https://github.com/$FULL_NAME/archive/refs/heads/starter.zip",
    SOLUTION_DOWNLOAD = "https://github.com/$FULL_NAME/archive/refs/heads/solution.zip";

let converter = new showdown.Converter();

async function getHintsFromRepo(repo) {
    let response, text = "";
    try {
        response = await fetch(`https://raw.githubusercontent.com/${repo.full_name}/starter/README.md`);
        text = await response.text();
    } catch (error) {
        Errors.log(error);
    }
    return converter.makeHtml(text);
}

class Task {

    constructor(id, position, title, category, description, topics, starter, solution, support, estimate) {
        this.id = id;
        this.position = position;
        this.title = title;
        this.category = category;
        this.description = converter.makeHtml(description);
        this.topics = topics;
        this.starter = starter;
        this.solution = solution;
        this.support = support;
        this.estimate = estimate;
    }

    getHints() {
        return new Promise((resolve, reject) => {
            if (this.hints) {
                resolve(this.hints);
            } else {
                let check = setInterval(() => {
                        if (this.hints) {
                            resolve(this.hints);
                            clearInterval(check);
                            clearTimeout(timeout);
                        }
                    }, 500),
                    timeout = setTimeout(() => {
                        clearInterval(check);
                        reject();
                    }, 5000);
            }
        });

    }

    static fromRepo(repo) {
        let task, id = repo.id,
            title = repo.name.substring(repo.name.indexOf("-") + 1).replaceAll("-", " "),
            category = (repo.topics.find((topic) => topic.startsWith("category-")) || "").replace("category-", "").replaceAll("-", " "),
            description = repo.description,
            topics = repo.topics.filter((topic) => topic !== "published" && !topic.startsWith("category-") && !topic.startsWith("position-") && !topic.startsWith("estimate-")),
            starter = STARTER_DOWNLOAD.replace("$FULL_NAME", repo.full_name),
            solution = SOLUTION_DOWNLOAD.replace("$FULL_NAME", repo.full_name),
            support = repo.homepage,
            position = {
                category: 9999,
                inCategory: 9999,
            },
            estimate = "",
            positionString = repo.topics.find((topic) => topic.startsWith("position-")),
            estimateString = repo.topics.find((topic) => topic.startsWith("estimate-"));
        if (positionString) {
            position.category = parseInt(positionString.split("-")[1]);
            position.inCategory = parseInt(positionString.split("-")[2]);
        }
        if (estimateString) {
            estimate = estimateString.split("-")[1];
        }
        task = new Task(id, position, title, category, description, topics, starter, solution, support, estimate);
        getHintsFromRepo(repo).then((hints) => task.hints = hints).catch(Errors.log);
        return task;
    }

}

export default Task;