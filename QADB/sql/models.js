const db = require("./index");
const Promise = require("bluebird");

module.exports = {
  getQuestions: (product_id) => {
    let _results;
    return db
      .queryAsync(
        `SELECT * FROM questions LEFT JOIN answers ON answers.question_id=questions.id LEFT JOIN images ON images.answer_id_img=answers.id_ans WHERE product_id=${product_id};`
      )
      .then((data) => {
        let results = [];
        let ids = {};
        let index = 0;

        for (let i = 0; i < data.length; i++) {
          if (ids[data[i].id] === undefined) {
            ids[data[i].id] = index;
            let q = {
              question_id: data[i].id,
              asker_name: data[i].asker_name,
              question_body: data[i].body,
              question_date: data[i].date_written,
              question_helpfulness: data[i].helpful,
              reported: data[i].reported,
              answers: data[i].id_ans ? {
                [data[i].id_ans]: {
                  id: data[i].id_ans,
                  // question_id: data[i].question_id,
                  answerer_name: data[i].answerer_name,
                  // answerer_email: data[i].answerer_email,
                  body: data[i].body_ans,
                  date: data[i].date_ans,
                  helpful: data[i].helpful_ans,
                  // reported: data[i].helpful_ans,
                  photos: data[i].url_img === null ? [] : [data[i].url_img],
                },
              } : {},
            };
            results[index] = q;
            index++;
          } else {
            let temp = results[ids[data[i].question_id]].answers[data[i].id_ans]
              ? results[ids[data[i].question_id]].answers[
                  data[i].id_ans
                ].photos.slice()
              : [];

            if (data[i].url_img !== null) {
              temp.push(data[i].url_img);
            }

            results[ids[data[i].question_id]].answers[data[i].id_ans] = {
              id: data[i].id_ans,
              // question_id: data[i].question_id,
              answerer_name: data[i].answerer_name,
              // answerer_email: data[i].answerer_email,
              body: data[i].body_ans,
              date: data[i].date_ans,
              helpful: data[i].helpful_ans,
              // reported: data[i].helpful_ans,
              photos: temp,
            };
          }
        }
        return results;
      })
      .catch((err) => {
        console.log("QUESTIONS ERROR ********* : ", err);
      });
  },
  getAnswers: (question_id, page = 1, count = 5) => {
    limit = page * count;

    const getImages = (answers) => {
      let test = answers.map((answer) => {
        return db.queryAsync(
          `SELECT * FROM images WHERE answer_id_img=${answer.id_ans}`
        );
      });
      return Promise.all(test);
    };

    let answers;

    return db
      .queryAsync(
        `SELECT * FROM answers WHERE question_id=${question_id} LIMIT ${limit}`
      )
      .then((answersData) => {
        answers = answersData;
        return getImages(answers);
      })
      .then((images) => {
        for (let answer = 0; answer < answers.length; answer++) {
          images.forEach((image) => {
            if (
              image.length > 0 &&
              image[0].answer_id_img === answers[answer].id_ans
            ) {
              answers[answer].photos = image;
            }
          });
        }
        return answers;
      })
      .then((answers) => {
        answers.forEach((answer, index) => {
          let temp = answer.photos ? answer.photos : [];

          answers[index] = {
            answer_id: answer.id_ans,
            body: answer.body,
            date: answer.date_ans,
            answerer_name: answer.answerer_name,
            helpfulness: answer.helpful_ans,
            photos: [],
          };

          if (temp.length > 0) {
            temp.forEach(image => {
              answers[index].photos.push({
                id: image.id_img,
                url: image.url_img,
              })
            })
          }
        });
        return answers;
      })
      .catch((err) => {
        console.log('ANSWERS ERROR ****** : ', err);
      });
  },
  postQuestion: (product_id, question) => {
    return db.queryAsync(`INSERT INTO questions (product_id, asker_name, asker_email, body, date_written) VALUES ('${product_id}', '${question.asker_name}', '${question.asker_email}', '${question.body}', '${question.date_written}')`)
  },
  postAnswer: (question_id, answer) => {
    return db.queryAsync(`INSERT INTO answers (question_id, answerer_name, answerer_email, body_ans, date_ans) VALUES ('${question_id}', '${answer.answerer_name}', '${answer.answerer_email}', '${answer.body}', '${answer.date_written}')`);
  },
  updateHelpfulQuestion: (question_id) => {
    return db.queryAsync(`UPDATE questions SET helpful=helpful+1 WHERE id=${question_id}`);
  },
  updateReportQuestion: (question_id) => {
    return db.queryAsync(`UPDATE questions SET reported=reported+1 WHERE id=${question_id}`);
  },
  updateHelpfulAnswer: (answer_id) => {
    return db.queryAsync(`UPDATE answers SET helpful_ans=helpful_ans+1 WHERE id_ans=${answer_id}`);
  },
  updateReportAnswer: (answer_id) => {
    return db.queryAsync(`UPDATE answers SET reported_ans=reported_ans+1 WHERE id_ans=${answer_id}`);
  },
  insertAnswerPhoto: (answer_id, url) => {
    return db.queryAsync(`INSERT INTO images (answer_id_img, url_img) VALUES ('${answer_id}', '${url}')`);
  }
};
