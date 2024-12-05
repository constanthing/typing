class UI {
    constructor() {
        State.ui = this;

        // E = element
        this.timeText = UI.find("#time small");
        this.Ewords = null;
        this.mistakesText = UI.find("#wrong small");

        // change #speed to #wpm
        this.wpmText = UI.find("#speed small");
        this.ErawWpm = null;
        this.accuracyText = UI.find("#accuracy small");

        this.quoteText = UI.find("#quote");
        this.quoteOrigin = UI.find("#programQuoteOrigin");
        this.quoteAuthor = UI.find("#programQuoteAuthor");
        this.input = UI.find("#programTyping");

        this.newQuoteButton = UI.find("#newQuoteAction");
        this.listenNewQuote()

        this.Ehistory = UI.find("#programHistory table");

        this.abortController = new AbortController();
        this.signal = this.abortController.signal;

        this.windowListener()
        this.loadHistory()
    }

    loadHistory() {
        if (localStorage.length != 0) {
            if (JSON.parse(localStorage.getItem("saves")).length != 0) {
                let saves = JSON.parse(localStorage.getItem("saves"));
                for (const save of saves) {
                    this.#addHistoryToHtml(save)
                }
            }
        } else {
            localStorage.setItem("saves", "[]")
        }
    }

    // used twice in loadHistory() and addHistory()
    #addHistoryToHtml(save) {
        let temp = {
            "origin": save.origin,
            "author": save.author,
            "date": save.date,
            "type": save.type,
            "category": save.category,
            "speed": save.speed
        };
        save = temp;

        let row = document.createElement("tr");
        for (const [key, value] of Object.entries(save)) {
            console.log(key, value)
            let td = document.createElement("td");
            td.innerText = value;
            row.appendChild(td)
        }
        this.Ehistory.appendChild(row)
    }

    addHistory() {
        let saves = JSON.parse(localStorage.getItem("saves"));
        const save = State.statistics.getSave();
        saves.push(save)
        localStorage.setItem("saves", JSON.stringify(saves))

        this.#addHistoryToHtml(save)
    }

    windowListener() {
        document.addEventListener("keydown", (e) => {
            if (e.key == "Tab") {
                e.preventDefault()
            }
            if (e.key == "Enter" && e.ctrlKey) {
                State.new()
            }
        })
    }

    listenNewQuote() {
        this.newQuoteButton.addEventListener("click", () => {
            State.new()
        })
    }

    disableInput(disable) {
        if (!disable) {
            this.input.disabled = false;
            this.input.classList.remove("disabled")
        } else {
            this.input.disabled = true;
            this.input.classList.add("disabled")
        }
    }

    restart() {
        this.stopDisplayingStatistics()

        this.timeText.innerText = "0";
        // this.Ewords.innerText = "0";
        this.mistakesText.innerText = "0";

        this.wpmText.innerText = "0";
        // this.ErawWpm.innerText = "0";
        this.accuracyText.innerText = "0";

        this.quoteText.innerText = "";
        this.input.value = "";
        this.disableInput(false)
    }

    #dt() {
        // displaying time with time elapsed since started typing
        this.timeText.innerText = parseInt(State.time.elapsed);
        // this.Ewords.innerText = State.statistics.rawWordsTyped;
        this.mistakesText.innerText = State.statistics.letterMistakes;

        State.statistics.calculate()

        this.wpmText.innerText = State.statistics.wpm;
        // this.ErawWpm.innerText = State.statistics.rawWpm;
        this.accuracyText.innerText = State.statistics.accuracy;



    }

    // called when user first presses and key and finishes quote 
    async displayStatistics() {
        // wpm (raw, adjusted)
        // accuracy
        // let elapsedTime = this.elapsedTime;


        do {

            this.#dt()
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
                    console.log("calculateStat...() aborted")
                    return;
                } else {
                    console.log(error)
                    break;
                }
            }

            // elapsedTime = calculateElapsedTime();
        } while (State.time.elapsed <= State.time.limit);
        // 120 = time limit (2 minutes)

        // display statistics one last time
        this.#dt()

        // if user did not finish the quote
        // disable input
        // clear input
        // remove indicator manually
        // update user quote to show removed indicator 
        if (State.input.index < State.quote.length - 1) {
            // remove indicator 
            State.input.letters[State.input.index].classList.remove("indicator")

            this.disableInput(true)
            this.input.value = "";

            this.displayQuote()
        }
    }

    stopDisplayingStatistics() {
        this.abortController.abort()
        this.abortController = new AbortController();
        this.signal = this.abortController.signal;
        // when we stop displaying statistics its because the user finished the quote
        // thus we recording the date and time of the finished quote
        State.statistics.recordDateAndTime()
    }

    displayQuote() {
        this.quoteOrigin.innerText = State.quote.origin;
        this.quoteAuthor.innerText = State.quote.author;
        for (const letter of State.input.letters) {
            this.quoteText.appendChild(letter)
        }
    }

    static find(what) {
        return document.querySelector(what);
    }
}