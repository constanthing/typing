const quotes = [
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

// ELEMENTS
const userQuote = document.querySelector("#userInput p");
const input = document.querySelector("input");
const debug = document.querySelector("#debug");
const htmlSpeed = document.querySelector("#speed span");
const htmlRawSpeed = document.querySelector("#rawSpeed span");
const htmlAccuracy = document.querySelector("#accuracy span");
const time = document.querySelector("#time span");
const words = document.querySelector("#wordsCompleted span");
const htmlMistakes = document.querySelector("#mistakes span");



// getting random quote from quotes
let quote = quotes[parseInt(Math.random() * quotes.length-1)];
// extracting author from quote
const author = quote["author"];


// splitting quote into words
quote = quote['quote']

// pushing all the letters in the quote into a single array
let lettersOfQuote = []
for (let w of quote) {
    for (let l of w) {
        lettersOfQuote.push(l)
    }
}

// pushing space at the end to deal with
// users skipping the last word not 
// working properly without significant modification to base code
// with space don't have to change anything but -1 in if statement 
// at the end of the input "click" event function
lettersOfQuote.push(" ")

// saving quote length
// we don't want to count the manually added " " (so -1)
const quoteLength = lettersOfQuote.length-1;


// splitting quote into words
quote = quote.split(" ")



let userLetters = [];
// Array.from() used otherwise userLetters would be linked via pointer to lettersOfQuote
userLetters = Array.from(lettersOfQuote);


// assigning hidden classes to all letters
for (let i = 0; i < userLetters.length; i++) {
  userLetters[i] = `<span class="obscure">${userLetters[i]}</span>`;
}

// index track position in quote
let letterIndex = 0; 
// tracks position in word
let wordIndex = 0;
// tracks words completed 
let wordsCompleted = 0;
// tracks raw words done so far (without adjustment to word mistakes)
let rawWordsCompleted = 0;
// tracks wordMistakes 
let wordMistakes = 0;
// tracks wrong letters
let mistakes = 0;
// tracks when user first pressed key 
let startTime = null;
// tracks attempted letters
let attemptedLetters = 0;
let speed = 0;
let rawSpeed = 0;
let accuracy = 0;

// create indicator
function updateIndicator() {
  // check if obscured
  if (letterIndex < quoteLength) {
    const currentLetter = lettersOfQuote[letterIndex];
    userLetters[letterIndex] = `<span id="indicator">${currentLetter}</span>`;
  }
}
function displayUserQuote() {
  userQuote.innerHTML = userLetters.join("")
}

updateIndicator()
displayUserQuote()

function markLetterWrong() {
  userLetters[letterIndex] = `<span class="wrong">${lettersOfQuote[letterIndex]}</span>`;
  mistakes += 1;

  // not counting spaces as part of word 
  if (lettersOfQuote[letterIndex] != " ") {
    wordMistakes += 1;
  }
}

function clearInput(e) {
    input.value = "";
    e.preventDefault()
}

function displayDebug() {
  words.innerText = rawWordsCompleted;
  htmlMistakes.innerText = mistakes;
}

function backspace(quoteLetter) {
  if (userLetters[letterIndex].includes("wrong")) {
    wordMistakes -= 1;
  }

  if (letterIndex >= 1) {
    // obscuring current letter in quote
    // >= 1 because the first letter is NEVER obscured (indicator sits there)
    userLetters[letterIndex] = `<span class="obscure">${quoteLetter}</span>`;
  }

  // preventing letterIndex from falling below 0 (negatives) 
  if (letterIndex > 0) {
    letterIndex-=1;
  }

  wordIndex -= 1;
}

function calculateElapsedTime() {
  return parseInt((performance.now()-startTime)/1000);
}

function calculateStatistics(elapsedTime) {
    accuracy = parseInt(((attemptedLetters - mistakes) * 100) / attemptedLetters);
    speed = parseInt(wordsCompleted / (elapsedTime / 60));
    rawSpeed = parseInt(rawWordsCompleted / (elapsedTime/60));
}

async function displayStatistics() {
  console.log("displayStatistics() called")
  // wpm (raw, adjusted)
  // accuracy
  let elapsedTime = calculateElapsedTime();

  do {
    // displaying time with time elapsed since started typing
    time.innerText = elapsedTime;

    htmlMistakes.innerText = mistakes;

    calculateStatistics(elapsedTime)

    htmlSpeed.innerText = speed;
    htmlRawSpeed.innerText = rawSpeed;
    htmlAccuracy.innerText = accuracy;

    await new Promise((resolve, reject) => {
      setTimeout(()=>{resolve()}, 100)
    })

    if (letterIndex >= quoteLength) {
      break;
    }

    elapsedTime = calculateElapsedTime();
  } while (elapsedTime <= 120);
  // 120 = time limit

  // if user did not finish the quote
  // disable input
  // clear input
  // remove indicator manually
  // update user quote to show removed indicator 
  if (letterIndex < lettersOfQuote.length - 1) {
    // setting letterIndex as if user finished quote
    letterIndex = lettersOfQuote.length;

    input.disabled = true;
    input.value = "";
    // remove indicator 
    userLetters[letterIndex] = lettersOfQuote[letterIndex];
    displayUserQuote()
  }

  console.log("Finished")
}


// pressed key
input.addEventListener("keydown", (e) => {

  if (startTime == null) {
    startTime = performance.now();
    displayStatistics()
  }

  console.log(e.key)
  const quoteLetter = lettersOfQuote[letterIndex];

  if (e.key == "Escape" || e.key == "Meta" || e.key == "Control" || e.key == "Shift" || e.key == "Tab" || e.key == "Alt" ||
    e.key == "ArrowUp" || e.key == "ArrowLeft" || e.key == "ArrowDown" || e.key == "ArrowRight") {
    return; 
  }

  // ctrl + a = select all
  if (e.metaKey && e.key == "a") {
    return;
  }

  if (e.key == "Backspace") {
    // selectionis always left to right
    if (wordIndex > 0) {
      if (input.selectionStart == 0 && input.selectionEnd > 0 && input.selectionEnd == wordIndex) {
        // obscuring every letter of the current word typed
        while (wordIndex > 0) {
          backspace(quoteLetter)
        }
      } else {
        // normal backspace
        backspace(quoteLetter)
      }

      updateIndicator()
      displayUserQuote()
    }
  } else {
    attemptedLetters += 1;
    if (e.key == " " || quoteLetter == " ") {
      if (wordIndex != 0) {
        // skip word but mark skipped letters as wrong
        while (lettersOfQuote[letterIndex] != " ") {
          markLetterWrong()
          wordIndex += 1;
          letterIndex+=1;
          attemptedLetters += 1;
        }

        wordsCompleted += ((((wordIndex - wordMistakes) * 100) / wordIndex)/100);
        // have to make -1 because later in the code wordIndex is +=1 
        // thus when new word occurs it will be 0 instead of 1 (with wordIndex = 0)
        wordIndex = -1;
        rawWordsCompleted += 1;
        wordMistakes = 0;
        clearInput(e)
      } else {
        // don't do anything
        clearInput(e)
        return;
      }
    }


    // letter (, . etc too) pressed
    // check if current letter == user inputted letter
    if (quoteLetter == e.key) {
      // is equal (right)
      // make letter right 
      userLetters[letterIndex] = e.key;
    } else {
      // is not equal (wrong)
      markLetterWrong()
    }
    letterIndex += 1;
    wordIndex += 1;
    updateIndicator()
    displayUserQuote()


    // finished quote
    if (letterIndex >= quoteLength) {
      // run statistics one last time
      displayStatistics()
      input.disabled = true;
      clearInput(e)
    }

    displayDebug()
  }
})


// on load focus on input
input.focus()