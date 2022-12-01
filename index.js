const path = require('path')
const express = require('express')
const app = express()
const aircraftsRouter = require('./aircraftsRouter');
const cors = require('cors')
app.use(cors())

app.use(express.json());
app.use('/aircrafts', aircraftsRouter);

app.listen(3001)
