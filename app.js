var express = require("express");
var exphbs = require("express-handlebars");
require("dotenv").config();
var port = process.env.PORT || 3000;

var { crear_pago } = require("./mercadopago.js");

var app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static("assets"));

app.use("/assets", express.static(__dirname + "/assets"));

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/detail", async function (req, res) {
  const repsonse = await crear_pago(req.query);
  const id = repsonse.body.id;

  const data = {
    img: req.query.img.replace("%2F", "/"),
    title: req.query.title,
    price: req.query.price,
    unit: req.query.unit,
    pref_id: id,
  };
  res.render("detail", data);
});

app.get("/nuevopago", async (req, res) => {
  const data = await crear_pago(req.query);
  res.send(data.body.sandbox_init_point);
});

app.get("/webhook", (req, res) => {
  console.log("webhook pedido");
  res.sendStatus(200);
});

app.get("/success", (req, res) => {
  res.render("success", req.query);
});

app.get("/pending", (req, res) => {
  res.render("pending", req.query);
});

app.get("/failure", (req, res) => {
  res.render("failure", req.query);
});

app.listen(port);
