class State {
  static ui = null;
  static quote = null;
  static time = null;
  static statistics = null;
  static input = null;
  static indicator = null;

  constructor() {
    State.start()
  }

  static start() {
    State.input.fillUserLetters()
    State.indicator.addToQuote()
    State.ui.displayQuote()

    State.input.start()
  }

  static new() {
    State.indicator.remove()
    State.time.restart()
    State.input.restart()
    State.statistics.restart()
    State.time.restart()
    State.ui.restart()

    State.quote.new()
    State.start()
  }
}

new Quote(); new Indicator(); new UI(); new Time(); new Statistics(); new Input();
let state = new State();