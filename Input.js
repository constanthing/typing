class Input {
  constructor() {
    State.input = this;

    this.indicator = null;
    this.input = null;
    // index track position in quote
    this.index = 0;
    // tracks position in word
    this.wordIndex = 0;
    this.quoteLetter = null;
    this.letters = null;

    this.new = true;
  }

  restart() {
    this.input.removeEventListener("keydown", this.firstPress)
    this.index = 0;
    this.wordIndex = 0;
    this.quoteLetter = null;
    this.letters = null;
    this.clearInput()
  }

  start() {
    this.input = State.ui.Einput;
    this.input.focus()
    // two event listeners added
    if (this.new) {
      this.#listenToPress()
    }
    this.firstPress = () => {
      this.#firstPress()
    }
    this.input.addEventListener("keydown", this.firstPress)
  }

  async #removeFirstPress() {
    this.input.removeEventListener("keydown", this.firstPress)
  }

  // called every new slate 
  fillUserLetters() {
    this.letters = Array.from(State.quote.letters);
    // assigning obscured classes to all letters
    for (let i = 0; i < this.letters.length; i++) {
      this.letters[i] = `<span class="obscure">${this.letters[i]}</span>`;
    }
  }

  // on a clean slate user pressed key for the first time 
  #firstPress() {
    State.time.start()
    State.ui.displayStatistics()
    this.#removeFirstPress()
  }

  isKeyToIgnore(e) {
    if (e.key == "Tab" || e.key == "Enter" || e.key == "Escape" || e.key == "Meta" || e.key == "Control" || e.key == "Shift" || e.key == "Tab" || e.key == "Alt" ||
      e.key == "ArrowUp" || e.key == "ArrowLeft" || e.key == "ArrowDown" || e.key == "ArrowRight") {
        return true;
    }
    return false;
  }

  #listenToPress() {
    this.new = false;
    this.input.addEventListener("keydown", (e) => {

      this.quoteLetter = State.quote.letters[this.index];

      if (this.isKeyToIgnore(e)) {
        return;
      }

      // ctrl + a = select all
      if (e.metaKey && e.key == "a") {
        return;
      }

      if (e.key == "Backspace") {
        this.backspace(e)
      } else {
        this.letter(e)
      }
    })
  }

  markLetterWrong() {
    this.letters[this.index] = `<span class="wrong">${State.quote.letters[this.index]}</span>`;
    State.statistics.letterMistakes += 1;

    // not counting spaces as part of word 
    if (State.quote.letters[this.index] != " ") {
      State.statistics.wordMistakes += 1;
    }
  }

  space(e) {
    if (this.wordIndex != 0) {
      // skip word but mark skipped letters as wrong
      while (State.quote.letters[this.index] != " ") {
        this.markLetterWrong()
        this.wordIndex += 1;
        this.index += 1;
        State.statistics.attemptedLetters += 1;
      }

      State.statistics.wordsTyped += ((((this.wordIndex - State.statistics.wordMistakes) * 100) / this.wordIndex) / 100);
      // have to make -1 because later in the code wordIndex is +=1 
      // thus when new word occurs it will be 0 instead of 1 (with wordIndex = 0)
      this.wordIndex = -1;
      State.statistics.rawWordsTyped += 1;
      State.statistics.wordMistakes = 0;
      this.clearInput(e)
      return true;
    } else {
      // don't do anything
      this.clearInput(e)
      return false;
    }
  }

  letter(e) {
    State.statistics.attemptedLetters += 1;

    if (e.key == " " || this.quoteLetter == " ") {
      if (!this.space(e)) {
        return;
      }
    }


    // letter (, . etc too) pressed
    // check if current letter == user inputted letter
    if (this.quoteLetter == e.key) {
      // is equal (right)
      // make letter right 
      this.letters[this.index] = `<span class="correct">${e.key}</span>`;
    } else {
      // is not equal (wrong)
      this.markLetterWrong()
    }



    this.index += 1;
    this.wordIndex += 1;
    State.indicator.move()
    State.ui.displayQuote()

    // finished quote
    if (this.index >= State.quote.length+1) {
      // add results to history
      State.ui.addHistory()

      State.time.stop()
      State.ui.stopDisplayingStatistics()
      State.ui.Einput.disabled = true;
      this.clearInput(e)
    }

  }

  #name_again() {
    if (this.letters[this.index].includes("wrong")) {
      State.statistics.wordMistakes -= 1;
    }

    if (this.index >= 1) {
      // obscuring current letter in quote
      // >= 1 because the first letter is NEVER obscured (indicator sits there)
      this.letters[this.index] = `<span class="obscure">${State.quote.letters[this.index]}</span>`;
    }

    // preventing letterIndex from falling below 0 (negatives) 
    if (this.index > 0) {
      this.index -= 1;
    }

    this.wordIndex -= 1;
  }

  backspace() {
    // selectionis always left to right
    if (this.wordIndex > 0) {
      if (this.input.selectionStart == 0 && this.input.selectionEnd > 0 && this.input.selectionEnd == this.wordIndex) {
        // obscuring every letter of the current word typed
        while (this.wordIndex > 0) {
          this.#name_again()
        }
      } else {
        // normal backspace
        this.#name_again()
      }

      State.indicator.move()
      State.ui.displayQuote()
    }
  }

  clearInput(e) {
    if (e) {
      e.preventDefault()
    }
    this.input.value = "";
  }
}

