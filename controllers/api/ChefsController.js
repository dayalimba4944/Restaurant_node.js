const db = require('../../db');
const { executeQuery } = require('../../db');
const multer = require('multer');
const upload = multer();


exports.index = (req, res) => {
    const query = 'SELECT * FROM chefs';
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

exports.store = async (req, res) => {
    try {
        const {
            chef_category_id,
            name,
            email,
            contact_number,
            address,
            facebook,
            instagram,
            linkedin,
            twitter
        } = req.body;

        const errors = {};

        // Validation rules
        if (!chef_category_id) {
            errors.chef_category_id = 'Chef category ID is required';
        }

        if (!name) {
            errors.name = 'Chef name is required';
        }

        if (!email) {
            errors.email = 'Email is required';
        }


        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ message: 'Validation error', errors });
        }

        const query = 'INSERT INTO chefs (chef_category_id, name , email, contact_number, address, facebook, instagram, linkedin, twitter) VALUES (?, ? ,?, ?, ?, ?, ?, ?, ?)';
        const values = [chef_category_id, name , email, contact_number, address, facebook, instagram, linkedin, twitter];

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
            chef_id,
            chef_category_id,
            email,
            contact_number,
            address,
            facebook,
            instagram,
            linkedin,
            twitter
        } = req.body;

        if (!req.body) {
            return res.status(400).json({ message: 'Validation error', reqbody: req.body });
        }

        const errors = {};

        // Validation rules
        if (!chef_id) {
            errors.chef_id = 'Chef ID is required';
        }

        if (!chef_category_id) {
            errors.chef_category_id = 'Chef category ID is required';
        }

        if (!email) {
            errors.email = 'Email is required';
        }

        // Add more validation rules for other fields if necessary

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ message: 'Validation error', errors });
        }

        // Check if chef_id exists
        const checkQuery = 'SELECT * FROM chefs WHERE id = ?';
        const checkValues = [chef_id];

        executeQuery(checkQuery, checkValues, (error, results) => {
            if (error) {
                console.error('Error checking chef_id:', error);
                return res.status(500).json({
                    message: 'Error checking chef_id',
                    error: error.message
                });
            }

            if (results.length === 0) {
                // If chef_id does not exist, return an error
                return res.status(404).json({ error: 'Chef ID not found' });
            }

            // Update the chef data
            const updateQuery = 'UPDATE chefs SET chef_category_id = ?, email = ?, contact_number = ?, address = ?, facebook = ?, instagram = ?, linkedin = ?, twitter = ? WHERE id = ?';
            const updateValues = [chef_category_id, email, contact_number, address, facebook, instagram, linkedin, twitter, chef_id];

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
        const chef_id = req.params.id;

        // Check if chef_id exists
        const checkQuery = 'SELECT * FROM chefs WHERE id = ?';
        const checkValues = [chef_id];

        executeQuery(checkQuery, checkValues, (error, results) => {
            if (error) {
                console.error('Error checking chef_id:', error);
                return res.status(500).json({
                    message: 'Error checking chef_id',
                    error: error.message
                });
            }

            if (results.length === 0) {
                // If chef_id does not exist, return an error
                return res.status(404).json({ error: 'Chef ID not found' });
            }

            // Delete the chef data
            const deleteQuery = 'DELETE FROM chefs WHERE id = ?';
            const deleteValues = [chef_id];

            // Execute the DELETE query
            executeQuery(deleteQuery, deleteValues, (error, results) => {
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
