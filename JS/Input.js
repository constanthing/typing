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

    isLetter(letter) {
        // https://www.asciitable.com/
        // https://www.ssec.wisc.edu/~tomw/java/unicode.html --->  basic latin
        const minRange = 32; // (space)
        const maxRange = 126; // ~

        let lowerLetter = false;
        // if its a letter / symbol
        if (letter.length == 1) {
            // getting character code
            lowerLetter = letter.toLowerCase().charCodeAt(0)
        }

        return lowerLetter >= minRange && lowerLetter <= maxRange;
    }

    start() {
        this.input = State.ui.input;
        this.input.focus()
        // two event listeners added
        if (this.new) {
            this.#listenToPress()
        }

        // on a clean slate user pressed key for the first time 
        this.firstPress = (e) => {
            // only starts calculating when letter is pressed not a meta, ctrl, shift, ... keys
            if (this.isLetter(e.key)) {
                State.time.start()
                State.ui.displayStatistics()
                this.#removeFirstPress()
            }

        }
        this.input.addEventListener("keydown", this.firstPress)
    }

    restart() {
        this.input.removeEventListener("keydown", this.firstPress)
        this.index = 0;
        this.wordIndex = 0;
        this.quoteLetter = null;
        this.letters = null;
        this.clearInput()
    }

    clearInput(e) {
        if (e) {
            e.preventDefault()
        }
        this.input.value = "";
    }

    #listenToPress() {
        this.new = false;
        this.input.addEventListener("keydown", (e) => {

            this.quoteLetter = State.quote.letters[this.index];

            if (e.key == "Backspace") {
                this.backspace(e)
            }

            if (!this.isLetter(e.key)) {
                return;
            }
            // if (this.isKeyToIgnore(e)) {
            //     return;
            // }

            // ctrl + a = select all
            if (e.metaKey && e.key == "a") {
                return;
            }

            this.letter(e)
        })
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
            // this.letters[this.index] = `<span class="correct">${e.key}</span>`;
            this.modifyClassList(this.letters[this.index], "correct")
        } else {
            // is not equal (wrong)
            this.markLetterWrong()
        }

        this.index += 1;
        this.wordIndex += 1;
        State.indicator.move()
        // State.ui.displayQuote()

        // finished quote
        if (this.index >= State.quote.length + 1) {
            State.time.stop()
            State.ui.stopDisplayingStatistics()
            State.ui.disableInput(true)
            this.clearInput(e)

            // add results to history
            State.ui.addHistory()
        }

    }

    async #removeFirstPress() {
        this.input.removeEventListener("keydown", this.firstPress)
    }

    // called every new slate 
    fillUserLetters() {
        this.letters = Array.from(State.quote.letters);
        // assigning obscured classes to all letters
        for (let i = 0; i < this.letters.length; i++) {
            let element = document.createElement("span");
            element.classList.add("obscure")
            element.innerText = this.letters[i];
            this.letters[i] = element;
        }
    }


    modifyClassList(element, value) {
        element.classList.remove(element.classList[0])
        element.classList.add(value)
    }


    markLetterWrong() {
        this.modifyClassList(this.letters[this.index], "wrong")
        // this.letters[this.index] = `<span class="wrong">${State.quote.letters[this.index]}</span>`;
        State.statistics.letterMistakes += 1;

        // not counting spaces as part of word 
        if (State.quote.letters[this.index] != " ") {
            State.statistics.wordMistakes += 1;
        }
    }

    #name_again() {
        if (this.letters[this.index].classList.contains("wrong")) {
            State.statistics.wordMistakes -= 1;
        }

        if (this.index >= 1) {
            // obscuring current letter in quote
            // >= 1 because the first letter is NEVER obscured (indicator sits there)
            this.modifyClassList(this.letters[this.index], "obscure")
            // this.letters[this.index] = `<span class="obscure">${State.quote.letters[this.index]}</span>`;
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
            // State.ui.displayQuote()
        }
    }

}

