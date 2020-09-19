interface Person {
  firstname: string;
  lastname: string;
}
function greeter(person: Person) {
  //要求传进来的参数包含接口的结构，若user少其中一个就会报错
  return "Hello" + person.firstname + " " + person.lastname;
}
let user = {
  firstname: "Xiaodong",
  lastname: "Yan"
};
document.body.innerHTML = greeter(user);
