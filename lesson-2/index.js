const part1 = () => {
    function addParamsToRequest(params) {
        let count = 0;

        return function (data) {
            return {
                ...params,
                data: data,
                count: count++
            };
        };
    }

    const sendData = addParamsToRequest({params: "params"});

    const result = sendData({data: "data"});

    console.log(result);
}

const part2 = () => {
    const obj = {
        getData: function () {
            console.log(`Person name is: ${this.name} and age ${this.age}`);
        }
    };

    obj.getData.call({name: 'John', age: 30});

    function createDataGetter(name, age) {
        return  obj.getData.bind({name, age})
    }

    const getJohnData = createDataGetter('John', 30);
    getJohnData();
}

const part3 = () => {
    const root = {
        name: 'name',
        type: 'folder',
        children: [
            {
                name: 'folder 1',
                type: 'folder',
                children: [
                    {
                        name: 'folder 2',
                        type: 'folder',
                        children: [
                            {
                                name: 'file 3',
                                type: 'file',
                                size: 30
                            }
                        ]
                    }
                ]
            },
            {
                name: 'file 1',
                type: 'file',
                size: 10
            },
            {
                name: 'file 2',
                type: 'file',
                size: 20
            }
        ]
    };

    function findFiles(node) {
        let files = [];

        if (node.type === 'file') {
            files.push(node.name);
        }

        if (node.type === 'folder' && node.children) {
            for (const child of node.children) {
                files = files.concat(findFiles(child));
            }
        }

        return files;
    }

    console.log(findFiles(root));
}

const part4ES6 = () => {
    class Human {
        constructor(name, phone) {
            this.name = name;
            this.phone = phone;
        }

        introduce() {
            console.log(`Привіт, мене звати ${this.name}, мій номер ${this.phone}.`);
        }
    }

    class Student extends Human {
        constructor(name, phone, course) {
            super(name, phone);
            this.course = course;
        }

        study() {
            console.log(`Я навчаюся на ${this.course} курсі.`);
        }
    }

    class Teacher extends Human {
        constructor(name, phone, subject) {
            super(name, phone);
            this.subject = subject;
        }

        teach() {
            console.log(`Я викладаю ${this.subject}.`);
        }
    }

    const student = new Student('Василь', '111', 2);
    student.introduce();
    student.study();

    const teacher = new Teacher('Петро', '222', 'Математика');
    teacher.introduce();
    teacher.teach();
}

const part4ES5 = () => {
    function Human(name, phone) {
        this.name = name;
        this.phone = phone;
    }

    Human.prototype.introduce = function() {
        console.log(`Привіт, мене звати ${this.name}, мій номер ${this.phone}.`);
    };

    function Student(name, phone, course) {
        Human.call(this, name, phone);
        this.course = course;
    }
    Student.prototype = Object.create(Human.prototype);
    Student.prototype.constructor = Student;
    Student.prototype.study = function() {
        console.log(`Я навчаюся на ${this.course} курсі.`);
    };

    function Teacher(name, phone, subject) {
        Human.call(this, name, phone);
        this.subject = subject;
    }
    Teacher.prototype = Object.create(Human.prototype);
    Teacher.prototype.constructor = Teacher;
    Teacher.prototype.teach = function() {
        console.log(`Я викладаю ${this.subject}.`);
    };

    const student = new Student('Василь', '111', 2);
    student.introduce();
    student.study();

    const teacher = new Teacher('Петро', '222', 'Математика');
    teacher.introduce();
    teacher.teach();
}

part1();
part2();
part3();
part4ES6();
part4ES5();
