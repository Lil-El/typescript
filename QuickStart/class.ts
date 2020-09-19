class Student {
  fullName: string;
  constructor(
    public firstname: string,
    public middleInital: string,
    public lastname: string
  ) {
    this.fullName = firstname + " " + middleInital + " " + lastname;
  }
}

interface Person {
  firstname: string;
  lastname: string;
}

function greeter(person: Person) {
  return "Hello, " + person.firstname + " " + person.lastname;
}

let user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user);
