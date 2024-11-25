class Indicator {
  constructor() {
    State.indicator = this;
    this.container = document.createElement("span");
    this.container.id = "indicatorContainer";
    this.elementChild = document.createElement("span");
    this.elementChild.id = "indicator";
    this.container.appendChild(this.elementChild)
  }

  addToQuote() {
    // this.elementChild.innerText = State.quote.letters[0];
    // State.ui.Equote.appendChild(this.container)
    State.input.letters[0].classList.add("indicator")
  }

  // depending on the situation might just create a forward() and backward() and return the modified index
  // forward() returns index + 1 
  move() {
    const index = State.input.index;
    // " " appended to end of quote but -1 on length property hence <=
    if (index <= State.quote.length) {
      // let beforeElement = State.ui.Equote.children[index+1];
      // State.ui.Equote.insertBefore(this.container, beforeElement)
      State.input.letters[index].classList.remove("obscure")
      State.input.letters[index].classList.remove("correct")
      State.input.letters[index].classList.remove("wrong")
      State.input.letters[index].classList.add("indicator")
    }
  }

  // remove indicator 
  remove() {
    State.input.letters[State.input.index] = State.quote.letters[State.input.index];
  }
}