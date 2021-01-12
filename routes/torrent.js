const express = require("express");
const Torrent = require("../lib/torrent");
const torrent = new Torrent();

const router = express.Router();



router.get("/download", (req, res) => {
  const link = req.query.link;

  if (!link) {
    res.send({ error: true, errorMessage: "No link provided" });
  } else if (link.indexOf("magnet:") !== 0) {
    res.send({ error: true, errorMessage: "Link is not a magnet link" });
  } else {
    torrent.download(link, torr => res.send({ error: false, magnetURI: torr.magnetURI }));
  }
});

router.get("/status", (req, res) => {
  const link = req.query.link;

  if (!link) {
    res.send({ error: true, errorMessage: "No link provided" });
  } else {
    try {
      res.send({ error: false, status: torrent.get(link) });
    } catch (e) {
      res.send({ error: false, errorMessage: e.message });
    }
  }
});

router.get("/remove", (req, res) => {
  const link = req.query.link;

  if (!link) {
    res.send({ error: true, errorMessage: "No link provided" });
  } else {
    try {
      torrent.remove(link);
      res.send({ error: false });
    } catch (e) {
      res.send({ error: true, errorMessage: e.message });
    }
  }
});

router.get("/list", (req, res) => {
  try {
    res.json({
      error: false,
      torrents: torrent.list()
    });
  } catch (e) {
    res.json({ error: true, errorMessage: e.message });
  }
});

module.exports = router;
