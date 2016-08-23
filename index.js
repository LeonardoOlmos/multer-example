'use strict'

const port = process.env.PORT || 8080

const express = require('express')
const app = express()

app.use(require('./routes'))

app.listen(port, function() {
	console.log(`Server running at http://localhost:${port}`)
})