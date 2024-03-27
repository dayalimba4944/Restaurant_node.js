const db = require('../../db');
const { executeQuery } = require('../../db');

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
        } = req.query;

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

        if ( status == undefined && !booleanRegex.test(status) ) {
            errors.status = 'Status should be a string';
        }else if(!status){
            errors.status = 'Status is required';
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ message: 'Validation error', errors });
        }
        

        const query = 'INSERT INTO menu (menu_categories_id, menu_name, price, food_type, extra_spicy, menu_picture, discretion, status) VALUES (?, ?, ?, ?, ?, ?,?, ?)';
        const values = [menu_categories_id, menu_name, price, food_type, extra_spicy, menu_picture, discretion, status];

        // const query = 'INSERT INTO your_table_name (menu_categories_id, menu_name, price, food_type, extra_spicy, menu_picture, discretion, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        // const values = [menu_categories_id, menu_name, price, food_type, extra_spicy, menu_picture, discretion, status];

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
        
        // connection.query(query, values, (err, result) => {
        //     return res.status(200).json({
        //         message: 'Request data received successfully',
        //     });
        // });

        // Proceed with storing the data or further processing
        // For now, just returning success response
        // return res.status(200).json({
        //     message: 'Request data received successfully',
        // });
    } catch (error) {
        console.error('Error handling request:', error);
        return res.status(500).json({
            message: 'Error handling request',
            error: error.message
        });
    }
};


// exports.store = async (req, res) => {
//     try {
//         // Access the incoming request data from the body
//         // const requestData = req.query;
//         // const requestData = req.body;
//         const { name, email } = req.query;

//         // Perform validation
//         let errors = {};
//         if (!name) {
//             errors.name = 'Name is required in the request body';
//         }

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//         // Function to validate email address
//         function validateEmail(email) {
//             return emailRegex.test(email);
//         }

//         if (!email) {
//             errors.email = 'Email is required in the request body';
//         } else if (!validateEmail(email)) {
//             errors.email = 'Email is not in a valid format. Example: abc@gmail.com';
//         }

//         // Check if there are validation errors
//         if (Object.keys(errors).length > 0) {
//             return res.status(400).json({ message: 'Validation failed', errors });
//         }

//         // Log the request data
//         console.log('Incoming request data:', { name, email });

//         // Return the request data in the response
//         return res.status(200).json({
//             message: 'Request data received successfully',
//             data: { name, email }
//         });
//     } catch (error) {
//         console.error('Error handling request:', error);
//         return res.status(500).json({
//             message: 'Error handling request',
//             error: error.message
//         });
//     }
// };



// 
// exports.store = async (req, res) => {
//     try {
//         // Validate the incoming request data
//         const validatedData = req.body;

//         // Construct the SQL query to insert data into the database
//         const query = `INSERT INTO your_table_name 
//             (menu_categories_id, menu_name, Price, food_type, extra_spicy, 
//             menu_picture, discretion, status, created_at, updated_at) 
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`;

//         if (!req.body || !req.body.menu_categories_id) {
//             return res.status(400).json({
//                 message: 'Invalid request body. Please provide menu_categories_id.',
//             });
//         }

//         const values = [
//             validatedData.menu_categories_id,
//             validatedData.menu_name,
//             validatedData.Price,
//             validatedData.food_type,
//             validatedData.extra_spicy,
//             validatedData.menu_picture,
//             validatedData.discretion,
//             validatedData.status
//         ];

//         // Execute the SQL query
//         db.executeQuery(query, values, (error, result) => {
//             if (error) {
//                 console.error('Error creating data:', error);
//                 return res.status(500).json({
//                     message: 'Error creating data',
//                     error: error.message
//                 });
//             }
//             // Data insertion successful, return a success response
//             return res.status(201).json({
//                 message: 'Data created successfully',
//                 data: result // Assuming result contains the newly inserted data
//             });
//         });
//     } catch (error) {
//         console.error('Error creating data:', error);
//         return res.status(500).json({
//             message: 'Error creating data',
//             error: error.message
//         });
//     }
// };




// exports.store = async (req, res) => {
// //     try {
// //         const {
// //             restaurant_id,
// //             name,
// //             email,
// //             phone_primary,
// //             phone_secondary,
// //             address,
// //             latitude,
// //             longitude,
// //             sitting_area_ids,
// //             payment_mode,
// //             status
// //         } = req.body;

// //         const branche = new Branche({
// //             restaurant_id,
// //             name,
// //             email,
// //             phone_primary,
// //             phone_secondary,
// //             address,
// //             latitude,
// //             longitude,
// //             sitting_area_ids,
// //             payment_mode,
// //             status
// //         });

// //         await branche.save();

// //         return res.status(201).json({ message: 'Branche created successfully' });
// //     } catch (error) {
// //         return res.status(500).json({ message: 'Internal server error', error });
// //     }
// // };
// };
exports.update = (req, res) => {

};
    

exports.delete = (req, res) => {

};
