const express = require('express');
const router = express.Router();
const db = require('./connection');

router.post("/", function (request, response) {
  if(!request.body) return response.sendStatus(400);
  let t = request.body;
  db.one('INSERT INTO aircrafts (aircraft_code, model, range) VALUES ($1, $2, $3) RETURNING model', [t.aircraft_code, t.model, t.range])
      .then(function (data) {
        return response.json(data);
      })
      .catch(function (error) {
        console.log("Ошибка: ", error);
      });
});

router.get("/", function (request, response) {
  if(!request.body) return response.sendStatus(400);
  db.any('SELECT * FROM aircrafts;')
      .then(function (data) {
        return response.json(data);
      })
})

router.delete("/id", function (request, response) {
  db.any('DELETE FROM aircrafts WHERE aircraft_code = $1;', [request.query.code])
      .then(function (data) {
        return response.json(data);
      })
      .catch(function (error) {
        console.log("ERROR:", error);
      });
});

router.put("/", function (request, response) {
  if(!request.body) return response.sendStatus(400);
  let t = request.body;
  db.one(`UPDATE aircrafts SET aircraft_code = $1, model = $2, range = $3 WHERE aircraft_code = $1`, [t.aircraft_code, t.model, t.range])
      .then(() =>{
          return response.sendStatus(200);
      })
      .catch(function (error) {
        return response.json(error);
      });
});
module.exports = router;
