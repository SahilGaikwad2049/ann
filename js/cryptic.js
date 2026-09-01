   const puzzles = [

    {
        date: "2 September, 2026",

        byline: "By Sahil for Silica",

        clueWords: [
            "You",
            "left",
            "Mauritius",
            "stupidly",
            "for",
            "a",
            "dessert",
            "(8)"
        ],

        answer: "TIRAMISU",

        par: 3,

        maxAttempts: 6,

        hints: [
            {
                label: "Indicators",

                text:
                    "“left: a deletion indicator”, “stupidly: an anagram indicator”",

                color: "#C97A2B",

                words: [1,3]
            },

            {
                label: "Definition",

                text:
                    "would be “a dessert”",

                color: "#2E6F9E",

                words: [5,6]
            },

            {
                label: "Fodder",

                text:
                    "Words for the Wordplay",

                color: "#3C8C5B",

                words: [0,2]
            }

        ]

    },

    {
        date: "2 September, 2026",

        byline: "By Sahil for Silica",

        clueWords: [
            "“Jump",
            "up,",
            "Hurry",
            "up!”",
            "initially",
            "yelled",
            "by",
            "a",
            "female",
            "dog",
            "for",
            "a",
            "spot",
            "(4,5)"
        ],

        answer: "JUHUBEACH",

        par: 3,

        maxAttempts: 6,

        hints: [
            {
                label: "Indicators",

                text:
                    "“initially: a position indicator”, “yelled: a homophone indicator”",

                color: "#C97A2B",

                words: [4,5]
            },

            {
                label: "Definition",

                text:
                    "would be some kind of “a spot”",

                color: "#2E6F9E",

                words: [11,12]
            },

            {
                label: "Fodder",

                text:
                    "Words for the Wordplay",

                color: "#3C8C5B",

                words: [0,1,2,3,7,8,9]
            }

        ]

    },

    {
        date: "2 September, 2026",

        byline: "By Sahil for Silica",

        clueWords: [
            "At",
            "sea,",
            "under",
            "shore,",
            "off",
            "east,",
            "around",
            "nothing",
            "is",
            "frightening",
            "(10)"
        ],

        answer: "HORRENDOUS",

        par: 3,

        maxAttempts: 6,

        hints: [
            {
                label: "Indicators",

                text:
                    "“around: a containment indicator”, “at sea: an anagram indicator”, “off: a deletion indicator”",
                    
                color: "#C97A2B",

                words: [0,1,4,6]
            },

            {
                label: "Definition",

                text:
                    "another word for “frightening”",

                color: "#2E6F9E",

                words: [9]
            },

            {
                label: "Fodder",

                text:
                    "Words for the Wordplay",

                color: "#3C8C5B",

                words: [2,3,5,7]
            }
        ]
    }
];

let currentPuzzleIndex = 0;

let puzzle = puzzles[currentPuzzleIndex];

let currentGuess = "";

let attemptsUsed = 0;

let hintsRevealed = 0;

let solved = false;

const headerDateEl =
    document.getElementById("headerDate");

const headerBylineEl =
    document.getElementById("headerByline");

const clueTextEl =
    document.getElementById("clueText");

const tilesRowEl =
    document.getElementById("tilesRow");

const hintPanelEl =
    document.getElementById("hintPanel");

const hintButton =
    document.getElementById("hintButton");

const checkButton =
    document.getElementById("checkButton");

const nextButton =
    document.getElementById("nextButton");

const resultMsgEl =
    document.getElementById("resultMsg");

const keyboardEl =
    document.getElementById("keyboard");

function hexToRgba(hex, alpha) {

    const clean = hex.replace("#", "");

    const bigint = parseInt(clean, 16);

    const r = (bigint >> 16) & 255;

    const g = (bigint >> 8) & 255;

    const b = bigint & 255;

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;

}

