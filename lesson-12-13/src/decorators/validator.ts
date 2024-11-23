import { HttpError } from "routing-controllers";

export function ValidateArgs(test: string) {
    console.log(`Decorator initialized with test: ${test}`);

    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {

            const body = args.find((arg) => typeof arg === "object" && arg !== null && !Array.isArray(arg));

            if (!body || typeof body !== "object") {
                throw new HttpError(400, "Invalid data format");
            }

            if (!body.user || body.user.length < 2) {
                throw new HttpError(400, "User name must be at least 2 characters long");
            }

            if (!body.email || !body.email.includes("@")) {
                throw new HttpError(400, "Invalid email format");
            }

            return originalMethod.apply(this, args);
        };

        return descriptor;
    };
}