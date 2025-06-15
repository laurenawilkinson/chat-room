![Banner Image](https://github.com/user-attachments/assets/9b88e757-1302-41e3-9f7b-463ac58b1d66)

# 💬 Chat Room

A WebSocket driven chat application built with Express and Vue.

<a href="https://chat-room.laurenwilkinson.co.uk">**💻 Live Demo**</a>

## 🌟 Features

- Send real-time messages to all users on the website
- Customise your username, avatar and colour - saved in local storage for your next visit
- Send emojis via emoji keyboard
- Send GIFs via custom Tenor GIF keyboard
- See indication when users are typing
- Set your activity status to "Online" or "Away"
- Quality control - profanity in messages, usernames, and GIFs is filtered
- Fully keyboard accessible
- Fully responsive for seamless use across multiple devices and screen sizes

## 🎯 Feature Roadmap

- **Direct messaging** - send private messages to users
- **Replies** - target a specific message to respond to
- **Reactions** - append an emoji to messages in the chat
- **Mentions** - tag a user in a message
- **Message functions** - edit and delete messages

## 🛠️ Tech Stack

### Server

- Node.js
- TypeScript
- Express
- ws (WebSocket library)
- Tenor API

### Client

- Vue 3
- TypeScript
- Sass (SCSS)

## 📖 Development Journey

This project is a re-creation of [Meow Meow Chat](https://github.com/laurenawilkinson/meow-meow-chat), one of my very first full-stack projects. The original was quite bare-bones and had room for improvement, so I decided to remake it years later using the skills I had developed.

### Improvements

- **JavaScript → TypeScript:** Types provide context and confidence while developing. In particular, the use of shared `Request`/`Response` types between the client and server is helpful in this project to keep the two aligned.
- **Inline Vue script → Single File Components:** SFC made logic a lot more readable as the project got more complex. The shift in development workflow helped enforce separation of concerns and keep the project more organised.
- **BEM SCSS → Scoped SCSS:** Scoped styling removes the overhead of managing the classname namespace. It also explicitly ties styles to components to keep everything encapsulated, which works well with SFC.
- **Single server file → Dedicated server architecture:** Extracting out functionality into classes helped immensely with readability and confidence in the system. Once foundational classes and response handling was implemented, adding new response types became a lot quicker and straightforward.

## 🚀 Local Setup

1. Clone the repo:
   ```
   git clone https://github.com/laurenawilkinson/chat-room.git
   ```
2. Copy `.env.example` and fill with your values
3. Install server dependencies:
   ```
   cd server && npm install
   ```
4. Install client dependencies:
   ```
   cd client && npm install
   ```
5. Start the server:
   ```
   cd server && npm run dev
   ```
6. Start the client:
   ```
   cd client && npm run dev
   ```
7. Open `http://localhost:{PORT}` in your browser
