const people = [
    { name: 'John', age: 25, pets: ['cat'] },
    { name: 'Jane', age: 19, pets: ['dog'] },
    { name: 'Joe', age: 30, pets: [] },
    { name: 'Jill', age: 18, pets: ['parrot'] },
];

const part1 = () => {
    for (let i = 0; i < 10; i++) {
        console.log(i + 1);
    }
    let i = 0;
    while (i < 10) {
        console.log(i + 1);
        i++;
    }
}

const part2 = () => {
    const mixedArray = [42, "Hello", true, undefined, null, 3.14, false, "World", -1];

    console.log("Перебір за допомогою forEach:");
    mixedArray.forEach(element => {
        console.log(typeof element);
    });

    console.log("\nПеребір за допомогою for:");
    for (let i = 0; i < mixedArray.length; i++) {
        console.log(typeof mixedArray[i]);
    }

    console.log("\nПеребір за допомогою while:");
    let index = 0;
    while (index < mixedArray.length) {
        console.log(typeof mixedArray[index]);
        index++;
    }

    console.log("\nПеребір за допомогою do while:");
    index = 0;
    do {
        console.log(typeof mixedArray[index]);
        index++;
    } while (index < mixedArray.length);
}

const part3 = () => {
    const olderThanTwenty = people.filter(person => person.age > 20);
    console.log("Люди старші за 20 років:", olderThanTwenty);
}

const part4 = () => {
    const updatedPeople = people.map(person => {
        person.pets.push('fish');
        return person;
    });

    console.log("Оновлений список людей з доданими рибками:");
    console.log(updatedPeople);
}

const part5 = () => {
    const arr = new Array(10).fill(42);
    console.log("Масив, заповнений числом 42:", arr);

    arr.splice(4, 0, 'answer');
    console.log("Масив з 'answer':", arr);

    const foundWord = arr.find(item => item === 'answer');
    console.log("Знайдене слово:", foundWord);
}

const part6 = () => {
    const person = {
        name: 'John',
        age: 25,
        isMarried: false,
        pets: ['cat', 'dog']
    };

    const keys = Object.keys(person);
    console.log("Ключі об'єкта:", keys);

    const hasAge = person.hasOwnProperty('age');
    console.log("Чи є ключ 'age'?", hasAge);

    const values = Object.values(person);
    console.log("Значення об'єкта:", values);
}

part1();
part2();
part3();
part4();
part5();
part6();