# VELOS AI

**VELOS AI** is an open-source intelligent assistant built with Node.js. It leverages a Markov chain model trained on a curated Q&A dataset (stored in `qa.json`) and additional textual training data (stored in `text.txt`) to generate complex, context-aware responses. The assistant is designed to process full-length user input and generate detailed answers of up to 100 words without echoing the original question.

## Key Features

- **Open-Source and Extensible:**  
  VELOS AI is completely open-source—feel free to contribute, modify, or extend its functionality.

- **Markov Chain Based Response Generation:**  
  Uses a Markov chain model built from a Q&A dataset and additional training data to predict and generate natural language responses.

- **Flexible Training Data:**  
  The repository includes a Q&A dataset in `qa.json` and a large corpus of extra training data in `text.txt`. Together, these files help the model generate richer, more meaningful responses.

- **Command-Line Interface:**  
  Interact with VELOS AI via an interactive CLI. Simply run the application and type your questions to receive detailed responses.

- **No Echoing of User Input:**  
  The assistant processes the full user question internally but only outputs the generated response, ensuring a clean and professional interaction.

## Files in the Repository

- **ai.js:**  
  The main application file. It loads the Q&A dataset from `qa.json` and the extra training data from `text.txt`, builds the Markov chain model, and generates responses.

- **qa.json:**  
  A JSON file containing a curated list of Q&A pairs. This dataset forms the core of the assistant's knowledge base.

- **text.txt:**  
  A text file containing additional training data. This file is used to enrich the language model, allowing VELOS AI to generate more complex and context-aware responses.

- **README.md:**  
  This file. It provides an overview of the project, installation instructions, and usage details.

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/epfklipteam/VELOS-AI.git

2. **Navigate to the Repository Directory:**

   ```bash
   cd velos-ai
   ```

3. **Ensure Node.js is Installed:**  
   [Download and install Node.js](https://nodejs.org/) if you haven't already.

4. **Run the Application:**

   ```bash
   node ai.js
   ```

5. **Interact:**  
   Once the application starts, you will see a command-line prompt. Ask your questions, and VELOS AI will generate responses based on its training data.

## Future Enhancements

- **Improved Response Coherence:**  
  Ongoing improvements to the Markov chain model and training data will make VELOS AI's responses even more natural and contextually relevant.

- **Additional Data Sources:**  
  Contributions that expand the training datasets or introduce new topics are welcome.

- **Enhanced CLI Features:**  
  Future updates may include a more sophisticated user interface or even integration with web-based platforms.

## Contributing

Contributions to VELOS AI are welcome! Feel free to fork the repository, make changes, and submit pull requests. Please ensure your contributions adhere to the project's coding standards and include appropriate tests or documentation.

## License

This project is licensed under the [MIT License](LICENSE).

---

VELOS AI is developed by DOSaAI (Version 0.5). Enjoy using and enhancing this intelligent assistant!
