const db = require("../../sql/index");
const models = require("../../sql/models.js");


//FIXME: Before all set up a NEW database and load SQL file, query from there then drop test database

beforeAll(() => {
  (() => {
    return db.queryAsync(
      `INSERT INTO questions (id, product_id, asker_name, asker_email, body, date_written) VALUES ('','', 'Rusty Shackleford', 'rustyshackleford@dalesdeadbug.com', 'POCKET SAND IS THE BEST PRODUCT ON THE MARKET', '1/1/2020')`
    );
  })();

  (() => {
    return db.queryAsync(
      `INSERT INTO answers (id_ans, question_id, answerer_name, answerer_email, body_ans, date_ans) VALUES ('', '', 'Dale Gribble', 'dale@dalesdeadbug.com', 'The Peanuts Are Emitting Toxins As An Evolutionary Defense Mechanism. They are Tired Of Being Eaten, And Now They are Fighting Back.', '1/1/2020')`
    );
  })();

  (() => {
    return db.queryAsync(
      `INSERT INTO images (id_img, answer_id_img, url_img) VALUES ('', '','https://static0.srcdn.com/wordpress/wp-content/uploads/2020/02/dale.jpg?q=50&fit=crop&w=740&h=370')`
    );
  })();
});

const controlDataQuestion = [
  {
    question_id: ,
    asker_name: "Rusty Shackleford",
    question_body: "POCKET SAND IS THE BEST PRODUCT ON THE MARKET",
    question_date: "1/1/2020",
    question_helpfulness: 0,
    reported: 0,
    answers: {
      "": {
        id: ,
        answerer_name: "Dale Gribble",
        body:
          "The Peanuts Are Emitting Toxins As An Evolutionary Defense Mechanism. They are Tired Of Being Eaten, And Now They are Fighting Back.",
        date: "1/1/2020",
        helpful: 0,
        photos: [
          "https://static0.srcdn.com/wordpress/wp-content/uploads/2020/02/dale.jpg?q=50&fit=crop&w=740&h=370",
        ],
      },
    },
  },
];

const controlDataAnswer = [
  {
    answer_id: ,
    date: "1/1/2020",
    answerer_name: "Dale Gribble",
    helpfulness: 0,
    photos: [
      {
        id: ,
        url:
          "https://static0.srcdn.com/wordpress/wp-content/uploads/2020/02/dale.jpg?q=50&fit=crop&w=740&h=370",
      },
    ],
  },
];

test("Retrieves data for QUESTIONS request by product id and formats to front-end criteria", () => {
  return models.getQuestions().then((data) => {
    expect(data).toEqual(controlDataQuestion);
  });
});

test("Retrieves data for ANSWERS request by question id and formats to front-end criteria", () => {
  return models.getAnswers().then((data) => {
    expect(data).toEqual(controlDataAnswer);
  });
});

const controlQuestionReqBody = {
  body: "Does this product have bees?",
  asker_name: "Nick Cage",
  asker_email: "n@nonothebees.net",
};

test("Writes data for QUESTIONS with user input", () => {
  return models.postQuestion(1000000000, controlQuestionReqBody).then((data) => {
    expect(data.warningCount).toEqual(0)
  });
});

const controlAnswerReqBody = {
  body: "Does this product have bees?",
  answerer_name: "Nick Cage",
  answerer_email: "n@nonothebees.net",
  photos: [],
};

test("Writes data for ANSWERS with user input", () => {
  return models.postAnswer(1000000000, controlAnswerReqBody).then((data) => {
    expect(data.warningCount).toEqual(0)
  });
});

afterAll(() => {
  (() => {
    return db.queryAsync(`DELETE FROM questions WHERE id IN ('');
    `);
  })();

  (() => {
    return db.queryAsync(`DELETE FROM answers WHERE id_ans IN ('');
    `);
  })();
  (() => {
    return db.queryAsync(`DELETE FROM images WHERE id_img IN ('');
    `);
  })();
  (() => {
    return db.queryAsync(`DELETE FROM answers WHERE question_id IN ('1000000000');
    `);
  })();
  (() => {
    return db.queryAsync(`DELETE FROM questions WHERE id IN ('1000000000');
    `);
  })();
});
