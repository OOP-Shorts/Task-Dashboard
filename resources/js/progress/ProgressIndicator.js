class ProgressIndicator {

    constructor(el) {
        this.completedTaskEl = el.querySelector(".finished-shorts");
        this.totalTaskEl = el.querySelector(".total-shorts");
    }

    setTotalTaskNumber(number) {
        this.totalTaskEl.innerHTML = number;
    }

    setCompletedTaskNumber(number) {
        this.completedTaskEl.innerHTML = number;
    }

}

export default ProgressIndicator;