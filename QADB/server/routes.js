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

routerSQL.get("/qa/:question_id/answers", (req, res) => {
  let result = sqlModels
    .getAnswers(req.params.question_id, req.query.page, req.query.count)
    .then((data) =>
      res.send({
        question: req.params.question_id,
        page: req.query.page ? req.query.page : 0,
        count: req.query.count ? req.query.count : 5,
        results: data,
      })
    )
    .catch((err) => {
      res.send("Failed to get Answers...");
    });
});

routerSQL.get("/qa/:product_id", (req, res) => {
  sqlModels
    .getQuestions(req.params.product_id)
    .then((data) =>
      res.send({ product_id: req.params.product_id, results: data })
    )
    .catch((err) => {
      console.log(err);
      res.send("Failed to get Questions...");
    });
});

routerSQL.post("/qa/:product_id", (req, res) => {
  sqlModels
    .postQuestion(req.params.product_id, req.body)
    .then((data) => {
      res.send("Successful post question");
    })
    .catch((err) => {
      console.log(err);
      res.send("Failed to post question...");
    });
});

routerSQL.post("/qa/:question_id/answers", (req, res) => {
  sqlModels
    .postAnswer(req.params.question_id, req.body)
    .then((data) => {
      if (req.body.photos.length > 0) {
        return Promise.all(
          req.body.photos.map((photo) => {
            return sqlModels.insertAnswerPhoto(
              data.insertId,
              photo
            );
          })
        );
      }
    })
    .then((data) => {
      res.send('Successful post answer');
    })
    .catch((err) => {
      console.log(err);
      res.send("Failed to post answer...");
    });
});

routerSQL.put("/qa/question/:question_id/helpful", (req, res) => {
  sqlModels
    .updateHelpfulQuestion(req.params.question_id)
    .then(() => {
      res.send("Successful Update Helpful");
    })
    .catch((err) => {
      res.send("Failed to update helpful");
      console.log(err);
    });
});
routerSQL.put("/qa/question/:question_id/report", (req, res) => {
  sqlModels.updateReportQuestion(req.params.question_id).then(() => {
    res
      .send("Successful Update report")
      .catch((err) => {
        res.send("Failed to update report question...");
      });
  });
});

routerSQL.put("/qa/answer/:answer_id/helpful", (req, res) => {
  sqlModels
    .updateHelpfulAnswer(req.params.answer_id)
    .then(() => {
      res.send("Successful Update Helpful Answer");
    })
    .catch((err) => {
      res.send("Failed to update helpful answer...");
      console.log(err);
    });
});
routerSQL.put("/qa/answer/:answer_id/report", (req, res) => {
  sqlModels
    .updateReportAnswer(req.params.answer_id)
    .then(() => {
      res.send("Successful Update Report Answer");
    })
    .catch((err) => {
      res.send("Failed to update report answer...");
      console.log(err);
    });
});

module.exports.routerSQL = routerSQL;
