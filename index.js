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
const htmlQuote = document.querySelector("#quote p");
const userQuote = document.querySelector("#userInput p");
const input = document.querySelector("input");
const debug = document.querySelector("#debug");
const speed = document.querySelector("#speed span");
const rawSpeed = document.querySelector("#rawSpeed span");
const accuracy = document.querySelector("#accuracy span");
const time = document.querySelector("#time");
const words = document.querySelector("#wordsCompleted span");
const htmlMistakes = document.querySelector("#mistakes span");



// getting random quote from quotes
let quote = quotes[parseInt(Math.random() * quotes.length-1)];
// extracting author from quote
const author = quote["author"];

// setting html quote to randomly selected quote
htmlQuote.innerText = quote['quote'];

// splitting quote into words
quote = quote['quote']

// pushing all the letters in the quote into a single array
let lettersOfQuote = []
for (let w of quote) {
    for (let l of w) {
        lettersOfQuote.push(l)
    }
}
// saving quote length
const quoteLength = lettersOfQuote.length;


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
// tracks words done so far
let wordsCompleted = 0;
// tracks wrong letters
let mistakes = 0;


// create indicator
function updateIndicator() {
  // check if obscured
  if (letterIndex != quoteLength) {
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
}

function clearInput(e) {
    input.value = "";
    e.preventDefault()
}

function displayDebug() {
  words.innerText = wordsCompleted;
  htmlMistakes.innerText = mistakes;
}

// pressed key
input.addEventListener("keydown", (e) => {
  console.log(e.key)
  const quoteLetter = lettersOfQuote[letterIndex];

  if (e.key == "Meta" || e.key == "Shift" || e.key == "Control" || e.key == "Tab" || e.key == "Alt" ||
    e.key == "ArrowUp" || e.key == "ArrowLeft" || e.key == "ArrowDown" || e.key == "ArrowRight") {
    return;
  }
  if (e.key == "Backspace") {
    if (wordIndex > 0) {
      if (letterIndex >= 1) {
        userLetters[letterIndex] = `<span class="obscure">${quoteLetter}</span>`;
      }
      if (letterIndex > 0) {
        letterIndex-=1;
      }
      wordIndex -= 1;
      updateIndicator()
      displayUserQuote()
    }
  } else {
    if (e.key == " " || quoteLetter == " ") {
      if (wordIndex != 0) {
        // skip word but mark skipped letters as wrong
        while (lettersOfQuote[letterIndex] != " ") {
          console.log("running")
          markLetterWrong()
          letterIndex+=1;
        }

        // have to make -1 because later in the code wordIndex is +=1 
        // thus when new word occurs it will be 0 instead of 1 (with wordIndex = 0)
        wordIndex = -1;
        wordsCompleted += 1;
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

    if (letterIndex == quoteLength) {
      input.disabled = true;
      clearInput(e)
    }

    displayDebug()
  }
})

let displayIndex = 0;
let word = quote[wordIndex];

let whereInQuote = 0;
// wrong letters
let wrongs = 0;

// right words
let rights = 0;
// right letters in the word
let wordRight = 0;

let startTime = null;


// async function startCount() {
//   while (true) {
//     const elapsedTime = (performance.now() - startTime) / 1000;
//     rawSpeed.innerText = parseInt(wordIndex / (elapsedTime/60));
//     speed.innerText = parseInt(rights / (elapsedTime/60));
//     time.innerText = parseInt((performance.now() - startTime) / 1000);
//     // accuracy calculated using how many wrongs we got from the letters (space not taken into calculation)
//     accuracy.innerText = parseInt((((whereInQuote - wrongs) * 100))/whereInQuote)
//     // accuracy.innerText = parseInt((rights * 100) / quote.length) + "%";
//     await new Promise((resolve, reject) => {
//       setTimeout(()=>{
//         resolve()
//       }, 1000)
//     })
//   }
// }

// function updateIndicator(amount=0) {
//   if (letterIndex >= 1) {
//     // remove previous 
//     console.log("removed")
//     userLetters.splice(displayIndex + amount - 1, 1)
//   }
//   if (letterIndex == 0) {
//     userLetters.splice(displayIndex, 1)
//   }
//   if (letterIndex < word.length) {
//     userLetters.push(`<span id="indicator">${word[letterIndex]}</span>`)
//   }
// }

// userQuote.innerHTML = userLetters.join("")



// input.addEventListener("keydown", (e)=>{
//   if (startTime == null) {
//     startTime = performance.now();
//     startCount()
//   }
//     // e.code ignores keyboard layout which can lead to issues
//     // e.key is better

//     if (e.key == "Shift" || e.key == "Meta") {
//         // do nothing
//     } else if (e.key == "Backspace") {
//         // do not want to let user to backspace into previous word
//         // keeps them in the same word
//         if (letterIndex != 0) {
//             userLetters.pop()
//             letterIndex -= 1;
//             displayIndex -= 1;
//             whereInQuote -= 1;
//             updateIndicator(1)
//         }
//     } else if (e.key == " " || letterIndex == word.length) {
//         // currently not counting spaces as wrong too (might cause issues)


//         // preventing user from spacing if on first letter of word 
//         if (e.key === " " && letterIndex == 0) {
//           // do nothing
//           e.preventDefault()
//           input.value = "";
//           return;
//         }


//         // check if word is completed
//         // if not red the letters that are wrong
//         if (letterIndex != word.length) {
//           while (letterIndex < word.length) {
//             const wrong = "<span class=wrong>" + word[letterIndex] + "</span>";
//             userLetters.push(wrong)
//             letterIndex += 1;
//             wrongs+=1;
//           }
//         }

//         userLetters.push(" ")

//         // getting percentage of correctly typed word 
//         // example: Is with s being typed wrong would make t = .5
//         const t = (((wordRight * 100)/word.length)/100);
//         console.log(t)
//         rights += t;
//         wordRight = 0;
//         letterIndex = 0;
//         wordIndex += 1;
//         displayIndex += 1;
//         word = quote[wordIndex]
//         e.preventDefault()
//         input.value = "";

//         updateIndicator()

//         if (wordIndex == quote.length) {
//           input.disabled = true;
//         }
//     } else {
//         if (e.key != word[letterIndex]) {
//             // don't display the inputted
//             const wrong = "<span class=wrong>" + word[letterIndex] + "</span>";
//             userLetters.push(wrong)
//             wrongs+=1;
//             whereInQuote += 1;
//         } else {
//             // inputted.push(e.key)
//             userLetters.push(e.key)
//             wordRight += 1;
//             whereInQuote += 1;
//         }

//         if (letterIndex == word.length-1) {
//           if (wordIndex == quote.length-1) {
//             input.disabled = true;
//           }
//         }

//         displayIndex += 1;
//         letterIndex += 1;
//         updateIndicator();
//     }

//     debug.innerText = `
//     Letter index: ${letterIndex} \n
//     Word: ${word} \n
//     Display index: ${displayIndex} \n
//     Display letter: ${lettersOfQuote[displayIndex]} \n
//     Wrongs: ${wrongs} \n
//     Rights: ${rights} \n
//     `;

//     userQuote.innerHTML = userLetters.join("")
// })



// on load focus on input
input.focus()