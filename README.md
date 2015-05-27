## KaunasJS Workshop #1

Building chat application with [node.js](https://nodejs.org/), [express](http://expressjs.com/) and [socket.io](http://socket.io/)

#### Useful links

* [Node.js documentation](https://nodejs.org/api/)
* [Express documentation](http://expressjs.com/4x/api.html)
* [Socket.io documentation](http://socket.io/docs/) and [simple chat example](http://socket.io/get-started/chat/)

### Step 1: Simple chat
Connect client sockets with server and make simple message communication between all sockets.  
![Chat example](./images/chat-example.gif)  

Example from [Socket.io](http://socket.io/get-started/chat/)  

### Step 2: Add support for nicknames
Let's add nicknames support for chat and add some field validation,
so you cannot send a message if a nickname or message field is empty.
### Step 3: Broadcast implementation
Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.
### Step 4: Show who’s online
Add online users list to the chat. If the users provide nickname, add him to the online users list.
### Step 5: Add chat history of 20 messages
Add chat history, so when next time you connect to chat you can see the last 20 messages.
### Step 6: Add chat rooms
Let's add 2 chat rooms. `Global` and `KaunasJS`. Each room have online users list and 20 message history. The user can be in only one room at a time.
### Step 7: Host to [Heroku](https://www.heroku.com/)
Host final step to Heroku.
