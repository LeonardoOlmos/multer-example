'use strict'

const express = require('express')
const router = express.Router()
const path = require('path')
const multer = require('multer')

let storage = multer.diskStorage({
	destination: function(req, file, done) {
		done(null, path.join(__dirname, '..', 'uploads'))
	},
	filename: function(req, file, done) {
		done(null, file.fieldname + '-' + Date.now())
	}
})

let upload = multer({
	storage: storage,
	fileFilter: function(req, file, done) {
		if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
			req.fileValidationError = 'goes wrong on the mimetype'
			return done(null, false, new Error(req.fileValidationError))
		}
		done(null, true)
	}
}).single('archivo')

router.get('/', function(req, res) {
	res.sendfile('public/index.html')
})

router.post('/upload', function(req, res) {
	upload(req, res, function(err) {
		if (err) { 
			return res.send(err)
		}
		if (req.fileValidationError) {
			return res
				.status(400)
				.send(req.fileValidationError)
		}
		res.send('File uploaded.')
	})
})

module.exports = router