const express = require('express');
const mongoose = require('mongoose')

const student = require('../models/studentdata');

const router = express.Router();


const createStudent = async (req, res) => {
    console.log("Request from Postman" + req.body);
    const newStudent = new student({
        name: req.body.name,
        roll: req.body.roll,
        class: req.body.class,
        registerd_on: req.body.registerd_on,
        subjects: req.body.subjects,
        gender: req.body.gender,
        contact_no: req.body.contact_no,

    });

    try {
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

const getStudents = async (req, res) => {
    try {
        const students = await student.find();

        res.status(200).json(students)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};
const getSpecificStudent = async (req, res) => {
    const _id = req.params._id
    try {
        const stud = await student.findOne({ _id: _id })
        res.status(200).json(stud)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};
const updateStudent = async (req, res) => {
    const roll = req.params.roll;

    try {
        await student.findOneAndUpdate({
            roll: roll
        },
            {
                name: req.body.name
            }
        );
        res.status(201).json({ roll: roll });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

const deleteStudent = async (req, res) => {
    const roll = req.params.roll

    try {
        await student.findOneAndRemove({
            roll: roll,
        })
        res.status(201).json({ roll: roll })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
const updateSubjects = async (req, res) => {
    const _id = req.params._id
    try {
        await student.findOneAndUpdate({
            _id: _id
        },
            {
                $addToSet: { subjects: req.body.subjects }
            }
        )
        res.status(201).json({ _id: _id })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


module.exports.createStudent = createStudent;
module.exports.getStudents = getStudents;
module.exports.getSpecificStudent = getSpecificStudent;
module.exports.updateStudent = updateStudent;
module.exports.deleteStudent = deleteStudent;
module.exports.updateSubjects = updateSubjects;