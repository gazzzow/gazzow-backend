import express from 'express'


const app = express();

app.use('/api', (req, res) => {
    res.send('Hello world')
})

const PORT = 5000;

app.listen(PORT, () => {
    console.log('server running on port ', PORT)
})
