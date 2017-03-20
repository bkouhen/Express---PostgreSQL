const express = require('express');
const path = require('path');

module.exports = (app) => {

app.use(express.static(path.join(__dirname, '../../mean-app/dist')));

// Route to angular App
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../mean-app/dist/index.html'));
});

app.get('/posts', (req, res) => {
    res.sendFile(path.join(__dirname, '../../mean-app/dist/index.html'));
});

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, '../../mean-app/dist/index.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../../mean-app/dist/index.html'));
});

};