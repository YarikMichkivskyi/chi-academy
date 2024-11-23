import { Get, Post, Patch, Delete, Param, Body, JsonController, HttpError } from "routing-controllers";
import { AppDataSource } from "../data-source"; // Файл з підключенням до бази
import { User } from "../entities/user.entity";
import { ValidateArgs } from "../decorators/validator";

@JsonController()
export class UserController {
    @Get("/")
    getAuthor() {
        return { author: "Yaroslav Michkivskyi" };
    }

    @Get("/users")
    async getAllUsers() {
        const userRepository = AppDataSource.getRepository(User);
        return await userRepository.find();
    }

    @Post("/users")
    @ValidateArgs("User validation")
    async createUser(@Body() body: { user: string; email: string }) {
        const userRepository = AppDataSource.getRepository(User);

        const newUser = userRepository.create(body);
        await userRepository.save(newUser);

        return { message: "User created", user: newUser };
    }

    @Patch("/users/:id")
    @ValidateArgs("User update validation")
    async updateUser(@Param("id") id: string, @Body() body: { user?: string; email?: string }) {
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ id: Number(id) });
        if (!user) {
            throw new HttpError(404, "User not found");
        }

        Object.assign(user, body);
        await userRepository.save(user);

        return { message: "User updated", user };
    }

    @Delete("/users/:id")
    async deleteUser(@Param("id") id: string) {
        const userRepository = AppDataSource.getRepository(User);

        const result = await userRepository.delete({ id: Number(id) });
        if (result.affected === 0) {
            throw new HttpError(404, "User not found");
        }

        return { message: "User deleted" };
    }
}