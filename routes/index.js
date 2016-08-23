'use strict'

const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer')

router.get('/', function(req, res) {
	res.sendfile('public/index.html')
})

router.post('/upload', function(req, res) {
	let storage = multer.diskStorage({
		destination: function(req, file, done) {
			done(null, path.join(__dirname, '..', 'uploads'))
		},
		filename: function(req, file, done) {
			done(null, file.fieldname + '-' + Date.now())
		}
	})

	let upload = multer({
		storage: storage
	}).single('archivo')

	upload(req, res, function(err) {
		if (err) return res.send(err)
		res.send('File uploaded.')
	})
})

module.exports = router