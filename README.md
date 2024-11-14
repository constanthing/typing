# Typing Practice
### Bugs
- Not counting spaces as errors
1. Type a word out all the way before the space
2. On space, type a letter instead
3. Error occurs but doesn't show
- Some quote when pressing space in the beginning renders wrong letters in incorrect places
1. Reload until you get quote that starts with "You will face many defeats in life...."
2. Press space
- Speed is null when starting to type for ~1 second then back to normal
### TODO
- Track accuracy
- Calculate WPM
- Location in quote indicator 
- Prevent input after completed quote
- Stop calculating speed after completed quote
- CTRL+A select all and deleting not updating letterIndex properly
- Start tracking time when user types not before
- Calculate speed even when not typing
- BUG REPORT: show wrong and correct
#### For Fun
- Add scorestreaks
- Add sound effects (i.e. when spacing on new word without typing, error, etc...)

### Learned
- e.preventDefault() stops letter from being placed 