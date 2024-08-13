import { db } from './SQLite';
import data from '../data/Data';
import CustomerData from '../data/CustomerData';

export function createTable() {
    db.transaction(async tx => {
        await tx.executeSql(`
            CREATE TABLE IF NOT EXISTS dm_soghichiso (
                id_soghi INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                households INTEGER NOT NULL,
                records INTEGER NOT NULL,
                images INTEGER NOT NULL
            );
        `);

        await tx.executeSql(`
            CREATE TABLE IF NOT EXISTS customers (
                id_customer INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                lat REAL,
                long REAL,
                id_soghi INTEGER,
                FOREIGN KEY (id_soghi) REFERENCES dm_soghichiso (id_soghi)
            );
        `);

        await tx.executeSql(`
            CREATE TABLE IF NOT EXISTS images (
                id_image INTEGER PRIMARY KEY AUTOINCREMENT,
                filename NVARCHAR(100),
                uri nvarchar(100),
                id_customer INTEGER,
                FOREIGN KEY (id_customer) REFERENCES customers (id_customer)
            );
        `)
    }, (error) => {
        console.log('Nothing have changed: ', error);
    }, () => {
        console.log('Tables created successfully');
    });
}

export function insertIntoTable() {
    try {
        db.transaction(tx => {
            const insertSoghiStmt = `INSERT INTO dm_soghichiso (title, households, records, images) VALUES (?, ?, ?, ?)`;

            data.forEach(item => {
                tx.executeSql(insertSoghiStmt, [item.title, item.households, item.records, item.images], (_, result) => {
                    const id_soghi = result.insertId;

                    const insertCustomerStmt = `INSERT INTO customers (name, lat, long, id_soghi) VALUES (?, ?, ?, ?)`;

                    if (CustomerData[item.id]) {
                        CustomerData[item.id].forEach(customer => {
                            tx.executeSql(insertCustomerStmt, [customer.name, customer.lat, customer.long, id_soghi]);
                        });
                    }
                });
            });
        }, (error) => {
            console.log('transaction error:', error);
        }, () => {
            console.log('Data inserted successfully');
        });
    } catch (error) {
        console.log('Error inserting data:', error);
    }
}

export async function getRecords() {
    return new Promise((resolve) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM dm_soghichiso;`,
                [],
                (tx, results) => {
                    resolve(results.rows._array);
                }
            );
        });
    });
}

export async function getCustomers(recordID) {
    return new Promise((resolve) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM customers WHERE id_soghi = ?;`,
                [recordID],
                (tx, results) => {
                    resolve(results.rows._array);
                }
            );
        });
    });
}

export async function updateLatLongLocation(customer) {
    return new Promise((resolve) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE customers SET lat = ?, long = ? WHERE id_customer = ?`,
                [
                    customer.lat,
                    customer.long,
                    customer.id_customer,
                ], () => {
                    resolve("Location updated successfully");
                }
            );
        });
    });
}

export async function saveImage(images, customerId) {
    return new Promise((resolve, reject) => {
      images.forEach(image => {
        db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO images (filename, uri, id_customer) VALUES (?, ?, ?)',
            [image.filename, image.uri, customerId],
            () => {
              resolve("Image created successfully");
            },
            (tx, error) => {
              reject("Error saving image: ", error);
            }
          );
        });
      });
    });
  };
  
export async function loadImages(customerId) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM images WHERE id_customer = ?',
                [customerId],
                (_, { rows: { _array } }) => {
                    resolve(_array);
                },
                (tx, error) => {
                    console.log('Error loading images: ', error);
                    reject(error);
                }
            );
        });
    });
};