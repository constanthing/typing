class Quote {
  static quotes = [
    {
      "quote": "In the end, it's not the years in your life that count, it's the life in your years. Life is what you make of it, and the most important thing is to make the most of the time you have and live each day as fully as possible.",
      "author": "Abraham Lincoln"
    },
    {
      "quote": "You will face many defeats in life, but never let yourself be defeated. It may not be easy, but the challenges you face are what make you stronger and more capable of overcoming future obstacles. The key is persistence and believing in your own potential.",
      "author": "Maya Angelou"
    },
    {
      "quote": "Success is not how high you have climbed, but how you make a positive difference to the world. It is the impact you have on others and the legacy you leave behind that defines success, not the material possessions or accolades you collect along the way.",
      "author": "Roy T. Bennett"
    },
    {
      "quote": "The only way to do great work is to love what you do. If you haven’t found it yet, keep looking. Don’t settle. As with all matters of the heart, you’ll know when you find it. And when you do, your work will become more than just a job — it will become a passion.",
      "author": "Steve Jobs"
    },
    {
      "quote": "Don't judge each day by the harvest you reap, but by the seeds that you plant. Even when the results of your hard work aren't immediately apparent, remember that every step forward is progress, and every act of kindness or hard work adds to your future success.",
      "author": "Robert Louis Stevenson"
    },
    {
      "quote": "The most difficult thing is the decision to act, the rest is merely tenacity. When you have a goal or a dream, the hardest part is committing to it, and once you do, everything else becomes easier. It’s persistence and courage that will ultimately lead you to success.",
      "author": "Amelia Earhart"
    },
    {
      "quote": "Life is not measured by the number of breaths we take, but by the moments that take our breath away. It’s not about living as long as possible, but about filling your life with experiences that make it meaningful. Focus on creating memories, not just surviving each day.",
      "author": "George Carlin"
    },
    {
      "quote": "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. The pursuit of happiness should be the ultimate goal, and when you are happy, success will naturally follow as a result of your positive energy and attitude.",
      "author": "Albert Schweitzer"
    },
    {
      "quote": "It does not matter how slowly you go as long as you do not stop. Every step you take, no matter how small, brings you closer to your goal. Consistency and determination will get you there, no matter how long it takes or how difficult the path may seem.",
      "author": "Confucius"
    },
    {
      "quote": "In three words I can sum up everything I’ve learned about life: it goes on. Life is full of ups and downs, but the one thing that is certain is that it moves forward. No matter what happens, time doesn’t stop, and neither should you. Keep going, even when things get tough.",
      "author": "Robert Frost"
    }
  ];

  constructor() {
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
  constructor(quote, input) {
    this.input = input;
    this.quote = quote;
  }

  #getFormat(index) {
    return `<span id="indicator">${this.quote.letters[index]}</span>`;
  }

  // depending on the situation might just create a forward() and backward() and return the modified index
  // forward() returns index + 1 
  move() {
    const index = this.input.index;
    if (index < this.quote.length) {
      this.input.letters[index] = this.#getFormat(index);
    }
  }

  // remove indicator 
  remove() {
    this.input.letters[this.input.index] = this.quote.letters[this.input.index];
  }
}

class UI {
  constructor() {
    this.time = null;
    this.input = null;
    this.quote = null;
    this.statistics = null;

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

    // this.trackInput()
  }

  relationships(time, input, quote, statistics) {
    this.time = time;
    this.input = input;
    this.quote = quote;
    this.statistics = statistics;
  }

  cleanSlate() {
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

  // called when user first presses and key and finishes quote 
  async displayStatistics() {
    // wpm (raw, adjusted)
    // accuracy
    // let elapsedTime = this.elapsedTime;

    do {
      console.log("running")
      // displaying time with time elapsed since started typing
      this.Etime.innerText = parseInt(this.time.elapsed);
      this.Ewords.innerText = this.statistics.rawWordsTyped;
      this.Emistakes.innerText = this.statistics.letterMistakes;

      this.statistics.calculate()

      this.Ewpm.innerText = this.statistics.wpm;
      this.ErawWpm.innerText = this.statistics.rawWpm;
      this.Eaccuracy.innerText = this.statistics.accuracy;

      if (this.input.index >= this.quote.length) {
        break;
      }

      await new Promise((resolve, reject) => {
        setTimeout(() => { resolve() }, 100)
      })

      // elapsedTime = calculateElapsedTime();
    } while (this.time.elapsed <= this.time.limit);
    // 120 = time limit (2 minutes)

    // if user did not finish the quote
    // disable input
    // clear input
    // remove indicator manually
    // update user quote to show removed indicator 
    if (this.input.index < this.quote.length - 1) {
      // remove indicator 
      this.letters[this.index] = this.quote.letters[this.index];

      // setting letterIndex as if user finished quote
      letterIndex = this.quote.length;

      input.disabled = true;
      input.value = "";


      displayUserQuote()
    }

  }

  displayQuote() {
    this.Equote.innerHTML = this.input.letters.join("");
  }

  static find(what) {
    return document.querySelector(what);
  }
}

class Stopwatch {
  constructor(tl = 60) {
    // default time_limit is 60 seconds (1 minute)
    this.beginning = 0;
    this.elapsed = 0;
    this.limit = tl;
  }

