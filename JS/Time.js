class Time {
  constructor(tl = 60) {
    State.time = this;
    // default time_limit is 60 seconds (1 minute)
    this.beginning = 0;
    this.elapsed = 0;
    this.limit = tl;

    this.abortController = new AbortController();
    this.signal = this.abortController.signal;
  }

  async start() {
    console.log("running now")
    this.beginning = performance.now();
    while (this.elapsed < this.limit) {
      this.elapsed = (performance.now() - this.beginning) / 1000;
      try {
        await new Promise((resolve, reject) => {
          let abort = () => {
            clearTimeout(timeout)
            reject("aborted")
          }

          this.signal.addEventListener("abort", abort)

          let timeout = setTimeout(() => {
            this.signal.removeEventListener("abort", abort)
            resolve()
          }, 100)
        })
      } catch (error) {
        if (error == "aborted") {
          console.log("Time.start() aborted")
          break;
        } else {
          console.log(error)
          break;
        }
      }
    }
  }

  stop() {
    this.abortController.abort()
    this.abortController = new AbortController();
    this.signal = this.abortController.signal;
  }

  restart() {
    // in case restarted before elapsedTime met time_limit
    this.beginning = 0;
    this.elapsed = 0;
    this.stop()
  }
}