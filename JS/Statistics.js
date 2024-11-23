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