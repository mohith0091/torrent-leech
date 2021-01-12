const express = require("express");
const puppeteer = require("puppeteer");

const o337xSearch = require("../crawllers/1337x/search");

const router = express.Router();


router.get("/1337x", async (req, res) => {
  let query = req.query.query;

  if (query === "" || !query) {
    res.send({ error: true, errorMessage: "Search term cannot be empty" });
  } else {
    const data = await o337xSearch(query);
    res.send(data);
  }
});


module.exports = router;
