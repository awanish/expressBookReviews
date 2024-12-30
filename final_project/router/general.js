const express = require("express");
const axios = require("axios");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

const public_users = express.Router();

const BASE_URL = "http://localhost:5000";
public_users.post("/register", (req, res) => {
	//Write your code here
	const { username, password } = req.body;
	if (!(username && password)) {
		return res.status(400).send("username &/ password are not provided");
	}
	const userExist = users.find((user) => user.username === username);

	if (userExist) {
		return res.status(409).send("username already exists");
	}
	const user = { username, password };
	users.push(user);

	return res.send(`${username} registered successfully!`);
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

public_users.get("/api/books", async (req, res) => {
	try {
		// Use Axios to fetch data from an external API
		const response = await axios.get(`${BASE_URL}/`);
		res.send(response.data); // Send the book data as the response
	} catch (error) {
		console.error("Error fetching book:", error.message);
		res.status(500).send("Book not found");
	}
});

public_users.get("/api/isbn/:isbn", async (req, res) => {
	const isbn = req.params.isbn;

	try {
		// Use Axios to fetch data from an external API
		const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
		res.send(response.data); // Send the book data as the response
	} catch (error) {
		console.error("Error fetching book:", error.message);
		res.status(500).send("Book not found");
	}
});

public_users.get("/api/author/:author", async (req, res) => {
	const author = req.params.author;

	try {
		// Use Axios to fetch data from an external API
		const response = await axios.get(`${BASE_URL}/author/${author}`);
		res.send(response.data); // Send the book data as the response
	} catch (error) {
		console.error("Error fetching book:", error.message);
		res.status(500).send("Book not found");
	}
});

public_users.get("/api/title/:title", async (req, res) => {
	const title = req.params.title;

	try {
		// Use Axios to fetch data from an external API
		const response = await axios.get(`${BASE_URL}/title/${title}`);
		res.send(response.data); // Send the book data as the response
	} catch (error) {
		console.error("Error fetching book:", error.message);
		res.status(500).send("Book not found");
	}
});

module.exports.general = public_users;
