# Hive Application

A real-time Hive application built with ReactJS, NestJS, WebSocket, and SQLite.

## Features

-  Real-time messaging with WebSocket
-  Multiple chat rooms
-  User presence notifications
-  Typing indicators
-  Responsive UI design
-  REST API with Swagger documentation
-  SQLite database for data persistence

## Technology Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **Socket.IO** - Real-time bidirectional communication
- **TypeORM** - Database ORM
- **SQLite** - Lightweight database
- **Swagger** - API documentation

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Socket.IO Client** - WebSocket client
- **Axios** - HTTP client

## Project Structure

```
hive-app/
 backend/
    src/
       entities/          # Database entities
          room.entity.ts
          message.entity.ts
          user.entity.ts
       rooms/             # Rooms module
          dto/
          rooms.controller.ts
          rooms.service.ts
          rooms.module.ts
       messages/          # Messages module
          dto/
          messages.controller.ts
          messages.service.ts
          messages.module.ts
       chat/              # WebSocket gateway
          chat.gateway.ts
          chat.module.ts
       app.module.ts
       main.ts
    package.json
    tsconfig.json
 frontend/
     src/
        components/        # React components
           Login.jsx
           RoomList.jsx
           ChatRoom.jsx
           MessageList.jsx
           MessageInput.jsx
        services/          # API & Socket services
           api.js
           socket.js
        App.jsx
        main.jsx
     package.json
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run start:dev
```

The backend server will start on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## API Documentation

Once the backend is running, access the Swagger API documentation at:
```
http://localhost:3000/api/docs
```

## API Endpoints

### Rooms

- **GET /rooms** - Get all rooms
- **GET /rooms/:id** - Get a specific room
- **POST /rooms** - Create a new room
  ```json
  {
    "name": "General",
    "description": "General chat room"
  }
  ```
- **DELETE /rooms/:id** - Delete a room

### Messages

- **GET /messages** - Get all messages
- **GET /messages/room/:roomId** - Get messages for a specific room
- **POST /messages** - Create a new message
  ```json
  {
    "content": "Hello, world!",
    "roomId": 1,
    "userId": 1,
    "username": "John"
  }
  ```

## WebSocket Events

### Client to Server

- **joinRoom** - Join a chat room
  ```javascript
  socket.emit('joinRoom', { roomId: 1, username: 'John' });
  ```

- **leaveRoom** - Leave a chat room
  ```javascript
  socket.emit('leaveRoom', { roomId: 1, username: 'John' });
  ```

- **sendMessage** - Send a message
  ```javascript
  socket.emit('sendMessage', {
    content: 'Hello!',
    roomId: 1,
    userId: 1,
    username: 'John'
  });
  ```

- **typing** - Emit typing indicator
  ```javascript
  socket.emit('typing', { roomId: 1, username: 'John', isTyping: true });
  ```

### Server to Client

- **newMessage** - Receive new message
- **userJoined** - User joined the room
- **userLeft** - User left the room
- **userTyping** - User is typing

## Usage

1. Start both backend and frontend servers
2. Open `http://localhost:5173` in your browser
3. Enter a username to join
4. Create a new room or select an existing one
5. Start chatting in real-time!

## Database

The application uses SQLite with the following schema:

### Tables

- **rooms** - Chat rooms
  - id (Primary Key)
  - name (Unique)
  - description
  - createdAt

- **users** - Users
  - id (Primary Key)
  - username (Unique)
  - createdAt

- **messages** - Messages
  - id (Primary Key)
  - content
  - roomId (Foreign Key)
  - userId (Foreign Key)
  - createdAt

## Development

### Backend Scripts
- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## License

ISC

## Author

Created for Activity 8: Chatroom REST API + UI
