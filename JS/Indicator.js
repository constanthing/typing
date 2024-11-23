class Indicator {
  constructor() {
    State.indicator = this;
  }

  #getFormat(index) {
    return `<span id="indicatorContainer"><span id="indicator"></span>${State.quote.letters[index]}</span>`;
  }

  // depending on the situation might just create a forward() and backward() and return the modified index
  // forward() returns index + 1 
  move() {
    const index = State.input.index;
    if (index <= State.quote.length) {
      State.input.letters[index] = this.#getFormat(index);
    }
  }

  // remove indicator 
  remove() {
    State.input.letters[State.input.index] = State.quote.letters[State.input.index];
  }
}