import {MongoClient, Db} from 'mongodb';

const url: string = `mongodb+srv://rootuser:yRBEW9dUlHHZAunv@shoppingbackend.qitqkvk.mongodb.net/?retryWrites=true&w=majority&appName=ShoppingBackend`;
const dbName = 'ShoppingBackend';



let client: MongoClient | null = null;
let db: Db | null = null;

export async function connect(): Promise<void> {
    if (!client) {
        try {
            client = new MongoClient(url);
            await client.connect();
            console.log('Connected to MongoDB');
            db = client.db(dbName);
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }
}

export function getDb(): Db {
    if (!db) {
        throw new Error('Database is not connected');
    }
    return db;
}

