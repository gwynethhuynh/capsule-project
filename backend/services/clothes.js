import dbConnection from './mysql-db.js';


// export function getShirt() {
//     const rows = query(
//         'SELECT * from shirts'
//     );
//     console.log("GOT ROWS!", rows)
//     // console.log(rows);
//     return rows;
// }

export const getShirt = (req, res) => {

    console.log("GETTING SHIRT!");
    let sqlQuery = 'SELECT * from shirts';

    results = dbConnection.query(sqlQuery, (error, results) => {
        if (error) {
            console.log("THERE WAS AN ERROR TRYING TO QUERY!");
            throw error;
        } 
        console.log("WE WERE ABLE TO QUERY!");
        console.log(results);
        return results;
        
        // res.status(200).json(results);
    });
    console.log(results);
};

export async function getBottoms() {
    const rows = await query(
        'SELECT * from bottoms'
    );
    console.log(rows);
    return rows;
}

export async function getRatings() {
    const rows = await query(
        'SELECT * from ratings'
    );
    console.log(rows);
    return rows;
}

// getShirt();
// getBottoms();
// getRatings();

