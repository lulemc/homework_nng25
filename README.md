# 🧠 JSON-Driven API Execution System

This project is a web-based system that lets users send JSON-configured API requests and receive asynchronous responses from backend services like math, user lookup, or image tools. The app features a dynamic UI, backend service dispatcher, and Highlight.js-powered response display.

---

## 📁 Folder Structure

```
project-root/
├── backend/
│   ├── apis/               # Contains service logic for image, math, and user APIs
│   │   ├── imageService.js
│   │   ├── mathService.js
│   │   └── userService.js
│   ├── dispatcher.js       # Central logic to route and execute API calls
│   ├── logger.js           # Timestamped backend logger
│   └── users.json          # Sample user data
│
├── frontend/
│   ├── index.html          # Frontend UI with JSON input and display
│   ├── main.js             # Handles UI logic and sends requests to backend
│   └── style.css           # Light/dark theme and layout styling
│
├── public/                 # Public static folder (images, etc.)
│
├── testAPI.json            # Example JSON calls for testing
├── server.js               # Express server entry point
├── package.json            # Project dependencies and scripts
├── .gitignore
└── HomeWorkFrontEnd.docx.pdf
```

---

## 🚀 Features

- 📦 Dynamic API dispatcher using structured JSON
- ⚙️ Modular services (math, image, user)
- 🎨 Theme switcher (light/dark mode)
- 💡 Syntax-highlighted responses with Highlight.js
- 🖼️ Inline result rendering (e.g., user cards or images)

---

## 🔧 Setup & Run

### Prerequisites

- Node.js (v14+)
- npm

### Installation

```bash
git clone https://github.com/your-username/json-api-dispatcher.git
cd json-api-dispatcher
npm install
```

### Run the Server

```bash
node server.js
```

### Open the App

Visit: [http://localhost:3000](http://localhost:3000)

---

## 📄 Example Input (`testAPI.json`)

```json
{
  "service": "mathService",
  "method": "getFibonacci",
  "params": 10
}
```

---

## ✨ Optional Improvements

- 🧮 Auto-generate parameter input forms based on selected API
- 🧪 Add test coverage for dispatcher and services
- 📚 Add database support for user data
- 📦 Enable uploading images via the frontend

---

## 📜 License

This project is licensed under the MIT License.
