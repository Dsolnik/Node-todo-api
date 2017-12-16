# Node-todo-api

Node Todo API
interface with a MONGODB database to store TODO notes of users.

# DOCUMENTATION:

### GET /todos
##### Get the todos of the current user
	HEADERS: x-auth- session token
	RESPONSE: JSON document containing array of todos

### POST /todos 
##### Register a todo for the current user with 
	HEADERS: x-auth- session token
	BODY: JSON with text(STRING) and optional completed(BOOLEAN) attribute
	RESPONSE: JSON document of added todo

### GET /todos/:id
##### Get the todo of the current user
	HEADERS: x-auth- session token
	RESPONSE: JSON document of the todo if successful

### DELETE /todos/:id
##### Delete the todo by ID 
	HEADERS: x-auth- session token
	RESPONSE: JSON document of deleted todo

### PATCH /todos/:id
##### Change attributes of given todo
	HEADERS: x-auth- session token
	BODY: JSON with text(STRING) or completed(BOOLEAN) attribute 
	RESPONSE: JSON document of patched todo

### POST /users
##### Signs up a user
	BODY: JSON with username and password
	RESPONSE: JSON with user info and header with x-auth session token

### GET /users/me
##### get current user
	HEADERS: x-auth- session token
	RESPONSE: JSON with user data 

### POST /users/login 
##### login current user
	BODY: JSON with username and password
	RESPONSE: JSON with user info and header with x-auth session token

### DELETE /users/me/token 
##### logout current user (deactivate session token)
	HEADERS: x-auth- session token
