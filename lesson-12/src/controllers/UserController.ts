import {Get, Post, Patch, Delete, Param, Body, JsonController, HttpError} from "routing-controllers";
import {ValidateArgs} from "../decorators/validator";
import {promises as fs} from "fs";
import path = require("path");

const usersFilePath = path.resolve(__dirname, "../../files/users.json");

interface User {
    id: number;
    user: string;
    email: string;
}

const readUsersFromFile = async (): Promise<User[]> => {
    try {
        const data = await fs.readFile(usersFilePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading users file:", error);
        return [];
    }
};

const writeUsersToFile = async (users: User[]) => {
    try {
        await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), "utf-8");
    } catch (error) {
        console.error("Error writing to users file:", error);
    }
};

@JsonController()
export class UserController {
    @Get("/")
    getAuthor() {
        return {author: "Yaroslav Michkivskyi"};
    }

    @Get("/users")
    async getAllUsers() {
        return await readUsersFromFile();
    }

    @Post("/users")
    @ValidateArgs("User validation")
    async createUser(@Body() body: { user: string; email: string }) {
        const users = await readUsersFromFile();
        const newUser: User = {
            id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
            ...body,
        };

        users.push(newUser);
        await writeUsersToFile(users);

        return {message: "User created", user: newUser};
    }

    @Patch("/users/:id")
    @ValidateArgs("User update validation")
    async updateUser(@Param("id") id: string, @Body() body: { user?: string; email?: string }) {
        const users = await readUsersFromFile();
        const userIndex = users.findIndex((user) => user.id === Number(id));

        if (userIndex === -1) {
            throw new HttpError(404, "User not found");
        }

        users[userIndex] = {...users[userIndex], ...body};
        await writeUsersToFile(users);

        return {message: "User updated", user: users[userIndex]};
    }

    @Delete("/users/:id")
    async deleteUser(@Param("id") id: string) {
        const users = await readUsersFromFile();
        const filteredUsers = users.filter((user) => user.id !== Number(id));

        if (filteredUsers.length === users.length) {
            throw new HttpError(404, "User not found");
        }

        await writeUsersToFile(filteredUsers);

        return {message: "User deleted"};
    }
}