class State {
  static ui = null;
  static quote = null;
  static time = null;
  static statistics = null;
  static input = null;
  static indicator = null;

  constructor() {
    State.start()
  }

  static start() {
    State.input.fillUserLetters()
    State.indicator.move()
    State.ui.displayQuote()

    State.input.start()
  }

  static new() {
    State.indicator.remove()
    State.time.restart()
    State.input.restart()
    State.statistics.restart()
    State.time.restart()
    State.ui.restart()

    State.quote.new()
    State.start()
  }
}

class Indicator {
  constructor() {
    State.indicator = this;
  }

  #getFormat(index) {
    return `<span id="indicatorContainer"><span id="indicator"></span>${State.quote.letters[index]}</span>`;
  }

  // depending on the situation might just create a forward() and backward() and return the modified index
  // forward() returns index + 1 
  move() {
    const index = State.input.index;
    if (index <= State.quote.length) {
      State.input.letters[index] = this.#getFormat(index);
    }
  }

  // remove indicator 
  remove() {
    State.input.letters[State.input.index] = State.quote.letters[State.input.index];
  }
}


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

class Statistics {
  constructor() {
    State.statistics = this;
    this.accuracy = 0;
    this.wordsTyped = 0;
    this.rawWordsTyped = 0;
    this.wpm = 0;
    this.rawWpm = 0;
    this.letterMistakes = 0;
    this.wordMistakes = 0;
    this.attemptedLetters = 0;
  }

  calculate() {
    const elapsedTime = State.time.elapsed;
    this.accuracy = parseInt(((this.attemptedLetters - this.letterMistakes) * 100) / this.attemptedLetters);
    this.wpm = parseInt(this.wordsTyped / (elapsedTime / 60));
    this.rawWpm = parseInt(this.rawWordsTyped / (elapsedTime / 60));
  }

  getSave() {
    return {
      "accuracy": this.accuracy,
      "wordsTyped": this.wordsTyped,
      "rawWordsTyped": this.rawWordsTyped,
      "wpm": this.wpm,
      "rawWpm": this.rawWpm,
      "letterMistakes": this.letterMistakes,
      "wordsMistakes": this.wordMistakes,
      "attemptedLetters": this.attemptedLetters
    }
  }

  restart() {
    this.accuracy = 0;
    this.wordsTyped = 0;
    this.rawWordsTyped = 0;
    this.wpm = 0;
    this.rawWpm = 0;
    this.letterMistakes = 0;
    this.wordMistakes = 0;
    this.attemptedLetters = 0;
  }
}
new Quote(); new Indicator(); new UI(); new Time(); new Statistics(); new Input();
let state = new State();