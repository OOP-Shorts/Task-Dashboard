/* global showdown */

const STARTER_DOWNLOAD = "https://github.com/$FULL_NAME/archive/refs/heads/starter.zip",
    SOLUTION_DOWNLOAD = "https://github.com/$FULL_NAME/archive/refs/heads/solution.zip";

let converter = new showdown.Converter();

async function getHintsFromRepo(repo) {
    let reponse = await fetch(`https://raw.githubusercontent.com/${repo.full_name}/starter/README.md`),
        text = await reponse.text();
    return converter.makeHtml(text);
}

class Task {

    constructor(id, title, category, description, topics, starter, solution, support) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.description = converter.makeHtml(description);
        this.topics = topics;
        this.starter = starter;
        this.solution = solution;
        this.support = support;
    }

    getHints() {
        return new Promise((resolve, reject) => {
            if(this.hints) {
                resolve(this.hints);
            } else {
                let check = setInterval(() => {
                    if(this.hints) {
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
        let id = repo.id,
            title = repo.name.substring(repo.name.indexOf("-") + 1).replaceAll("-", " "),
            category = (repo.topics.find((topic) => topic.startsWith("category-")) || "").replace("category-", "").replaceAll("-", " "),
            description = repo.description,
            topics = repo.topics.filter((topic) => topic !== "published" && !topic.startsWith("category-")),
            starter = STARTER_DOWNLOAD.replace("$FULL_NAME", repo.full_name),
            solution = SOLUTION_DOWNLOAD.replace("$FULL_NAME", repo.full_name),
            support = repo.homepage,
            task = new Task(id, title, category, description, topics, starter, solution, support);
        getHintsFromRepo(repo).then((hints) => task.hints = hints);
        return task;
    }

}

export default Task;