class Statistics {
  constructor() {
    State.statistics = this;
    this.accuracy = 0;
    this.wordsTyped = 0;
    this.rawWordsTyped = 0;
    this.wpm = 0;
    this.date = null;
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

  recordDateAndTime() {
    this.date = new Date().toDateString();
  }

  getSave() {
    return {
      "origin": State.quote.origin,
      "author": State.quote.author,
      "date": this.date,
      "type": State.quote.type,
      "category": State.quote.category,
      "accuracy": this.accuracy,
      "wordsTyped": this.wordsTyped,
      "rawWordsTyped": this.rawWordsTyped,
      "speed": this.wpm,
      "rawSpeed": this.rawWpm,
      "letterMistakes": this.letterMistakes,
      "wordMistakes": this.wordMistakes,
      "attemptedLetters": this.attemptedLetters
    }
  }

  restart() {
    this.accuracy = 0;
    this.wordsTyped = 0;
    this.rawWordsTyped = 0;
    this.wpm = 0;
    this.date = null;
    this.rawWpm = 0;
    this.letterMistakes = 0;
    this.wordMistakes = 0;
    this.attemptedLetters = 0;
  }
}