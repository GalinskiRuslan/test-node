const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.render("index"));

app.get("/about", (req, res) => res.render("about"));

app.get("/user/:name", (req, res) => {
  res.render("user", { username: req.params.name });
});
app.post("/check-user", (req, res) => {
  fs.readFile("registr-users.txt", (error, data) => {
    if (data.includes(req.body.email)) {
      return res.redirect(`/user/${req.body.email}`);
    } else {
      return res.redirect("/");
    }
  });
});
app.post("/user-registr", (req, res) => {
  fs.readFile("registr-users.txt", (error, data) => {
    if (data.includes(req.body.email)) {
      console.log("this email used");
      return res.redirect("/");
    } else {
      console.log("its work!");
      fs.writeFileSync(
        "registr-users.txt",
        `${data} \n {username: ${req.body.username}, password:${req.body.password}, email:${req.body.email}} `
      );
      return res.redirect("/about");
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
