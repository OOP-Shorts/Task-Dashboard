class ProgressIndicator {

    constructor(el) {
        this.completedTaskEl = el.querySelector(".finished-shorts");
        this.totalTaskEl = el.querySelector(".total-shorts");
        this.progressBarEl = el.querySelector(".bar");
    }

    setTotalTaskNumber(number) {
        this.totalTaskEl.innerHTML = number;
        this.updateProgressBar();
    }

    setCompletedTaskNumber(number) {
        this.completedTaskEl.innerHTML = number;
        this.updateProgressBar();
    }

    updateProgressBar() {
        let barWidth = (parseInt(this.completedTaskEl.innerHTML) / parseInt(this.totalTaskEl.innerHTML)) * 100;
        if (isNaN(barWidth)) {
            return;
        }
        this.progressBarEl.style.width = `${barWidth}vw`;
    }

}

export default ProgressIndicator;