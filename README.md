# Typing Practice
### Bugs
- Speed is null when starting to type for ~1 second then back to normal
- Paragraph text overflows when you start typing.
= remains that way on new quotes... 
- maybe instead of State.input.letters.join("") every key press store an object reference 
to the element and modify its classes (may run into issue with updating indicator)
as the issue we have is every time we use innerHTML it messes up the rendering

### TODO
- add status bar above the quote (shows statistics quickly)
- if input disabled change its color
- Prevent any key from starting quote sequence... (exmaple I can press alt and it starts)
- Add history
- Different type of quote categories
- Cache system to save history
- Maybe save finishedTime and call calculate() based on that when quote is finished?
- Add statistics page (shows graphs, history, etc.)
#### For Fun
- Add scorestreaks
- Add sound effects (i.e. when spacing on new word without typing, error, etc...)

### Learned
- e.preventDefault() stops letter from being placed 