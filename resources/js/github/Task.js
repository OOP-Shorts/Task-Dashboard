const STARTER_DOWNLOAD = "https://github.com/$FULL_NAME/archive/refs/heads/starter.zip",
    SOLUTION_DOWNLOAD = "https://github.com/$FULL_NAME/archive/refs/heads/solution.zip";

class Task {

    constructor(id, title, category, description, topics, starter, solution, support) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.description = description;
        this.topics = topics;
        this.starter = starter;
        this.solution = solution;
        this.support = support;
        Object.freeze(this);
    }

    static fromRepo(repo) {
        let id = repo.id,
            title = repo.name.substring(repo.name.indexOf("-") + 1).replaceAll("-", " "),
            category = repo.homepage.substring(repo.homepage.lastIndexOf("#") + 1).replaceAll("-", " "),
            description = repo.description,
            topics = repo.topics,
            starter = STARTER_DOWNLOAD.replace("$FULL_NAME", repo.full_name),
            solution = SOLUTION_DOWNLOAD.replace("$FULL_NAME", repo.full_name),
            support = "";
        return new Task(id, title, category, description, topics, starter, solution, support);
    }

}

export default Task;