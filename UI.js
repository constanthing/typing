class UI {
    constructor() {
        State.ui = this;

        // E = element
        this.Etime = UI.find("#time span");
        this.Ewords = UI.find("#wordsCompleted span");
        this.Emistakes = UI.find("#mistakes span");

        // change #speed to #wpm
        this.Ewpm = UI.find("#speed span");
        this.ErawWpm = UI.find("#rawSpeed span");
        this.Eaccuracy = UI.find("#accuracy span");

        this.Equote = UI.find("#userInput p");
        this.Einput = UI.find("input");

        this.EnewQuote = UI.find("#newQuote");
        this.listenNewQuote()

        this.Ehistory = UI.find("#history ul");

        this.abortController = new AbortController();
        this.signal = this.abortController.signal;

        this.windowListener()
        this.loadHistory()
    }

    loadHistory() {
        if (localStorage.length != 0) {
            if (JSON.parse(localStorage.getItem("saves")).length != 0) {
                // remove first child ("Empty")
                this.Ehistory.removeChild(this.Ehistory.children[0])

                let saves = JSON.parse(localStorage.getItem("saves"));
                for (const save of saves) {
                    this.#addHistoryToHtml(save)
                }
            }
        } else {
            localStorage.setItem("saves", "[]")
        }
    }

    #addHistoryToHtml(save) {
        let listItem = document.createElement("li");
        listItem.innerText = `${save.wpm}wpm - ${save.accuracy}%`;
        this.Ehistory.appendChild(listItem)
    }

    addHistory() {
        const empty = UI.find("#e");
        if (empty) {
            this.Ehistory.removeChild(empty)
        }

        let save = State.statistics.getSave();
        this.#addHistoryToHtml(save)

        // saving to local storage 
        let saves = localStorage.getItem("saves");
        saves = JSON.parse(saves);
        saves.push(save)
        localStorage.setItem("saves", JSON.stringify(saves))
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
        this.EnewQuote.addEventListener("click", () => {
            State.new()
        })
    }

    restart() {
        this.stopDisplayingStatistics()

        this.Etime.innerText = "0";
        this.Ewords.innerText = "0";
        this.Emistakes.innerText = "0";

        this.Ewpm.innerText = "0";
        this.ErawWpm.innerText = "0";
        this.Eaccuracy.innerText = "0";

        this.Equote.innerText = "";
        this.Einput.value = "";
        this.Einput.disabled = false;
    }

    #dt() {
        // displaying time with time elapsed since started typing
        this.Etime.innerText = parseInt(State.time.elapsed);
        this.Ewords.innerText = State.statistics.rawWordsTyped;
        this.Emistakes.innerText = State.statistics.letterMistakes;

        State.statistics.calculate()

        this.Ewpm.innerText = State.statistics.wpm;
        this.ErawWpm.innerText = State.statistics.rawWpm;
        this.Eaccuracy.innerText = State.statistics.accuracy;



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
            State.input.letters[State.input.index] = State.quote.letters[State.input.index];

            // setting letterIndex as if user finished quote
            // State.input.index = State.quote.length;

            State.indicator.remove()

            this.Einput.disabled = true;
            this.Einput.value = "";

            this.displayQuote()
        }
    }

    stopDisplayingStatistics() {
        this.abortController.abort()
        this.abortController = new AbortController();
        this.signal = this.abortController.signal;
    }

    displayQuote() {
        this.Equote.innerHTML = State.input.letters.join("");
    }

    static find(what) {
        return document.querySelector(what);
    }
}