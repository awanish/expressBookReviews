const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
	//Write your code here
	return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
	//Write your code here
	return res.send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
	//Write your code here
	const isbn = req.params.isbn;
	const book = books[isbn];
	return res.send(book);
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
	//Write your code here
	const author = req.params.author;
	let filteredBooks = {};
	Object.keys(books).forEach((isbn) => {
		if (books[isbn]["author"] === author) {
			filteredBooks[isbn] = books[isbn];
		}
	});

	return res.send(filteredBooks);
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
	//Write your code here
	const title = req.params.title;
	let filteredBooks = {};
	Object.keys(books).forEach((isbn) => {
		if (books[isbn]["title"] === title) {
			filteredBooks[isbn] = books[isbn];
		}
	});
	return res.send(filteredBooks);
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
	//Write your code here
	const isbn = req.params.isbn;
	const review = books[isbn]["reviews"];
	return res.send(review);
});

module.exports.general = public_users;
