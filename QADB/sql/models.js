const db = require("./index");
const Promise = require("bluebird");

module.exports = {
  getQuestions: (product_id) => {
    let _results;
    return db
      .queryAsync(
        `SELECT * FROM questions INNER JOIN answers ON answers.question_id=questions.id LEFT JOIN images ON images.answer_id_img=answers.id_ans WHERE product_id=${product_id};`
      )
      .then((data) => {
        let results = [];
        let ids = {};
        let index = 0;

        for (let i = 0; i < data.length; i++) {
          if (ids[data[i].question_id] === undefined) {
            ids[data[i].question_id] = index;
            let q = {
              id: data[i].id,
              product_id: data[i].product_id,
              asker_name: data[i].asker_name,
              asker_email: data[i].asker_email,
              body: data[i].body,
              date_written: data[i].date_written,
              helpful: data[i].helpful,
              reported: data[i].reported,
              answers: {
                [data[i].id_ans]: {
                  id: data[i].id_ans,
                  question_id: data[i].question_id,
                  answerer_name: data[i].answerer_name,
                  answerer_email: data[i].answerer_email,
                  body: data[i].body_ans,
                  date: data[i].date_ans,
                  helpful: data[i].helpful_ans,
                  reported: data[i].helpful_ans,
                  images: data[i].url_img === null ? [] : [data[i].url_img],
                },
              },
            };
            results[index] = q;
            index++;
          } else {
            let temp = results[ids[data[i].question_id]].answers[data[i].id_ans] ? results[ids[data[i].question_id]].answers[data[i].id_ans].images.slice() : [];

            if (data[i].url_img !== null){
              temp.push(data[i].url_img);
            }

            results[ids[data[i].question_id]].answers[data[i].id_ans] = {
              id: data[i].id_ans,
              question_id: data[i].question_id,
              answerer_name: data[i].answerer_name,
              answerer_email: data[i].answerer_email,
              body: data[i].body_ans,
              date: data[i].date_ans,
              helpful: data[i].helpful_ans,
              reported: data[i].helpful_ans,
              images: temp,
            };
          }
        }
        return results;
      })
      .catch((err) => {
        console.log("ERROR: ", err);
      });
  },
  getAnswers: (question_id) => {
    return db
      .queryAsync(
        `SELECT * FROM answers WHERE question_id=${question_id} AND reported < 5`
      )
      .then((data) => {
        let result = {};
        for (let i = 0; i < data.length; i++) {
          result[data[i].id] = data[i];
        }
        return result;
      });
  },
};
