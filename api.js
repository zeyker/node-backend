const express = require('express');
const app = express('express');
const bodyParser = require('body-parser');
const db = require('./queries');
const cors = require('cors');

const PORT = process.env.PORT || 3000;


app.use(bodyParser.json())
app.use(cors());

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`)
})

app.get('/', (request, response) => {
    response.status(200).json({ msg: 'A simple backend for POST handling' })
});


//RESOURCES
app.get('/posts', db.getAllPosts);
app.post('/posts', db.createPost);
app.delete('/posts/:id', db.deletePost);