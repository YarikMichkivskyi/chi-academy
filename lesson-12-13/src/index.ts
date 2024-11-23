import "reflect-metadata";
import {createExpressServer} from "routing-controllers";
import {UserController} from "./controllers/UserController";
import {AppDataSource} from "./data-source";

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");

        const app = createExpressServer({
            controllers: [UserController],
        });

        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });