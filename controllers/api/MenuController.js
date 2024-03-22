const db = require('../../db');

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


exports.store = async (req, res) => {
    try {
        // Access the incoming request data (req.body)
        const requestData = req.body;

        // Log the request data
        console.log('Incoming request data:', requestData);

        // Return the request data in the response
        return res.status(200).json({
            message: 'Request data received successfully',
            data: requestData
        });
    } catch (error) {
        console.error('Error handling request:', error);
        return res.status(500).json({
            message: 'Error handling request',
            error: error.message
        });
    }
};


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
