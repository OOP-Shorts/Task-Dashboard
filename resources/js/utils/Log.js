class Log {

    constructor(label) {
        this.label = label;
    }

    log(msg) {
        console.log(`[${this.label}] ${(new Date()).toISOString()} 🠗🠗🠗🠗🠗`); // eslint-disable-line no-console
        console.log(msg); // eslint-disable-line no-console
    }

}

export let Debug = new Log("Debug"), Errors = new Log("Error");