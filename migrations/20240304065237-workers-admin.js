import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config()

export const up = async (db, client) => {
  try {
    // Ensure the MongoDB client is connected
    if (!client.isConnected) await client.connect();

    const generateHashString = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync());
    const password = generateHashString(process.env.G27_PASSWORD)
    await db.collection('workers').insertOne(
      {
        firstName: process.env.G27_FIRSTNAME,
        lastName: process.env.G27_LASTNAME,
        email: process.env.G27_EMAIL,
        street: process.env.G27_STREET,
        location: process.env.G27_LOCATION,
        iban: process.env.G27_IBAN,
        password
      }
    )
    console.log('Migration up successfully completed.');
  } catch (e) {
    console.error('Error during migration:', e);
    throw e; // Rethrow the error to stop the migration process
  }
}

export const down = async (db, client) => {
  try {
    // Ensure the MongoDB client is connected
    if (!client.isConnected) await client.connect();

    // Delete all documents from the 'workers' collection
    await db.collection('workers').deleteMany({});

    console.log('Migration down successfully completed.');
  } catch (e) {
    console.error('Error during migration:', e);
    throw e; // Rethrow the error to stop the migration process
  }
};