  async start() {
    this.beginning = performance.now();
    while (this.elapsed < this.limit) {
      this.elapsed = (performance.now() - this.beginning) / 1000;
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 100)
      })
    }
  }

  restart() {
    // in case restarted before elapsedTime met time_limit
    this.elapsed = this.limit;

    this.beginning = 0;
  }
}

class Statistics {
  constructor(time) {
    this.time = time;
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
    const elapsedTime = this.time.elapsed;
    this.accuracy = parseInt(((this.attemptedLetters - this.letterMistakes) * 100) / this.attemptedLetters);
    this.wpm = parseInt(this.wordsTyped / (elapsedTime / 60));
    this.rawWpm = parseInt(this.rawWordsTyped / (elapsedTime / 60));
  }
}

class Input {
  constructor(quote, time, ui, statistics) {
    this.input = ui.Einput;
    this.quote = quote;
    this.time = time;
    this.ui = ui;
    this.statistics = statistics;
    this.indicator = null;


    // index track position in quote
    this.index = 0;
    // tracks position in word
    this.wordIndex = 0;
    this.quoteLetter = null;

    this.letters = null;

    console.log(this.time)
    // two event listeners added
    this.#listenToPress()
    this.firstPress = () => {
      this.#firstPress()
    }
    this.input.addEventListener("keydown", this.firstPress)
  }

  assingIndicator(indicator) {
    this.indicator = indicator;
  }

  async #removeFirstPress() {
    this.input.removeEventListener("keydown", this.firstPress)
  }

  // called every new slate 
  fillUserLetters() {
    this.letters = Array.from(this.quote.letters);
    // assigning obscured classes to all letters
    for (let i = 0; i < this.letters.length; i++) {
      this.letters[i] = `<span class="obscure">${this.letters[i]}</span>`;
    }
  }

  // on a clean slate user pressed key for the first time 
  #firstPress() {
    this.time.start()
    this.ui.displayStatistics()
    this.#removeFirstPress()
  }

  #listenToPress() {
    this.input.addEventListener("keydown", (e) => {

      this.quoteLetter = this.quote.letters[this.index];

      if (e.key == "Escape" || e.key == "Meta" || e.key == "Control" || e.key == "Shift" || e.key == "Tab" || e.key == "Alt" ||
        e.key == "ArrowUp" || e.key == "ArrowLeft" || e.key == "ArrowDown" || e.key == "ArrowRight") {
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
    this.letters[this.index] = `<span class="wrong">${this.quote.letters[this.index]}</span>`;
    this.statistics.letterMistakes += 1;

    // not counting spaces as part of word 
    if (this.quote.letters[this.index] != " ") {
      this.statistics.wordMistakes += 1;
    }
  }

  space(e) {
    if (this.wordIndex != 0) {
      // skip word but mark skipped letters as wrong
      while (this.quote.letters[this.index] != " ") {
        this.markLetterWrong()
        this.wordIndex += 1;
        this.index += 1;
        this.statistics.attemptedLetters += 1;
      }

      this.statistics.wordsTyped += ((((this.wordIndex - this.statistics.wordMistakes) * 100) / this.wordIndex) / 100);
      // have to make -1 because later in the code wordIndex is +=1 
      // thus when new word occurs it will be 0 instead of 1 (with wordIndex = 0)
      this.wordIndex = -1;
      this.statistics.rawWordsTyped += 1;
      this.statistics.wordMistakes = 0;
      this.clearInput(e)
    } else {
      // don't do anything
      this.clearInput(e)
      return;
    }
  }

  letter(e) {
    this.statistics.attemptedLetters += 1;

    if (e.key == " " || this.quoteLetter == " ") {
      this.space(e)
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
    this.index += 1;
    this.wordIndex += 1;
    this.indicator.move()
    this.ui.displayQuote()


    // finished quote
    if (this.index >= this.quote.length) {
      // run statistics one last time
      this.ui.displayStatistics()
      this.input.disabled = true;
      this.clearInput(e)
    }
  }

  #name_again() {
    if (this.letters[this.index].includes("wrong")) {
      this.statistics.wordMistakes -= 1;
    }

    if (this.index >= 1) {
      // obscuring current letter in quote
      // >= 1 because the first letter is NEVER obscured (indicator sits there)
      this.letters[this.index] = `<span class="obscure">${this.quoteLetter}</span>`;
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

      this.indicator.move()
      this.ui.displayQuote()
    }
  }

  clearInput(e) {
    e.preventDefault()
    this.input.value = "";
  }
}

class Parent {
  constructor() {
    this.ui = null;
    this.quote = null;
    this.time = null;
    this.statistics = null;
    this.input = null;
    this.indicator = null;
  }
}

class State {
  constructor() {
    this.ui = new UI();
    this.quote = new Quote();
    this.time = new Stopwatch();
    this.statistics = new Statistics(this.time);
    this.input = new Input(this.quote, this.time, this.ui, this.statistics);
    this.indicator = new Indicator(this.quote, this.input);
    this.input.assingIndicator(this.indicator)

    this.start()
  }

  start() {
    this.ui.relationships(this.time, this.input, this.quote, this.statistics)
    this.input.fillUserLetters()
    this.indicator.move()
    this.ui.displayQuote()
  }

  new() {
    this.ui.cleanSlate();
    this.quote.new();
    this.time.restart();
  }
}


let state = new State();