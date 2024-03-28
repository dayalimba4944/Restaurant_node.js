const db = require('../../db');
const { executeQuery } = require('../../db');
const multer = require('multer');
const upload = multer();


exports.index = (req, res) => {
    const query = 'SELECT * FROM menu';
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
            menu_categories_id,
            menu_name,
            price,
            food_type,
            extra_spicy,
            menu_picture,
            discretion,
            status
        } = req.body;

        const errors = {};

        // Validation rules
        if (!menu_categories_id) {
            errors.menu_categories_id = 'Menu categories ID is required';
        }

        if (!menu_name) {
            errors.menu_name = 'Menu name is required';
        }

        if (!price) {
            errors.price = 'Price is required';
        }

        if (!food_type) {
            errors.food_type = 'Food type is required';
        }

        if (extra_spicy === undefined || !booleanRegex.test(extra_spicy)) {
            errors.extra_spicy = 'Extra spicy should be a boolean value';
            console.log(extra_spicy);
        }


        if (discretion == undefined && typeof discretion == 'string') {
            errors.discretion = 'Discretion should be a string';
        }

        if (status == undefined && !booleanRegex.test(status)) {
            errors.status = 'Status should be a string';
        } else if (!status) {
            errors.status = 'Status is required';
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ message: 'Validation error', errors });
        }


        const query = 'INSERT INTO menu (menu_categories_id, menu_name, price, food_type, extra_spicy, menu_picture, discretion, status) VALUES (?, ?, ?, ?, ?, ?,?, ?)';
        const values = [menu_categories_id, menu_name, price, food_type, extra_spicy, menu_picture, discretion, status];


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

// MenuController.js

// MenuController.js
// exports.update = (req, res) => {
//     try {
//         console.log("Incoming request:");
//         console.log("HTTP Method:", req.method);
//         console.log("URL:", req.url);
//         console.log("Headers:", req.headers);
//         console.log("Request Body:", req.body);

//         // Accessing specific fields from the request body
//         const { menu_categories_id, menu_name, Price, food_type, extra_spicy, menu_picture, discretion, status } = req.body;

//         // Now you can use these variables to perform any operations you need
//         // For example, you can save them to a database, perform validation, etc.

//         return res.status(200).json({
//             message: 'Received request successfully',
//             reqmethod: req.method,
//             requrl: req.url,
//             reqheaders: req.headers,
//             reqbody: req.body,
//             reqbodymenu_categories_id: menu_categories_id ?? null
//         });

//     } catch (error) {
//         console.error('Error handling request:', error);
//         return res.status(500).json({
//             message: 'Error handling request',
//             error: error.message
//         });
//     }
// };




exports.update = (req, res) => {
    try {
        const {
            menu_id,
            menu_categories_id,
            menu_name,
            price,
            food_type,
            extra_spicy,
            menu_picture,
            discretion,
            status
        } = req.body;

        if (!req.body) {
            return res.status(400).json({ message: 'Validation error', reqbody: req.body });
        }

        const errors = {};

        // Validation rules
        if (!menu_id) {
            errors.menu_id = 'Menu ID is required';
        }

        if (!menu_categories_id) {
            errors.menu_categories_id = 'Menu categories ID is required';
        }

        if (!menu_name) {
            errors.menu_name = 'Menu name is required';
        }

        if (!price) {
            errors.price = 'Price is required';
        }

        if (!food_type) {
            errors.food_type = 'Food type is required';
        }

        if (extra_spicy === undefined || !booleanRegex.test(extra_spicy)) {
            errors.extra_spicy = 'Extra spicy should be a boolean value';
            console.log(extra_spicy);
        }


        if (discretion == undefined && typeof discretion == 'string') {
            errors.discretion = 'Discretion should be a string';
        }

        if (status == undefined && !booleanRegex.test(status)) {
            errors.status = 'Status should be a string';
        } else if (!status) {
            errors.status = 'Status is required';
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ message: 'Validation error', errors });
        }

        // Check if menu_id exists
        const checkQuery = 'SELECT * FROM menu WHERE id = ?';
        const checkValues = [menu_id];

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
            const updateQuery = 'UPDATE menu SET menu_categories_id = ?, menu_name = ?, price = ?, food_type = ?, extra_spicy = ?, menu_picture = ?, discretion = ?, status = ? WHERE id = ?';
            const updateValues = [menu_categories_id, menu_name, price, food_type, extra_spicy, menu_picture, discretion, status, menu_id];

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
        const menu_id = req.params.id;

        // Check if menu_id exists
        const checkQuery = 'SELECT * FROM menu WHERE id = ?';
        const checkValues = [menu_id];

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
            const values = [menu_id];

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
