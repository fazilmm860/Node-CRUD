const express = require('express');
const mongoose = require('mongoose');

const grade = require('../models/gradeModel')

const router = express.Router();

const createGrade = async (req, res) => {
    console.log(req.body);
    const newgrade = new grade({
        grade: req.body.grade,
        pass: req.body.pass,
        subjects: req.body.subjects
    });
    try {
        await newgrade.save();
        res.status(201).json(newgrade)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

module.exports.createGrade = createGrade;