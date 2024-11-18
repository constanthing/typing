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