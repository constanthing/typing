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


class Quote {
  static quotes = [
    {
      "quote": "The only way to do great work is to love what you do.",
      "author": "Steve Jobs"
    },
    {
      "quote": "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
      "author": "Albert Schweitzer"
    },
    {
      "quote": "Your time is limited, so don't waste it living someone else's life.",
      "author": "Steve Jobs"
    },
    {
      "quote": "Believe you can and you're halfway there.",
      "author": "Theodore Roosevelt"
    },
    {
      "quote": "Don't watch the clock; do what it does. Keep going.",
      "author": "Sam Levenson"
    },
    {
      "quote": "The future belongs to those who believe in the beauty of their dreams.",
      "author": "Eleanor Roosevelt"
    },
    {
      "quote": "It does not matter how slowly you go as long as you do not stop.",
      "author": "Confucius"
    },
    {
      "quote": "Hardships often prepare ordinary people for an extraordinary destiny.",
      "author": "C.S. Lewis"
    },
    {
      "quote": "You are never too old to set another goal or to dream a new dream.",
      "author": "C.S. Lewis"
    },
    {
      "quote": "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
      "author": "Ralph Waldo Emerson"
    },
    {
      "quote": "Happiness is not something ready made. It comes from your own actions.",
      "author": "Dalai Lama"
    },
    {
      "quote": "Start where you are. Use what you have. Do what you can.",
      "author": "Arthur Ashe"
    },
    {
      "quote": "I have not failed. I've just found 10,000 ways that won't work.",
      "author": "Thomas A. Edison"
    },
    {
      "quote": "It always seems impossible until it's done.",
      "author": "Nelson Mandela"
    },
    {
      "quote": "The best way to predict the future is to create it.",
      "author": "Peter Drucker"
    },
    {
      "quote": "Act as if what you do makes a difference. It does.",
      "author": "William James"
    },
    {
      "quote": "Success is walking from failure to failure with no loss of enthusiasm.",
      "author": "Winston Churchill"
    },
    {
      "quote": "Courage is resistance to fear, mastery of fear—not absence of fear.",
      "author": "Mark Twain"
    },
    {
      "quote": "Dream big and dare to fail.",
      "author": "Norman Vaughan"
    },
    {
      "quote": "Don't let the fear of losing be greater than the excitement of winning.",
      "author": "Robert Kiyosaki"
    },
    {
      "quote": "You miss 100% of the shots you don't take.",
      "author": "Wayne Gretzky"
    },
    {
      "quote": "The only limit to our realization of tomorrow will be our doubts of today.",
      "author": "Franklin D. Roosevelt"
    },
    {
      "quote": "Do what you can, with what you have, where you are.",
      "author": "Theodore Roosevelt"
    },
    {
      "quote": "If you're going through hell, keep going.",
      "author": "Winston Churchill"
    },
    {
      "quote": "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
      "author": "Roy T. Bennett"
    },
    {
      "quote": "Great things never came from comfort zones.",
      "author": "Anonymous"
    },
    {
      "quote": "Opportunities don't happen. You create them.",
      "author": "Chris Grosser"
    },
    {
      "quote": "If you want something you've never had, you must be willing to do something you've never done.",
      "author": "Thomas Jefferson"
    },
    {
      "quote": "The secret of getting ahead is getting started.",
      "author": "Mark Twain"
    },
    {
      "quote": "The best revenge is massive success.",
      "author": "Frank Sinatra"
    },
    {
      "quote": "Success usually comes to those who are too busy to be looking for it.",
      "author": "Henry David Thoreau"
    },
    {
      "quote": "Don't wait for opportunity. Create it.",
      "author": "George Bernard Shaw"
    },
    {
      "quote": "Success doesn't just find you. You have to go out and get it.",
      "author": "Anonymous"
    },
    {
      "quote": "The way to get started is to quit talking and begin doing.",
      "author": "Walt Disney"
    },
    {
      "quote": "Don't be afraid to give up the good to go for the great.",
      "author": "John D. Rockefeller"
    },
    {
      "quote": "The only place where success comes before work is in the dictionary.",
      "author": "Vidal Sassoon"
    },
    {
      "quote": "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
      "author": "Christian D. Larson"
    },
    {
      "quote": "Push yourself, because no one else is going to do it for you.",
      "author": "Anonymous"
    },
    {
      "quote": "Don't limit your challenges. Challenge your limits.",
      "author": "Anonymous"
    },
    {
      "quote": "Success doesn't come from what you do occasionally, it comes from what you do consistently.",
      "author": "Marie Forleo"
    },
    {
      "quote": "If you can dream it, you can achieve it.",
      "author": "Zig Ziglar"
    },
    {
      "quote": "What you get by achieving your goals is not as important as what you become by achieving your goals.",
      "author": "Zig Ziglar"
    },
    {
      "quote": "Don't count the days, make the days count.",
      "author": "Muhammad Ali"
    },
    {
      "quote": "You may have to fight a battle more than once to win it.",
      "author": "Margaret Thatcher"
    },
    {
      "quote": "Perseverance is not a long race; it is many short races one after the other.",
      "author": "Walter Elliot"
    },
    {
      "quote": "Do something today that your future self will thank you for.",
      "author": "Sean Patrick Flanery"
    },
    {
      "quote": "We may encounter many defeats but we must not be defeated.",
      "author": "Maya Angelou"
    },
    {
      "quote": "Go as far as you can see; when you get there, you'll be able to see further.",
      "author": "Thomas Carlyle"
    },
    {
      "quote": "The harder you work for something, the greater you'll feel when you achieve it.",
      "author": "Anonymous"
    },
    {
      "quote": "The only person you are destined to become is the person you decide to be.",
      "author": "Ralph Waldo Emerson"
    }
  ];

