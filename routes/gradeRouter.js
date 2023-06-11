const express = require('express');

const studentGrade = require('../controllers/gradeController')

const router = express.Router();

router.post('/', studentGrade.createGrade)

module.exports = router;