const express = require('express');
const router = express.Router();

// User Model
const Question = require('../../../models/coordinator/questions');

router.get('/questions', (req, res) => {
    Question.find()
        .sort({ Q_ID: -1 })
        .then(questions => res.json(questions));
});

// @route POST /coordinator/add
// @desc Add Questions
// @access Public

router.post('/add', (req, res) => {

    // Form validation
    //  const { errors, isValid } = validateQuestionInput(req.body);

    // Check validation
    /*  if (!isValid) {
          return res.status(400).json(errors);
      }
      */
    Question.findOne({ Q_ID: req.body.Q_ID }).then(question => {
        if (question) {
            return res.status(400).json({ qid: "Question ID already exists" });
        }
        const newQuestion = new Question({
            CAT_ID: req.body.CAT_ID,
            TOPIC_ID: req.body.TOPIC_ID,
            Q_ID: req.body.Q_ID,
            Q_NAME: req.body.Q_NAME,
            Q_DESC: req.body.Q_DESC,
            OPT_1: req.body.OPT_1,
            OPT_2: req.body.OPT_2,
            OPT_3: req.body.OPT_3,
            OPT_4: req.body.OPT_4,
            ANS_ID: req.body.ANS_ID,
            HINT: req.body.HINT,
            TAGS: req.body.TAGS,
            LEVEL: req.body.LEVEL,
        });
        newQuestion.save()
            .then(question => res.json(question))
            .catch(err => console.log(err));
    });
});

module.exports = router;

