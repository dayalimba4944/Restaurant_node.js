const db = require('../../db');
const { executeQuery } = require('../../db');
const multer = require('multer');
const upload = multer();


exports.index = (req, res) => {
    const query = 'SELECT * FROM menu_categories';
    db.executeQuery(query, [], (error, results) => {
        if (error) {
            console.error('Error fetching users:', error); // Log the error
            res.status(500).send('Error fetching users from database');
            return;
        }
        res.json(results);
    });
};

const booleanRegex = /^(1|0)$/;

// Function to validate email address
// function validateEmail(email) {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
// }

// exports.store = async (req, res) => {
    exports.store = (req, res) => {
        try {
            const { name, status } = req.body;
    
            const errors = {};
    
            // Validation rules
            if (!name) {
                errors.name = 'Menu name is required';
            }
    
            if (status === undefined || !booleanRegex.test(status)) {
                errors.status = 'Status should be a boolean value';
            } else if (status === null || status === '') {
                errors.status = 'Status is required';
            }
    
            if (Object.keys(errors).length > 0) {
                return res.status(400).json({ message: 'Validation error', errors });
            }
    
            const query = 'INSERT INTO menu_categories (name, status) VALUES (?, ?)';
            const values = [name, status];
    
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
            name,
            status
        } = req.body;

        if (!req.body) {
            return res.status(400).json({ message: 'Validation error', reqbody: req.body });
        }

        const errors = {};

        // Validation rules
        if (!id) {
            errors.id = 'Menu ID is required';
        }

        if (!name) {
            errors.name = 'Menu name is required';
        }

        if (status == undefined && !booleanRegex.test(status)) {
            errors.status = 'Status should be a string';
        } else if (!status) {
            errors.status = 'Status is required';
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ message: 'Validation error', errors });
        }

        // Check if id exists
        const checkQuery = 'SELECT * FROM menu_categories WHERE id = ?';
        const checkValues = [id];

        executeQuery(checkQuery, checkValues, (error, results) => {
            if (error) {
                console.error('Error checking id:', error);
                return res.status(500).json({
                    message: 'Error checking id',
                    error: error.message
                });
            }

            if (results.length === 0) {
                // If id does not exist, return an error
                return res.status(404).json({ error: 'Menu ID not found' });
            }

            // Update the menu item
            const updateQuery = 'UPDATE menu_categories SET  name = ?, status = ? WHERE id = ?';
            const updateValues = [name, status, id];

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
        const id = req.params.id;

        // Check if menu_id exists
        const checkQuery = 'SELECT * FROM menu_categories WHERE id = ?';
        const checkValues = [id];

        executeQuery(checkQuery, checkValues, (error, results) => {
            if (error) {
                console.error('Error checking menu_id:', error);
                return res.status(500).json({
                    message: 'Error checking menu_id',
                    error: error.message
                });
            }

            if (results.length === 0) {
                // If menu_id does not exist, return an error
                return res.status(404).json({ error: 'Menu ID not found' });
            }

            // Update the menu item
            // Construct the DELETE query
            const query = 'DELETE FROM menu WHERE id = ?';
            const values = [id];

            // Execute the DELETE query
            executeQuery(query, values, (error, results) => {
                if (error) {
                    console.error('Error deleting data from the database:', error);
                    return res.status(500).json({
                        message: 'Error deleting data from the database',
                        error: error.message
                    });
                }
                console.log('Data deleted from the database:', results);
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
