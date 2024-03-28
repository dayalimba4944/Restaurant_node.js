const db = require('../../db');
const { executeQuery } = require('../../db');
const multer = require('multer');
const upload = multer();


exports.index = (req, res) => {
    const query = 'SELECT * FROM contact_us  WHERE id = 1';
    db.executeQuery(query, [], (error, results) => {
        if (error) {
            console.error('Error fetching users:', error); // Log the error
            res.status(500).send('Error fetching users from database');
            return;
        }
        res.json({data: results});
    });
};

const booleanRegex = /^(1|0)$/;

exports.update = (req, res) => {
    try {
        const {
            map_location,
            location,
            open_hours,
            Email,
            phone_number,
            created_at,
            updated_at
        } = req.body;

        id = 1;

        const errors = {};

        // Validation rules
        if (!location) {
            errors.location = 'Location is required';
        }

        if (!Email) {
            errors.Email = 'Email is required';
        }

        if (!phone_number) {
            errors.phone_number = 'Phone number is required';
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ message: 'Validation error', errors });
        }

        const query = 'UPDATE contact_us SET map_location = ?, location = ?, open_hours = ?, Email = ?, phone_number = ?, created_at = ?, updated_at = ? WHERE id = ?';
        const values = [map_location, location, open_hours, Email, phone_number, created_at, updated_at, id];
        

        executeQuery(query, values, (error, results) => {
            if (error) {
                console.error('Error updating data in the database:', error);
                return res.status(500).json({
                    message: 'Error updating data in the database',
                    error: error.message
                });
            }
            console.log('Data updated in the database:', results);
            return res.status(200).json({
                message: 'Data updated successfully in the database',
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
