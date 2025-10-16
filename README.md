# AI Content Moderation System

This project is a web-based demonstration of an AI-powered content moderation system. It uses the Google Gemini API to analyze user-submitted messages in real-time and flags potentially offensive content. The primary use case is for applications like live stream donations, where messages are displayed publicly and need to be screened.

---

## Features

- **Real-time Analysis:** Messages are sent to the backend and analyzed by the Gemini API instantly.
- **Granular Moderation:** The AI returns a detailed JSON object with a clear action (`allow`, `block`, `replace`, `review`).
- **Toxicity Scoring:** Provides a numerical `toxicity_score` (0.0-1.0) for nuanced understanding.
- **Categorization:** Breaks down the analysis into scores for specific categories like `insult`, `hate`, `sexual`, `threat`, and `spam`.
- **Contextual Reasoning:** Includes a `reason` field explaining *why* a decision was made, including context for cultural or linguistic nuances.
- **Text Normalization:** Provides a `normalized_text` version of the user's message.
- **Confidence Score:** Indicates the AI's confidence level in its own analysis.

---

## Tech Stack

- **Backend:**

  - [ElysiaJS](https://elysiajs.com/): A fast, ergonomic, and type-safe backend framework for Bun.
  - [Google Gemini API](https://ai.google.dev/): Used for the core content analysis.
  - Runtime: [Bun](https://bun.sh/)

- **Frontend:**
  - [React](https://react.dev/): A JavaScript library for building user interfaces.
  - [Vite](https://vitejs.dev/): A blazing-fast frontend build tool.
  - [TailwindCSS](https://tailwindcss.com/): A utility-first CSS framework for styling.
  - [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript.

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- [Bun](https://bun.sh/docs/installation) installed on your machine.
- A Google Gemini API Key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/AdityaZxxx/ai-moderation-system.git
    cd ai-moderation-system
    ```

2.  **Setup the Backend:**

    - Navigate to the backend directory:
      ```bash
      cd backend
      ```
    - Install dependencies:
      ```bash
      bun install
      ```
    - Create your environment file by copying the example:
      ```bash
      cp .env.example .env
      ```
    - Open the `.env` file and add your Gemini API key:
      ```env
      GEMINI_API_KEY="YOUR_API_KEY_HERE"
      ```

3.  **Setup the Frontend:**
    - Navigate to the frontend directory from the root folder:
      ```bash
      cd frontend
      ```
    - Install dependencies:
      ```bash
      bun install
      ```

### Running the Application

You will need two separate terminals to run both the backend and frontend servers.

- **Terminal 1: Start the Backend**

  ```bash
  # In the /backend directory
  bun run dev
  ```

  _The backend server will be running at `http://localhost:3000`._

- **Terminal 2: Start the Frontend**
  ```bash
  # In the /frontend directory
  bun run dev
  ```
  _The frontend development server will be running at `http://localhost:5173` (or another port if 5173 is busy)._

4.  **Open the App:**
    Open your browser and navigate to `http://localhost:5173`.

---

## API Response Structure

The backend `/moderate` endpoint returns a JSON object with the following detailed structure:

```json
{
  "allowed": false,
  "action_reason": "block",
  "reason": "The word 'bego' is a common curse word in Indonesian that means 'stupid'.",
  "toxicity_score": 0.95,
  "categories": {
    "insult": 0.95,
    "hate": 0.0,
    "sexual": 0.0,
    "threat": 0.0,
    "spam": 0.01
  },
  "bad_words": [
    "bego"
  ],
  "normalized_text": "dasar bego lu",
  "suggested_replacement": "",
  "confidence": 0.92
}
```
