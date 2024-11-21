class Quote {
    static quotes = [
        {
            "quote": "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
            "author": "Christian D. Larson"
        },
        {
            "quote": "Don’t let the fear of losing be greater than the excitement of winning. Fear is temporary, but growth lasts forever.",
            "author": "Robert Kiyosaki"
        },
        {
            "quote": "You are never too old to set another goal or to dream a new dream. The courage to pursue it lies within your heart.",
            "author": "C.S. Lewis"
        },
        {
            "quote": "Opportunities don't happen; you create them. Each step forward opens new doors for success and self-discovery.",
            "author": "Chris Grosser"
        },
        {
            "quote": "Success is no accident. It is hard work, perseverance, learning, studying, and sacrifice, coupled with a love for what you do.",
            "author": "Pelé"
        },
        {
            "quote": "Success isn't about how much money you make; it's about the difference you make in people's lives. When you focus on contributing, success finds you in ways you never expected.",
            "author": "Michelle Obama"
        },
        {
            "quote": "Your dreams are valid, no matter how big or small they seem. Keep your focus sharp, take consistent actions, and let each step build momentum toward greatness. Challenges will arise, but they are merely tests of your determination. Remember, persistence always triumphs over obstacles.",
            "author": "Lupita Nyong'o"
        },
        {
            "quote": "The greatest glory in living lies not in never falling, but in rising every time we fall. Mistakes are lessons in disguise, teaching us resilience and courage. Embrace the failures, for they are stepping stones to success. Strength grows in the moments when you refuse to quit despite the difficulty.",
            "author": "Nelson Mandela"
        },
        {
            "quote": "Happiness lies in the joy of achievement and the thrill of creative effort. Set your goals high, and don't stop until you get there. Each small victory is fuel for the next challenge. Your journey, not just the destination, defines the success you seek.",
            "author": "Franklin D. Roosevelt"
        },
        {
            "quote": "To be a champion, you must believe in yourself when no one else does. Visualize your goals clearly, and let that vision guide your efforts every day. Challenges may slow you down, but they can never stop you unless you let them. With faith in your abilities and relentless determination, you will achieve more than you ever imagined.",
            "author": "Muhammad Ali"
        }
    ]

    constructor() {
        State.quote = this;
        // index used to get random quote
        this.index = null;
        this.author = null;
        this.quote = null;
        this.length = null;
        this.letters = [];
        this.quote = this.getRandom();
        this.breakDownQuote()
    }

    // private method
    #getLetters() {
        for (let letter of this.quote) {
            this.letters.push(letter)
        }
        // pushing space at the end to deal with
        // users skipping the last word not 
        // working properly without significant modification to base code
        // with space don't have to change anything but -1 in if statement 
        // at the end of the input "click" event function
        this.letters.push(" ")
    }

    breakDownQuote() {
        this.author = this.quote.quote;
        this.quote = this.quote.quote;
        this.#getLetters()
        // we don't want to count the manually added " " (so -1)
        this.length = this.quote.length - 1;
    }

    new() {
        // clearning lettersOfQuote
        this.letters.length = 0;

        const oldQuoteIndex = this.index;
        let temp = null;
        // makes sure that newly generated quote isn't the same as the old one
        while (this.index == oldQuoteIndex) {
            temp = this.getRandom();
        }

        this.quote = temp;
        this.breakDownQuote()
    }

    isWrongLetter() {

    }

    getRandom() {
        const random = Math.round(Math.random() * (Quote.quotes.length - 1));
        this.index = random;
        return Quote.quotes[random];
    }
}