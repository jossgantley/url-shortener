const dns = require("dns");
const router = require("express").Router();
let createUrl = require("./createUrl");

router.route("/new").post((req, res) => {
  const origin = req.body.url_name;
  let masterReg = /^https?:\/\/www\.[\w]*\.[\D]*[[\/\w*]?/;
  let isValid = masterReg.test(origin);
  let getHost = origin.split("/")[2];
  if (isValid) {
    dns.lookup(getHost, (err, add) => {
      if (err) {
        console.log(err);
        res.json({ error: "invalid URL" });
      } else if (add !== undefined) {
        let key = Math.floor(Math.random() * 1000);
        const short = key;
        const newCreateUrl = new createUrl({
          original_url: origin,
          short_url: short
        });
        newCreateUrl
          .save()
          .then(() => res.json({ original_url: origin, short_url: key }))
          .catch(err => console.log(err));
      }
    });
  } else {
    res.json({ error: "invalid URL" });
  }
});
router.route("/:shortyUrl").get((req, res) => {
  const short = req.params.shortyUrl;
  createUrl.findOne({ short_url: short }, (err, redirect) => {
    res.redirect(redirect.original_url);
  });
});

module.exports = router;