  constructor() {
    State.quote = this;
    // index used to get random quote
    this.index = null;
    this.author = null;
    this.quote = null;
    this.length = null;
    this.letters = [];
    this.quote = this.getRandom();
    this.breakDownQuote()
  }

  // private method
  #getLetters() {
    for (let letter of this.quote) {
      this.letters.push(letter)
    }
    // pushing space at the end to deal with
    // users skipping the last word not 
    // working properly without significant modification to base code
    // with space don't have to change anything but -1 in if statement 
    // at the end of the input "click" event function
    this.letters.push(" ")
  }

  breakDownQuote() {
    this.author = this.quote.quote;
    this.quote = this.quote.quote;
    this.#getLetters()
    // we don't want to count the manually added " " (so -1)
    this.length = this.quote.length - 1;
  }

  new() {
    // clearning lettersOfQuote
    this.letters.length = 0;

    const oldQuoteIndex = this.index;
    let temp = null;
    // makes sure that newly generated quote isn't the same as the old one
    while (this.index == oldQuoteIndex) {
      temp = this.getRandom();
    }

    this.quote = temp;
    this.breakDownQuote()
  }

  isWrongLetter() {

  }

  getRandom() {
    const random = Math.round(Math.random() * (Quote.quotes.length - 1));
    this.index = random;
    return Quote.quotes[random];
  }
}

class Indicator {
  constructor() {
    State.indicator = this;
  }

  #getFormat(index) {
    return `<span id="indicator">${State.quote.letters[index]}</span>`;
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
    document.addEventListener("keydown", (e)=>{
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
      this.letters[this.index] = e.key;
    } else {
      // is not equal (wrong)
      this.markLetterWrong()
    }

    // finished quote
    if (this.index >= State.quote.length) {
      // add results to history
      State.ui.addHistory()

      State.time.stop()
      State.ui.stopDisplayingStatistics()
      State.ui.Einput.disabled = true;
      this.clearInput(e)
    }

    this.index += 1;
    this.wordIndex += 1;
    State.indicator.move()
    State.ui.displayQuote()
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
      console.log(this.input)
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

new Quote(); new Indicator(); new UI(); new Time(); new Statistics(); new Input();
let state = new State();