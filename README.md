
# Facebook AI Engagement Assistant

An AI-powered assistant that analyzes Facebook posts and suggests helpful, human-like comments for topics related to technology, coding, and design. This project uses Google's Gemini API for intelligent content analysis and generation, wrapped in a sleek, responsive UI built with React and Tailwind CSS.

![App Screenshot](https://storage.googleapis.com/aistudio-project-assets/project-assets/generated/0762145b-7c73-4537-8e65-d018d96078ed.png)

## ✨ Features

- **Intelligent Post Analysis**: Uses the Gemini API to determine if a post is relevant to tech, coding, or design topics.
- **Context-Aware Comment Generation**: Crafts helpful, natural-sounding comments based on a summary of the user's issue.
- **User-in-the-Loop Design**: Requires explicit user permission before generating and posting comments, ensuring the user is always in control.
- **Stateful UI**: Clearly communicates the current status, whether it's connecting, analyzing, awaiting permission, or generating a comment.
- **Regenerate Suggestions**: Allows users to request a new comment if the first suggestion isn't perfect.
- **Error & Edge Case Handling**: Gracefully manages API errors and posts that are not relevant to the assistant's expertise.
- **Modern Tech Stack**: Built with React, TypeScript, and Tailwind CSS for a robust and maintainable codebase.

## 🚀 How It Works

The application follows a simple yet powerful workflow:

1.  **Connect**: The user clicks a button to simulate connecting to their Facebook account.
2.  **Fetch & Analyze**: The app fetches a mock Facebook post and sends its content to a Gemini model. The model is prompted to analyze the post and return a structured JSON object indicating its relevance, topic, and a concise summary.
3.  **Request Permission**:
    - If the post is deemed relevant, the app displays the identified topic and asks for the user's permission to generate a helpful comment.
    - If the post is not relevant, the app informs the user and provides an option to start over.
4.  **Generate Comment**: Upon user approval, the app sends the post's summary to another Gemini prompt. This prompt is specifically engineered to generate a short, precise, and human-like comment that directly addresses the user's problem.
5.  **Review & Post**: The user can review the generated comment. They have the option to "Post" it (which shows a success confirmation) or "Regenerate" it for a different suggestion.

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI**: [Google Gemini API](https://ai.google.dev/) (`@google/genai`)

## ⚙️ Setup and Running the Project

To run this project locally, follow these steps:

**1. Prerequisites**
   - You need a Google Gemini API key. You can get one from [Google AI Studio](https://aistudio.google.com/).

**2. Environment Variables**
   - This project requires your Google Gemini API key to be available as an environment variable.
   - The development environment is already configured to use `process.env.API_KEY`. You just need to ensure your key is set up in your local environment or the platform where you deploy the app.

**3. Project Structure**

The codebase is organized into logical directories and components:

```
src/
├── components/         # Reusable React components
│   ├── common/         # Generic UI elements (Button, Spinner, Toast)
│   ├── FacebookPost.tsx
│   ├── GeneratedComment.tsx
│   └── PermissionRequest.tsx
├── hooks/
│   └── useAppLogic.ts  # Core application state management and logic
├── services/
│   └── geminiService.ts# Functions for interacting with the Gemini API
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
└── index.tsx           # Application entry point
```

### Key Files

- **`services/geminiService.ts`**: This file contains the core logic for interacting with the Gemini API.
  - `analyzePost()`: Sends the post content to Gemini with a prompt and a response schema to determine relevance and extract a summary.
  - `generateComment()`: Sends the summary to Gemini with a prompt designed to craft a helpful, human-like comment.

- **`hooks/useAppLogic.ts`**: A custom React hook that encapsulates all application state (using `useState`) and logic. It manages the flow between different `AppState` enums and orchestrates calls to the `geminiService`.

- **`App.tsx`**: The main component that renders the UI based on the current `appState` from the `useAppLogic` hook. It conditionally displays different components like `PermissionRequest` or `GeneratedComment`.
