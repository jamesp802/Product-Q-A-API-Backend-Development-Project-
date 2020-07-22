const express = require("express");
const routerSQL = express.Router();

/**
 *Get Questions and Get Answers*
 - GET /qa/:product_id Retrieves a list of questions for a particular product. This list does not include any reported questions.
 - GET /qa/:question_id/answers Returns answers for a given question. This list does not include any reported answers
 *Post Question and Post Answer*
 - POST /qa/:product_id Adds a question for the given product
 - POST /qa/:question_id/answers Adds an answer for the given question
 *Update helpful question value, Update helpful answer value*
 - PUT /qa/question/:question_id/helpful Updates a question to show it was found helpful.
 - PUT /qa/answer/:answer_id/helpful Updates an answer to show it was found helpful.
  *Update report question value, Update report answer value*
 - PUT /qa/question/:question_id/report Updates a question to show it was reported. Note, this action does not delete the question, but the question will not be returned in the above GET request.
- PUT /qa/answer/:answer_id/report Updates an answer to show it has been reported. Note, this action does not delete the answer, but the answer will not be returned in the above GET request.
 */

const SQL = require("../sql/");
const sqlModels = require("../sql/models");

routerSQL.get("/qa/:product_id", (req, res) => {
  sqlModels
    .getQuestions(req.params.product_id)
    .then((data) => res.send({ results: data }))
    .catch((err) => {
      console.log(err);
      res.send("failed");
    });
});

routerSQL.get("/qa/:question_id/answers", (req, res) => {
  sqlModels
    .getQuestions(req.params.question_id)
    .then((data) => res.send({ results: data }))
    .catch((err) => {
      console.log(err);
      res.send("failed");
    });
});

routerSQL.post("/qa/:product_id", (req, res) => {
  console.log(req.body);
});

routerSQL.post("/qa/:question_id/answer", (req, res) => {});

routerSQL.put("/qa/question/:question_id/helpful", (req, res) => {});

routerSQL.put("/qa/answer/:answer_id/helpful", (req, res) => {});

module.exports.routerSQL = routerSQL;
