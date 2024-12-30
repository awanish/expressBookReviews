const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
	//returns boolean
	//write code to check is the username is valid
};

const authenticatedUser = (username, password) => {
	//returns boolean
	//write code to check if username and password match the one we have in records.
	const user = users.find((u) => u.username === username);
	return user?.password === password;
};

//only registered users can login
regd_users.post("/login", (req, res) => {
	//Write your code here
	// return res.send(req.body);
	const { username, password } = req.body;
	const user = users.find((u) => u.username === username);
	// if (user && user.password === password) {
	if (authenticatedUser(username, password)) {
		let token = jwt.sign(user, "access", {
			expiresIn: "1h", // Token validity
		});
		// Store JWT in session
		req.session.authorization = { accessToken: token };
		return res.send(username + " successfully logged in.");
	} else {
		return res.status(401).send("Username/Password doesn't match");
	}
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
	//Write your code here
	const isbn = req.params.isbn;
	const review = req.query.review;

	const book = books[isbn];
	book["reviews"][req.user.username] = review;
	return res.json(book);
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
	const isbn = req.params.isbn;
	const username = req.user.username;
	const book = books[isbn];
	if (book.reviews[username]) {
		delete book.reviews[username];
		return res.json({ message: "Review deleted successfully." });
	} else {
		return res.status(403).json({ message: "User not authenticated" });
	}

	return res.send(book.reviews);
	const filteredBook = book.reviews.filter((r) => r === username);
	return res.send({ book, filteredBook });
});
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
