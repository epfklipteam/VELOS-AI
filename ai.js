const fs = require("fs");
const readline = require("readline");

// -------------------------
// Load Training Data
// -------------------------

// Load the Q&A dataset from qa.json
let qaDataset = [];
try {
  const qaData = fs.readFileSync("qa.json", "utf8");
  qaDataset = JSON.parse(qaData);
  console.log("Q&A dataset loaded from qa.json.");
} catch (err) {
  console.error("Could not read qa.json. Make sure the file exists in the repository.");
}

// Load extra training data from text.txt
let extraTrainingData = "";
try {
  extraTrainingData = fs.readFileSync("text.txt", "utf8");
  console.log("Extra training data loaded from text.txt.");
} catch (err) {
  console.error("Could not read text.txt. Continuing without extra training data.");
}

// -------------------------
// Utility Functions
// -------------------------

// Returns a random key from an object
function getRandomKey(model) {
  const keys = Object.keys(model);
  return keys[Math.floor(Math.random() * keys.length)];
}

// Returns a weighted random selection from an array
function weightedRandom(options) {
  return options[Math.floor(Math.random() * options.length)];
}

// -------------------------
// Training Functions
// -------------------------

/*
  Splits provided texts into sentences using punctuation as delimiters.
  Only sentences that have at least `minWordCount` words are returned.
*/
function collectSentences(texts, minWordCount = 8) {
  const sentences = [];
  texts.forEach(text => {
    const parts = text.split(/[.!?]\s*/);
    parts.forEach(part => {
      const trimmed = part.trim();
      if (trimmed.split(/\s+/).length >= minWordCount) {
        sentences.push(trimmed);
      }
    });
  });
  return sentences;
}

/*
  Creates a Markov chain model from an array of sentences.
  Each word (converted to lowercase) is a key whose value is an array of words that follow it.
*/
function createMarkovModel(sentences) {
  const model = {};
  sentences.forEach(sentence => {
    const words = sentence.split(/\s+/);
    for (let i = 0; i < words.length - 1; i++) {
      const word = words[i].toLowerCase();
      const nextWord = words[i + 1].toLowerCase();
      if (!model[word]) {
        model[word] = [];
      }
      model[word].push(nextWord);
    }
  });
  return model;
}

// -------------------------
// Response Generation
// -------------------------

/*
  generateResponse()
  - Combines training texts from the Q&A dataset (from qa.json) and extra training data (from text.txt).
  - Builds a Markov chain model from these texts.
  - Generates a response of up to 100 words by iteratively predicting the next word.
  - The user's question is only used internally for context and is not echoed in the final output.
*/
function generateResponse(userQuestion) {
  const maxWords = 100;
  const minResponseWords = 10;
  
  // Combine training texts: answers from qaDataset and extra training data
  let trainingTexts = qaDataset.map(pair => pair.answer);
  if (extraTrainingData) {
    trainingTexts.push(extraTrainingData);
  }
  
  const sentences = collectSentences(trainingTexts, 8);
  const model = createMarkovModel(sentences);
  
  if (Object.keys(model).length === 0) {
    return "VELOS: I don't have enough data to generate a response.";
  }
  
  // Select a random seed word from the model (do not echo the user's question)
  let currentWord = getRandomKey(model);
  const responseWords = [currentWord];
  
  for (let i = responseWords.length; i < maxWords; i++) {
    if (!model[currentWord] || model[currentWord].length === 0) break;
    const nextWord = weightedRandom(model[currentWord]);
    responseWords.push(nextWord);
    currentWord = nextWord;
    // If a word ends with punctuation and we've reached a minimum length, stop generation
    if (/[.!?]$/.test(nextWord) && responseWords.length >= minResponseWords) break;
  }
  
  let response = responseWords.join(" ");
  response = response.charAt(0).toUpperCase() + response.slice(1);
  if (!/[.!?]\s*$/.test(response)) {
    response += ".";
  }
  return `VELOS: ${response}`;
}

// -------------------------
// Interactive Command-Line Interface
// -------------------------

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(`
  ███    ██ ███████ ██      ██████   ██████  
  ████   ██ ██      ██      ██   ██ ██       
  ██ ██  ██ █████   ██      ██████  ██   ███ 
  ██  ██ ██ ██      ██      ██   ██ ██    ██ 
  ██   ████ ███████ ███████ ██   ██  ██████  

  VELOS AI (Version 0.5) - Programmed by DOSaAI
  Open-Source AI Model - Ready to Assist You
  ------------------------------------------------
`);

console.log("Ask a question (or type 'exit' to quit):");
rl.prompt();

rl.on("line", (input) => {
  const trimmed = input.trim();
  if (trimmed.toLowerCase() === "exit" || trimmed.toLowerCase() === "/exit") {
    rl.close();
    return;
  }
  console.log(generateResponse(trimmed));
  console.log();
  rl.prompt();
});
