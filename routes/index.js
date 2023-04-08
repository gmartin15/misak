var express = require("express");
var router = express.Router();
var exec = require("child_process").exec;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/ps", function (req, res, next) {
  const cmdStr = `ps -ef | grep web`;
  exec(cmdStr, function (err, stdout, stderr) {
    if (err) {
      res.send(err);
    } else {
      res.send(`<pre>${stdout}</pre>`);
    }
  });
});

router.get("/start", function (req, res) {
  let cmdStr = "./web.js -c public/config.json >/dev/null 2>&1 &";
  exec(cmdStr, function (err, stdout, stderr) {
    if (err) {
      res.send("Web exec error：" + err);
    } else {
      res.send("Web exec success");
    }
  });
});

router.get("/listen", function (req, res) {
  let cmdStr = "ss -nltp";
  exec(cmdStr, function (err, stdout, stderr) {
    if (err) {
      res.type("html").send("<pre>error: \n" + err + "</pre>");
    } else {
      res.type("html").send("<pre>ports：\n" + stdout + "</pre>");
    }
  });
});

router.get("/ipinfo", function (req, res) {
  let cmdStr = "curl ipinfo.io";
  exec(cmdStr, function (err, stdout, stderr) {
    if (err) {
      res.type("html").send("<pre>error:\n" + err + "</pre>");
    } else {
      res.type("html").send("<pre>ip: \n" + stdout + "</pre>");
    }
  });
});

module.exports = router;
