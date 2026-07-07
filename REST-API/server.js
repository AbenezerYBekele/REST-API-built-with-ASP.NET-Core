const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../webapp')));

const port = 3000;
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../webapp/index.html')); });
app.get('/api/general', async (req, res) => {
    try {
        const response = await axios.get(
            'https://opentdb.com/api.php?amount=10&category=9&type=multiple'
        );
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching general quiz data');
    }
});
app.get('/api/history', async (req, res) => {
    try {
        const response = await axios.get(
            'https://opentdb.com/api.php?amount=10&category=23&type=multiple'
        );
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching history quiz data');
    }
});
app.get('/api/politic', async (req, res) => {
    try {
        const response = await axios.get(
            'https://opentdb.com/api.php?amount=10&category=24&type=multiple'
        );
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching politics quiz data');
    }
});
app.get('/api/mythology', async (req, res) => {
    try {
        const response = await axios.get(
            'https://opentdb.com/api.php?amount=10&category=20&type=multiple'
        );
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching mythology quiz data');
    }
});
app.get('/api/geography', async (req, res) => {
    try {
        const response = await axios.get(
            'https://opentdb.com/api.php?amount=10&category=22&type=multiple'
        );
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching geography quiz data');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
