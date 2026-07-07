const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let questions = [
    { id: 1, category: 'general', question: 'What is 2+2?', correct_answer: '4', incorrect_answers: ['3','5','22'] },
    { id: 2, category: 'history', question: 'Who was the first president of the USA?', correct_answer: 'George Washington', incorrect_answers: ['Abraham Lincoln', 'Thomas Jefferson', 'John Adams'] }
];

app.get('/api/questions', (req, res) => {
    const { category } = req.query;
    if (category) {
        const filtered = questions.filter(q => q.category === category.toLowerCase());
        return res.json(filtered);
    }
    res.json(questions);
});

app.get('/api/questions/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const question = questions.find(q => q.id === id);
    if (!question) return res.status(404).json({ error: 'Question not found' });
    res.json(question);
});

app.post('/api/questions', (req, res) => {
    const { category, question, correct_answer, incorrect_answers } = req.body;
    if (!category || !question || !correct_answer || !Array.isArray(incorrect_answers)) {
        return res.status(400).json({ error: 'Missing or invalid fields' });
    }
    const newQuestion = {
        id: questions.length ? questions[questions.length - 1].id + 1 : 1,
        category: category.toLowerCase(),
        question,
        correct_answer,
        incorrect_answers
    };
    questions.push(newQuestion);
    res.status(201).json(newQuestion);
});

app.put('/api/questions/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const questionIndex = questions.findIndex(q => q.id === id);
    if (questionIndex === -1) return res.status(404).json({ error: 'Question not found' });

    const { category, question, correct_answer, incorrect_answers } = req.body;
    if (!category || !question || !correct_answer || !Array.isArray(incorrect_answers)) {
        return res.status(400).json({ error: 'Missing or invalid fields' });
    }

    questions[questionIndex] = {
        id,
        category: category.toLowerCase(),
        question,
        correct_answer,
        incorrect_answers
    };

    res.json(questions[questionIndex]);
});

app.delete('/api/questions/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const questionIndex = questions.findIndex(q => q.id === id);
    if (questionIndex === -1) return res.status(404).json({ error: 'Question not found' });

    questions.splice(questionIndex, 1);
    res.status(204).send(); // No content
});

app.listen(PORT, () => {
    console.log(`Trivia REST API running at http://localhost:${PORT}`);
});
