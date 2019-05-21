const cron = require("node-cron");
const db = require("../db");
const { client } = require("../library/redis");
const BooksService = require("./books.service").Books;

cron.schedule("* * * * *", () => {
  console.log("Run cron job");
  // TODO: Should export redis key
  const booksService = new BooksService(db, null);
  booksService.getList().then(function(result) {
    client.set("bookstore:books", JSON.stringify(result));
  });
});
