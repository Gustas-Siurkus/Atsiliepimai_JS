// Atsiliepimai API
// Padarytas Aido Šalvio ir Gusto Šiurkaus

const express = require("express");
const bodyParser = require("body-parser");
var mysql = require("mysql");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const port = 3000;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "atsiliepimai",
});

con.connect(function (err) {
  if (err) throw err;
});

app.get("/", (req, res) => {
  res.send("Labas pasauli!");
});

// atsiliepimų sąrašo išgavimas
app.get("/api/atsiliepimai/", (req, res) => {
  let sql = "SELECT * FROM atsiliepimai";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(result));
    return res.end();
  });
});

// atsiliepimų sąrašo išrikiuota pagal naujausią datą išgavimas
app.get("/api/atsiliepimai/sort/new", (req, res) => {
  let sql = "SELECT * FROM atsiliepimai ORDER BY laikas DESC";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(result));
    return res.end();
  });
});

// atsiliepimų sąrašo išrikiuota pagal seniausią datą išgavimas
app.get("/api/atsiliepimai/sort/old", (req, res) => {
  let sql = "SELECT * FROM atsiliepimai ORDER BY laikas ASC";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(result));
    return res.end();
  });
});

// atsiliepimų sąrašo išrikiuota pagal geriausią vertinimą išgavimas
app.get("/api/atsiliepimai/sort/good", (req, res) => {
  let sql = "SELECT * FROM atsiliepimai ORDER BY vertinimas DESC";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(result));
    return res.end();
  });
});

// atsiliepimų sąrašo išrikiuota pagal blogiausią vertinimą išgavimas
app.get("/api/atsiliepimai/sort/bad", (req, res) => {
  let sql = "SELECT * FROM atsiliepimai ORDER BY vertinimas ASC";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(result));
    return res.end();
  });
});

// atsiliepimų vertinimo vidurkis
app.get("/api/atsiliepimai/vertinimas", (req, res) => {
  let sql = "SELECT vertinimas FROM atsiliepimai";
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    var resultatas;

    if (result.length) {

        var vertinimuSuma = 0

        for (let i = 0; i < result.length; i++) {
            vertinimuSuma += result[i].vertinimas
        }

        resultatas = {"vidurkis": Math.ceil(vertinimuSuma / result.length)}

    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(resultatas));
    return res.end();
  });
});

// atsiliepimo informacijos išgavimas
app.get("/api/atsiliepimai/:id", (req, res) => {
  let id = req.params.id;
  let sql = "SELECT * FROM atsiliepimai WHERE id = ?";
  con.query(sql, [id], function (err, result, fields) {
    if (err) throw err;

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(result));
    return res.end();
  });
});

// prekės sukūrimas
app.post("/api/atsiliepimai", (req, res) => {
  let vardas = req.body.vardas;
  let pastas = req.body.pastas;
  let tekstas = req.body.tekstas;
  let vertinimas = req.body.vertinimas;
  let sql = "INSERT INTO atsiliepimai (vardas, pastas, tekstas, vertinimas) VALUES (?, ?, ?, ?)";
  con.query(sql, [vardas, pastas, tekstas, vertinimas], function (err, result, fields) {
    if (err) throw err;
    return res.json({ status: "success", data: { id: result.insertId } });
  });
});

// atsiliepimo informacijos keitimas
app.put("/api/atsiliepimai/:id", (req, res) => {
  // gauname atsiliepimo informaciją pagal id
  let id = req.params.id;
  let sql = "SELECT * FROM atsiliepimai WHERE id = ?";
  con.query(sql, [id], function (err, result, fields) {
    if (err) throw err;
    if (result.length) {
      let atsiliepimas = result[0];

      if (req.body.vardas) {
        atsiliepimas.vardas = req.body.vardas;
      }

      if (req.body.pastas) {
        atsiliepimas.pastas = req.body.pastas;
      }

      if (req.body.tekstas) {
        atsiliepimas.tekstas = req.body.tekstas;
      }

      if (req.body.vertinimas) {
        atsiliepimas.vertinimas = req.body.vertinimas;
      }

      if (req.body.laikas) {
        atsiliepimas.laikas = req.body.laikas;
      }

      let sql = "UPDATE atsiliepimai SET vardas = ?, pastas = ?, tekstas = ?, vertinimas = ?, laikas = ? WHERE id = ?";
      con.query(
        sql,
        [atsiliepimas.vardas, atsiliepimas.pastas, atsiliepimas.tekstas, atsiliepimas.vertinimas, atsiliepimas.laikas, id],
        function (err, result, fields) {
          if (err) throw err;
          return res.json({ status: "success" });
        }
      );
    } else {
      console.log("nerado");
      return res.status(404).send({ status: 404, message: "Error: not found" });
    }
  });
});

// atsiliepimo trynimas
app.delete("/api/atsiliepimai/:id", (req, res) => {
  // gauname atsiliepimo informaciją pagal id
  let id = req.params.id;
  let sql = "SELECT * FROM atsiliepimai WHERE id = ?";
  con.query(sql, [id], function (err, result, fields) {
    if (err) throw err;
    if (result.length) {
      let sql = "DELETE FROM atsiliepimai WHERE id = ?";
      con.query(sql, [id], function (err, result, fields) {
        if (err) throw err;
        return res.json({ status: "success" });
      });
    } else {
      console.log("nerado");
      return res.status(404).send({ status: 404, message: "Error: not found" });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});