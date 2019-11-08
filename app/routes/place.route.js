module.exports = (app) => {
    const student = require('../controllers/place.controller.js');

    // Create a new Note
    app.post('/student', student.create);

    // Retrieve all Notes
    app.get('/student', student.findAll);

    // Retrieve a single Note with noteId
    app.get('/student/:place_id', student.findOne);

    // Update a Note with noteId
    app.put('/student/:place_id', student.update);

    // Delete a Note with noteId
    app.delete('/student/:place_id', student.delete);
}