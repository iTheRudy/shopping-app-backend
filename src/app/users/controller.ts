import {Request, Response} from 'express';
import {userService} from './service';
import {User} from "./User";

const userController = {
    async createUser(req: Request, res: Response) {
        try {
            console.log(req.body, 'this is body');
            const newUser = await userService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            console.log(error);
            // @ts-ignore
            res.status(500).json({message: 'Failed to create user', error: error.message});
        }
    },
    async getUser(req: Request, res: Response) {
        try {
            const {userId} = req.params;
            const user = await userService.getUserById(userId);
            if (!user) {
                return res.status(404).json({message: 'User not found'});
            }
            res.json(user);
        } catch (error) {
            console.log(error);
            // @ts-ignore
            res.status(500).json({message: 'Failed to get user', error: error.message});
        }
    },
    async updateUser(req: Request, res: Response) {
        try {
            const {userId} = req.params;
            const updatedUser = await userService.updateUser(userId, req.body as User);
            if (!updatedUser) {
                return res.status(404).json({message: 'User not found'});
            }
            res.json(updatedUser);
        } catch (error) {
            console.log(error);
            // @ts-ignore
            res.status(500).json({message: 'Failed to update user', error: error.message});
        }
    },

    async deleteUser(req: Request, res: Response) {
        try {
            const {userId} = req.params;
            await userService.deleteUser(userId);
            res.sendStatus(204);
        } catch (error) {
            console.log(error);
            // @ts-ignore
            res.status(500).json({message: 'Failed to delete user', error: error.message});
        }
    },

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            console.log(error);
            // @ts-ignore
            res.status(500).json({ message: 'Failed to fetch users', error: error.message });
        }
    }
};

export default userController;
