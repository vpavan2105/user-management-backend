const express = require('express');
const { connectionToDB } = require('./config/dbConfig');
const { taskRouter } = require('./routes/taskRouter');
const { userRouter } = require('./routes/userRouter');
const app = express();
const port = 3000;
app.use(express.json());


app.use('/users', userRouter);
app.use('/tasks', taskRouter);

app.listen(port, async () => {
    await connectionToDB();
    console.log('listening on port 3000');
})