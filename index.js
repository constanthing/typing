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

// getting random quote from quotes
let quote = quotes[parseInt(Math.random() * quotes.length-1)];

// extracting author from quote
const author = quote["author"];

const htmlQuote = document.querySelector("#quote p");
// setting html quote to randomly selected quote
htmlQuote.innerText = quote['quote'];

// splitting quote into words
quote = quote['quote']

let displayLetters = []
for (let w of quote) {
    for (let l of w) {
        displayLetters.push(l)
    }
}
let displayIndex = 0;




quote = quote .split(" ")


const userInput = document.querySelector("#userInput p");


const input = document.querySelector("input");
input.focus()
let inputted = [];

let wordIndex = 0;
let letterIndex = 0;
let word = quote[wordIndex];


let wrongs = 0;
let rights = 0;

let startTime = null;

const debug = document.querySelector("#debug");

const speed = document.querySelector("#speed");

const time = document.querySelector("#time");
async function startCount() {
  while (true) {
    const elapsedTime = (performance.now() - startTime) / 1000;
    console.log(rights)
    speed.innerText = parseInt(rights / (elapsedTime/60));
    time.innerText = parseInt((performance.now() - startTime) / 1000);
    await new Promise((resolve, reject) => {
      setTimeout(()=>{
        resolve()
      }, 1000)
    })
  }
}

let wordRight = 0;

input.addEventListener("keydown", (e)=>{
  if (startTime == null) {
    startTime = performance.now();
    startCount()
  }
    // e.code ignores keyboard layout which can lead to issues
    // e.key is better

    if (e.key == "Shift" || e.key == "Meta") {
        // do nothing
    } else if (e.key == "Backspace") {
        // do not want to let user to backspace into previous word
        // keeps them in the same word
        if (letterIndex != 0) {
            inputted.pop()
            letterIndex -= 1;
            displayIndex -= 1;
        }
    } else if (e.key == " " || letterIndex == word.length) {
        // currently not counting spaces as wrong too (might cause issues)


        // check if word is completed
        // if not red the letters that are wrong
        if (letterIndex != word.length) {
          while (letterIndex < word.length) {
            const wrong = "<span class=wrong>" + word[letterIndex] + "</span>";
            inputted.push(wrong)
            letterIndex += 1;
            wrongs+=1;
          }
        }

        inputted.push(" ")

        const t = parseInt((((wordRight * 100)/word.length)/100));
        console.log(t)
        rights += t;
        wordRight = 0;
        letterIndex = 0;
        wordIndex += 1;
        displayIndex += 1;
        word = quote[wordIndex]
        e.preventDefault()
        input.value = "";
    } else {
        if (e.key != word[letterIndex]) {
            // don't display the inputted
            const wrong = "<span class=wrong>" + word[letterIndex] + "</span>";
            inputted.push(wrong)
            wrongs+=1;
        } else {
            inputted.push(e.key)
            wordRight += 1;
        }
        displayIndex += 1;
        letterIndex += 1;
    }

    debug.innerText = `
    Letter index: ${letterIndex} \n
    Word: ${word} \n
    Display index: ${displayIndex} \n
    Display letter: ${displayLetters[displayIndex]} \n
    Wrongs: ${wrongs} \n
    Rights: ${rights} \n
    `;

    userInput.innerHTML = inputted.join("")
})

// if wrong letter
// -> don't display user input
// -> opacity 100% quote letter
// -> make quote letter red