function loadPuzzle(index) {

    currentPuzzleIndex = index;

    puzzle = puzzles[currentPuzzleIndex];

    currentGuess = "";

    attemptsUsed = 0;

    hintsRevealed = 0;

    solved = false;

    headerDateEl.textContent =
        puzzle.date;

    headerBylineEl.textContent =
        puzzle.byline;


    resultMsgEl.textContent = "";

    resultMsgEl.className = "result-msg";


    hintPanelEl.innerHTML = "";

    hintPanelEl.classList.add("hidden");


    hintButton.disabled = false;

    nextButton.classList.add("hidden");

    nextButton.textContent = "Next clue →";

    renderClue();

    renderTiles();

    updateHintButton();

}


/* ===================================================
   RENDER CLUE
   =================================================== */

function renderClue() {

    clueTextEl.innerHTML = "";


    puzzle.clueWords.forEach((word, index) => {

        const span =
            document.createElement("span");


        span.className = "clue-word";

        span.dataset.index = index;

        span.textContent = word;


        clueTextEl.appendChild(span);


        if (
            index <
            puzzle.clueWords.length - 1
        ) {

            clueTextEl.appendChild(
                document.createTextNode(" ")
            );

        }

    });

}


/* ===================================================
   RENDER TILES
   =================================================== */

function renderTiles() {

    tilesRowEl.innerHTML = "";


    for (
        let i = 0;
        i < puzzle.answer.length;
        i++
    ) {

        const tile =
            document.createElement("div");


        tile.className = "tile";

        tile.dataset.index = i;


        tilesRowEl.appendChild(tile);

    }


    updateTiles();

}


/* ===================================================
   UPDATE TILES
   =================================================== */

function updateTiles() {

    const tiles =
        tilesRowEl.querySelectorAll(".tile");


    tiles.forEach((tile, i) => {

        const letter =
            currentGuess[i] || "";


        tile.textContent = letter;


        tile.classList.toggle(
            "filled",
            letter !== ""
        );


        tile.classList.toggle(
            "active",
            i === currentGuess.length &&
            !solved
        );


        tile.classList.remove(
            "correct",
            "wrong"
        );

    });

}


/* ===================================================
   RENDER ATTEMPT DOTS
   =================================================== */

function renderDots() {

    /*
     * Your current HTML doesn't contain dotsRow,
     * so this function is kept out of the UI for now.
     *
     * If you add the tracker back later, we can
     * restore this easily.
     */

}


/* ===================================================
   HIGHLIGHT CLUE WORDS
   =================================================== */

function highlightWords(indices, color) {

    indices.forEach((i) => {

        const span =
            clueTextEl.querySelector(
                `.clue-word[data-index="${i}"]`
            );


        if (!span) return;


        span.classList.add("highlighted");


        span.style.backgroundColor =
            hexToRgba(color, 0.28);


        span.style.color = color;

    });

}


/* ===================================================
   REVEAL NEXT HINT
   =================================================== */

function revealNextHint() {

    if (
        hintsRevealed >=
        puzzle.hints.length
    ) {
        return;
    }


    const hint =
        puzzle.hints[hintsRevealed];


    hintPanelEl.classList.remove("hidden");


    const item =
        document.createElement("div");


    item.className = "hint-item";


    item.style.borderLeftColor =
        hint.color;


    const label =
        document.createElement("span");


    label.className = "hint-label";

    label.style.color = hint.color;

    label.textContent = hint.label;


    const text =
        document.createElement("span");


    text.textContent = hint.text;


    item.appendChild(label);

    item.appendChild(text);


    hintPanelEl.appendChild(item);


    highlightWords(
        hint.words,
        hint.color
    );


    hintsRevealed++;


    updateHintButton();

}


/* ===================================================
   UPDATE HINT BUTTON
   =================================================== */

function updateHintButton() {

    if (hintsRevealed === 0) {

        hintButton.textContent =
            "hints";

    }

    else if (
        hintsRevealed <
        puzzle.hints.length
    ) {

        hintButton.textContent =
            `hints (${hintsRevealed}/${puzzle.hints.length})`;

    }

    else {

        hintButton.textContent =
            "no more hints";

        hintButton.disabled = true;

    }

}


/* ===================================================
   REVEAL ALL HINTS
   =================================================== */

function revealAllHints() {

    while (
        hintsRevealed <
        puzzle.hints.length
    ) {

        revealNextHint();

    }

}


