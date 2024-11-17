# Typing Practice
### Bugs
- Speed is null when starting to type for ~1 second then back to normal
- Skipping last word doesn't remove indicator (stays at letter where skipped) 
= doesn't clear input either
### TODO
- Max word skips to 3 or maybe 4? Prevents user from pressing a letter and space to skip the words for faster WPM.
- Deal with ctrl+a -> random letter press... should it delete letters typed and insert pressed letter as first? idk! or should just continue off current letterIndex?
- Stop calculating speed after completed quote
- Prevent accuracy from going below 0%
- Macro for loading a different quote
#### For Fun
- Add scorestreaks
- Add sound effects (i.e. when spacing on new word without typing, error, etc...)

### Learned
- e.preventDefault() stops letter from being placed 