
import {Db, Collection} from 'mongodb';
import {User} from './User';
// @ts-ignore
import {v4 as uuidv4} from 'uuid';
import {getDb} from "../../db";

async function getUserCollection(): Promise<Collection<User>> {
    const db = getDb();
    return db.collection<User>('users');
}

export const userService = {
    async createUser(userData: Omit<User, 'userId'>): Promise<User> {
        userData.createdTime = Date.now().toString();
        userData.lastUpdatedTime = Date.now().toString();
        const userId = uuidv4();
        const userCollection = await getUserCollection();
        const createdTime = new Date();
        const userWithTimestamps: User = {userId, ...userData};
        const result = await userCollection.insertOne(userWithTimestamps);
        return userId;
    },

    async getUserById(userId: string): Promise<User | null> {
        const userCollection = await getUserCollection();
        return userCollection.findOne({userId});
    },

    async updateUser(userId: string, updatedUserData: Partial<User>): Promise<User | null> {
        const userCollection = await getUserCollection();
        updatedUserData.lastUpdatedTime = Date.now().toString();
        const result = await userCollection.findOneAndUpdate(
            {userId},
            {$set: updatedUserData},
            // @ts-ignore
            {returnOriginal: false}
        );
        return result.value;
    },

    async deleteUser(userId: string): Promise<void> {
        const userCollection = await getUserCollection();
        await userCollection.deleteOne({userId});
    },

    async getAllUsers(): Promise<User[]> {
        const userCollection = await getUserCollection();
        return userCollection.find().toArray();
    },
};