/* ===================================================
   TYPE LETTER
   =================================================== */

function typeLetter(letter) {

    if (solved) return;


    if (
        currentGuess.length >=
        puzzle.answer.length
    ) {
        return;
    }


    currentGuess += letter;


    updateTiles();

}


/* ===================================================
   BACKSPACE
   =================================================== */

function backspace() {

    if (solved) return;


    currentGuess =
        currentGuess.slice(0, -1);


    updateTiles();

}


/* ===================================================
   SUBMIT GUESS
   =================================================== */

function submitGuess() {

    if (solved) return;


    /* Not enough letters */

    if (
        currentGuess.length <
        puzzle.answer.length
    ) {

        resultMsgEl.textContent =
            "Fill in every tile first.";

        resultMsgEl.className =
            "result-msg wrong";

        return;

    }


    const tiles =
        tilesRowEl.querySelectorAll(".tile");


    /* =================================================
       CORRECT
       ================================================= */

    if (
        currentGuess.toUpperCase() ===
        puzzle.answer.toUpperCase()
    ) {

        solved = true;


        tiles.forEach((tile) => {

            tile.classList.add("correct");

        });


        // resultMsgEl.textContent =
        //     "✓ Correct!";


        resultMsgEl.className =
            "result-msg correct";


        /*
         * Reveal hints after solving.
         */

        revealAllHints();


        /*
         * Show Next clue button
         */

        if (
            currentPuzzleIndex <
            puzzles.length - 1
        ) {

            nextButton.classList.remove(
                "hidden"
            );

        }

        else {

            nextButton.textContent =
                "I MISS YOU :/";

            nextButton.classList.remove(
                "hidden"
            );

        }

    }


    /* =================================================
       WRONG
       ================================================= */

    else {

        tiles.forEach((tile) => {

            tile.classList.add("wrong");

        });


        attemptsUsed =
            Math.min(
                attemptsUsed + 1,
                puzzle.maxAttempts
            );


        resultMsgEl.textContent =
            "Not quite — try again.";


        resultMsgEl.className =
            "result-msg wrong";


        /*
         * Wait a little before clearing
         * the red tiles so the user can see
         * the incorrect attempt.
         */

        setTimeout(() => {

            if (!solved) {

                currentGuess = "";

                updateTiles();

            }

        }, 300);


        /*
         * Out of attempts
         */

        if (
            attemptsUsed >=
            puzzle.maxAttempts
        ) {

            resultMsgEl.textContent =
                `Out of attempts — the answer was ${puzzle.answer}.`;


            solved = true;

        }

    }

}


/* ===================================================
   NEXT PUZZLE
   =================================================== */

   function nextPuzzle() {

    if (currentPuzzleIndex >= puzzles.length - 1) {

        window.location.href = "https://digibouquet.vercel.app/bouquet/587d14df-fadf-4908-8ddf-618593aa07f1";

        return;
    }

    loadPuzzle(currentPuzzleIndex + 1);
}


/* ===================================================
   ON-SCREEN KEYBOARD
   =================================================== */

keyboardEl.addEventListener(
    "click",
    (event) => {

        const key =
            event.target.closest(".key");


        if (!key) return;


        const value =
            key.dataset.key;


        if (value === "ENTER") {

            submitGuess();

        }

        else if (value === "BACK") {

            backspace();

        }

        else {

            typeLetter(value);

        }

    }
);


/* ===================================================
   PHYSICAL KEYBOARD
   =================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            /^[a-zA-Z]$/.test(event.key)
        ) {

            typeLetter(
                event.key.toUpperCase()
            );

        }

        else if (
            event.key === "Backspace"
        ) {

            backspace();

        }

        else if (
            event.key === "Enter"
        ) {

            submitGuess();

        }

    }
);


/* ===================================================
   BUTTON EVENTS
   =================================================== */

hintButton.addEventListener(
    "click",
    revealNextHint
);


checkButton.addEventListener(
    "click",
    submitGuess
);


nextButton.addEventListener(
    "click",
    nextPuzzle
);


/* ===================================================
   INITIALIZE
   =================================================== */

loadPuzzle(0);