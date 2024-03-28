const db = require('../../db');
const { executeQuery } = require('../../db');
const multer = require('multer');
const upload = multer();


exports.index = (req, res) => {
    const query = 'SELECT * FROM gallery';
    db.executeQuery(query, [], (error, results) => {
        if (error) {
            console.error('Error fetching users:', error); // Log the error
            res.status(500).send('Error fetching users from database');
            return;
        }
        res.json(results);
    });
};

// const booleanRegex = /^(1|0)$/;

// Function to validate email address
// function validateEmail(email) {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
// }

exports.store = (req, res) => {
    try {
        const {
            title,
            description,
            img,
            status
        } = req.body;

        const errors = {};

        // Validation rules
        if (!title) {
            errors.title = 'Title is required';
        }

        if (!description) {
            errors.description = 'Description is required';
        }

        if (!img) {
            errors.img = 'Image URL is required';
        }

        if (status == undefined && !booleanRegex.test(status)) {
            errors.status = 'Status should be a string';
        } else if (!status) {
            errors.status = 'Status is required';
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ message: 'Validation error', errors });
        }

        const query = 'INSERT INTO gallery (title, description, image_url , status ) VALUES (?, ?, ? , ?)';
        const values = [title, description, img , status];

        executeQuery(query, values, (error, results) => {
            if (error) {
                console.error('Error inserting data into database:', error);
                return res.status(500).json({
                    message: 'Error inserting data into database',
                    error: error.message
                });
            }
            console.log('Data inserted into database:', results);
            return res.status(200).json({
                message: 'Data inserted successfully into database',
                data: req.body
            });
        });

    } catch (error) {
        console.error('Error handling request:', error);
        return res.status(500).json({
            message: 'Error handling request',
            error: error.message
        });
    }
};


exports.update = (req, res) => {
    try {
        const {
            id,
            title,
            description,
            img,
            status
        } = req.body;

        if (!req.body) {
            return res.status(400).json({ message: 'Validation error', reqbody: req.body });
        }

        const errors = {};

        // Validation rules
        if (!id) {
            errors.id = 'ID is required';
        }

        if (!title) {
            errors.title = 'Title is required';
        }

        if (!description) {
            errors.description = 'Description is required';
        }

        if (!img) {
            errors.img = 'Image URL is required';
        }

        if (status === undefined || typeof status == 'boolean') {
            errors.status = 'Status should be a boolean value';
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ message: 'Validation error', errors });
        }

        // Check if the item exists
        const checkQuery = 'SELECT * FROM gallery WHERE id = ?';
        const checkValues = [id];

        executeQuery(checkQuery, checkValues, (error, results) => {
            if (error) {
                console.error('Error checking item:', error);
                return res.status(500).json({
                    message: 'Error checking item',
                    error: error.message
                });
            }

            if (results.length === 0) {
                // If the item does not exist, return an error
                return res.status(404).json({ error: 'Event not found' });
            }

            // Update the item
            const updateQuery = 'UPDATE gallery SET title = ?, description = ?, image_url = ?, status = ? WHERE id = ?';
            const updateValues = [title, description, img , status, id];

            executeQuery(updateQuery, updateValues, (updateError, updateResults) => {
                if (updateError) {
                    console.error('Error updating data in the database:', updateError);
                    return res.status(500).json({
                        message: 'Error updating data in the database',
                        error: updateError.message
                    });
                }
                console.log('Data updated in the database:', updateResults);
                return res.status(200).json({
                    message: 'Data updated successfully in the database',
                    data: req.body
                });
            });
        });

    } catch (error) {
        console.error('Error handling request:', error);
        return res.status(500).json({
            message: 'Error handling request',
            error: error.message
        });
    }
};


exports.delete = (req, res) => {
    try {
        const event_id = req.params.id;

        // Check if event_id exists
        const checkQuery = 'SELECT * FROM gallery WHERE id = ?';
        const checkValues = [event_id];

        executeQuery(checkQuery, checkValues, (error, results) => {
            if (error) {
                console.error('Error checking event_id:', error);
                return res.status(500).json({
                    message: 'Error checking event_id',
                    error: error.message
                });
            }

            if (results.length === 0) {
                // If event_id does not exist, return an error
                return res.status(404).json({ error: 'Event ID not found' });
            }

            // Delete the event
            // Construct the DELETE query
            const deleteQuery = 'DELETE FROM gallery WHERE id = ?';
            const deleteValues = [event_id];

            // Execute the DELETE query
            executeQuery(deleteQuery, deleteValues, (deleteError, deleteResults) => {
                if (deleteError) {
                    console.error('Error deleting data from the database:', deleteError);
                    return res.status(500).json({
                        message: 'Error deleting data from the database',
                        error: deleteError.message
                    });
                }
                console.log('Data deleted from the database:', deleteResults);
                return res.status(200).json({
                    message: 'Data deleted successfully from the database'
                });
            });
        });

    } catch (error) {
        console.error('Error handling request:', error);
        return res.status(500).json({
            message: 'Error handling request',
            error: error.message
        });
    }
};

