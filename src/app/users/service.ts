import {User} from "./User";
// @ts-ignore
import {v4 as uuidv4} from "uuid";

const users: User[] = [];
const uuid = uuidv4();
export const userService = {
    async createUser(userData: User): Promise<User> {
        // Logic to create user
        console.log(userData, 'this is userData')
        const newUser = new User(userData.userName, userData.email)
        users.push(newUser);
        return newUser;
    },
    async getUserById(userId: string): Promise<User | undefined> {
        return users.find(user => user.userId === userId);
    },
    async updateUser(userId: string, updatedUserData: User): Promise<User | undefined> {
        const index = users.findIndex(user => user.userId === userId);
        if (index !== -1) {
            const updatedUser: User = {...users[index], ...updatedUserData};
            users[index] = updatedUser;
            return updatedUser;
        }
        return undefined;
    },
    async deleteUser(userId: string): Promise<void> {
        const index = users.findIndex(user => user.userId === userId);
        if (index !== -1) {
            users.splice(index, 1);
        }
    },
    async getAllUsers(){
        console.log('all users', users)
        return users || [];
    },
};
