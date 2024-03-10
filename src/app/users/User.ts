// @ts-ignore
import {v4 as uuidv4} from 'uuid';

const uuid = uuidv4();

export class User {
    constructor(userName: string, email: string) {
        this.userId = uuidv4();
        this.userName = userName;
        this.email = email;
        // console.log(UserAccountStatus.CREATED);
        // this.status = UserAccountStatus.CREATED;
    }

    userId: string;
    userName!: string;
    email!: string;
    phone!: string;
    dateOfBirth!: Date;
    // status!: UserAccountStatus;
}
