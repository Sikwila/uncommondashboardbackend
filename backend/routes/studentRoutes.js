//studentRoutes.js

const express = require('express');
const { createStudent, getStudents, getStudentById, updateStudent, deleteStudent } = require('../controllers/studentController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new student
exports.createStudent = async (req, res) => {
    try {
        // Validate that the user ID exists before creating the student
        if (!req.body.user) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const newStudent = new Student({
            user: req.body.user,
            attendanceRecords: [] // Initialize with an empty array or pass from body
        });
        await newStudent.save();
        res.status(201).json({ message: 'Student created successfully', student: newStudent });
    } catch (error) {
        res.status(500).json({ message: 'Error creating student', error });
    }
};

// Get all students
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find().populate('user');
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error });
    }
};

// Get a student by ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate('user');
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student', error });
    }
};

// Update a student
exports.updateStudent = async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStudent) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json({ message: 'Student updated successfully', student: updatedStudent });
    } catch (error) {
        res.status(500).json({ message: 'Error updating student', error });
    }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting student', error });
    }
};

// Define routes with middleware
router.post('/', authMiddleware, roleMiddleware('hr'), createStudent);
router.get('/', authMiddleware, roleMiddleware('hr'), getStudents);
router.get('/:id', authMiddleware, roleMiddleware('hr'), getStudentById);
router.put('/:id', authMiddleware, roleMiddleware('hr'), updateStudent);
router.delete('/:id', authMiddleware, roleMiddleware('hr'), deleteStudent);

module.exports = router;

