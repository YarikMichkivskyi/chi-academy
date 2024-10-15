class Transport {
    ride() {
        throw new Error("Method 'ride()' must be implemented.");
    }

    stop() {
        throw new Error("Method 'stop()' must be implemented.");
    }
}

class Car extends Transport {
    ride() {
        console.log("Car is driving");
    }
    stop() {
        console.log("Car has stopped");
    }
}

class Bike extends Transport {
    ride() {
        console.log("Bike is riding");
    }

    stop() {
        console.log("Bike has stopped");
    }
}

class TransportFactory {
    static createTransport(type) {
        if (type === 'car') {
            return new Car();
        } else if (type === 'bike') {
            return new Bike();
        } else {
            throw new Error("Unknown transport type");
        }
    }
}

const car = TransportFactory.createTransport('car');
car.ride();
car.stop();

const bike = TransportFactory.createTransport('bike');
bike.ride();
bike.stop();
