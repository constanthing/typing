class Quote {
    // ’
    static quotes = [
        {
            "quote": "Success is not final, failure is not fatal: it is the courage to continue that counts.",
            "origin": "Speech during WWII",
            "type": "Quote",
            "category": "Motivation",
            "author": "Winston Churchill"
        },
        {
            "quote": "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
            "type": "Quote",
            "category": "Motivation",
            "origin": "Stanford Commencement Address, 2005",
            "author": "Steve Jobs"
        },
        {
            "quote": "Don't watch the clock; do what it does. Keep going.",
            "origin": "Inspirational Saying",
            "type": "Quote",
            "category": "Motivation",
            "author": "Sam Levenson"
        },
        {
            "quote": "Hardships often prepare ordinary people for an extraordinary destiny.",
            "type": "Quote",
            "category": "Motivation",
            "origin": "The Problem of Pain",
            "author": "C.S. Lewis"
        },
        {
            "quote": "Believe you can and you're halfway there.",
            "type": "Quote",
            "category": "Motivation",
            "origin": "Campaign Speech, 1910",
            "author": "Theodore Roosevelt"
        },
        {
            "quote": "I have not failed. I've just found 10,000 ways that won't work. Each step, though painful, has been necessary for success.",
            "type": "Quote",
            "category": "Motivation",
            "origin": "Attributed Response on Failure",
            "author": "Thomas Edison"
        },
        {
            "type": "Quote",
            "category": "Motivation",
            "quote": "You miss 100% of the shots you don't take. Take the risk, or lose the chance forever.",
            "origin": "Hockey Wisdom",
            "author": "Wayne Gretzky"
        },
        {
            "quote": "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
            "type": "Quote",
            "category": "Motivation",
            "origin": "Inspirational Writings",
            "author": "Ralph Waldo Emerson"
        },
        {
            "type": "Quote",
            "category": "Motivation",
            "quote": "The only limit to our realization of tomorrow will be our doubts of today. Let us move forward with strong and active faith.",
            "origin": "Final Address to the Nation, 1945",
            "author": "Franklin D. Roosevelt"
        },
        {
            "type": "Quote",
            "category": "Motivation",
            "quote": "Act as if what you do makes a difference. It does.",
            "origin": "Inspirational Thought",
            "author": "William James"
        },
        {
            "type": "Quote",
            "category": "Motivation",
            "quote": "In the middle of every difficulty lies opportunity. Seek it out, and you'll turn challenges into victories.",
            "origin": "Personal Reflections",
            "author": "Albert Einstein"
        },
        {
            "type": "Quote",
            "category": "Motivation",
            "quote": "It does not matter how slowly you go as long as you do not stop.",
            "origin": "The Analects",
            "author": "Confucius"
        },
        {
            "type": "Quote",
            "category": "Motivation",
            "quote": "Whether you think you can, or you think you can't – you're right.",
            "origin": "Inspirational Thought",
            "author": "Henry Ford"
        },
        {
            "type": "Quote",
            "category": "Motivation",

            "quote": "The best way to predict the future is to invent it. By shaping the present, you mold what lies ahead.",
            "origin": "Inspirational Writings",
            "author": "Alan Kay"
        },
        {
            "quote": "Opportunities don't happen. You create them. Build your doors and knock on them boldly.",
            "origin": "Inspirational Talks", "type": "Quote",
            "category": "Motivation",

            "author": "Chris Grosser"
        },
        {
            "quote": "Strive not to be a success, but rather to be of value. Your contributions will echo longer than your achievements.",
            "origin": "Speech to Students", "type": "Quote",
            "category": "Motivation",

            "author": "Albert Einstein"
        },
        {
            "quote": "Do what you can, with what you have, where you are. Your small steps build bridges to greatness.",
            "origin": "Campaign Wisdom", "type": "Quote",
            "category": "Motivation",

            "author": "Theodore Roosevelt"
        },
        {
            "quote": "The harder you work for something, the greater you'll feel when you achieve it. It's the effort that makes the victory sweet.",
            "origin": "Motivational Talks", "type": "Quote",
            "category": "Motivation",

            "author": "Anonymous"
        },
        {
            "quote": "Keep your face always toward the sunshine—and shadows will fall behind you.",
            "origin": "Inspirational Writings", "type": "Quote",
            "category": "Motivation",

            "author": "Walt Whitman"
        },
        {
            "quote": "Success is stumbling from failure to failure with no loss of enthusiasm. It's the grit and resilience that define true success.",
            "origin": "Motivational Reflections", "type": "Quote",
            "category": "Motivation",

            "author": "Winston Churchill"
        }
    ];

    constructor() {
        State.quote = this;
        // index used to get random quote
        this.index = null;
        this.origin = null;
        this.author = null;
        this.quote = null;
        this.length = null;
        this.category = null;
        this.type = null;
        this.letters = [];
        this.quote = this.getRandom();
        this.breakDownQuote()
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

    getRandom() {
        const random = Math.round(Math.random() * (Quote.quotes.length - 1));
        this.index = random;
        return Quote.quotes[random];
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
        this.author = this.quote.author;
         this.type = this.quote.type;
        this.category = this.quote.category;
       this.origin = this.quote.origin;
        this.quote = this.quote.quote;
        this.#getLetters()
        // we don't want to count the manually added " " (so -1)
        this.length = this.quote.length - 1;
    }
}