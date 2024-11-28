# Typing Practice
### Bugs
- Speed is null when starting to type for ~1 second then back to normal
- Paragraph text overflows when you start typing.
= remains that way on new quotes... 
- maybe instead of State.input.letters.join("") every key press store an object reference 
to the element and modify its classes (may run into issue with updating indicator)
as the issue we have is every time we use innerHTML it messes up the rendering

### TODO
#### General 
- Add settings
- Add proper nav 
- Add history
- Different type of quote categories
- Add statistics page (shows graphs, history, etc.)
#### Specific
- Add feedback on next quote arrow to indicate it's clickable
- Prevent any key from starting quote sequence... (exmaple I can press alt and it starts)

- ctrl+f does find ? prevent that? for similar macros? maybe only when typing?
#### Future
- Detect keyboard layout (and changes)
#### For Fun
- Add scorestreaks
- Add sound effects (i.e. when spacing on new word without typing, error, etc...)

### Learned
- e.preventDefault() stops letter from being placed 