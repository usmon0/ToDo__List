let input = document.querySelector(".addToDo input");
let form = document.querySelector("form");
let ul = document.querySelector(".todoList");
let btns = document.querySelector(".btns");
let body = document.querySelector(".todo-wrapper");
let line = document.querySelector(".line");
let delAll = document.querySelector(".delAll");
let delComplete = document.querySelector(".delComplete");

let todos = [];

let addTask = () => {
  if (input.value.trim().length) {
    todos.push({
      text: input.value,
      id: Date.now(),
      isComleted: false,
    });
  }
};

const toggleIsCompleted = (id) => {
  let task = todos.find((el) => el.id === id);
  task.isComleted = !task.isComleted;
};

let createTaskNode = (obj) => {
  const li = document.createElement("li");
  li.classList.add("ToDo");
  li.innerHTML = `
    <input type="checkbox" name="" id="input">
    <p>${obj.text}</p>
    <button>❌</button>
    `;
  const check = li.querySelector("#input");
  check.addEventListener("change", () => toggleIsCompleted(obj.id));
  return li;
};

let renderTaskNode = () => {
  ul.innerHTML = "";
  todos.forEach((el) => ul.append(createTaskNode(el)));
};

btns.remove();
ul.remove();
line.remove();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
  renderTaskNode();
  input.value = "";
  let btn = ul.querySelectorAll("button");
  btn.forEach((el) =>
    el.addEventListener("click", () => {
      let index = todos.indexOf(el.parentElement.children[1].textContent);
      todos.splice(index, 1);
      console.log(todos);
      el.parentElement.remove();
      if (todos.length > 0) {
        body.append(line);
        body.append(ul);
        body.append(btns);
      } else {
        btns.remove();
        ul.remove();
        line.remove();
      }
    })
  );
  if (todos.length > 0) {
    body.append(line);
    body.append(ul);
    body.append(btns);
  } else {
    btns.remove();
    ul.remove();
    line.remove();
  }
});

delAll.addEventListener("click", () => {
  todos = [];
  ul.innerHTML = "";
  console.log(todos);
  if (todos.length > 0) {
    body.append(line);
    body.append(ul);
    body.append(btns);
  } else {
    btns.remove();
    ul.remove();
    line.remove();
  }
});

delComplete.addEventListener("click", () => {
  let checkbox = ul.querySelectorAll("input");
  checkbox.forEach((el) => {
    if (el.checked) {
      let index = todos.indexOf(el.parentElement.children[1].textContent);
      todos.splice(index, 1);
      el.parentElement.remove();
    }
    if (todos.length > 0) {
      body.append(line);
      body.append(ul);
      body.append(btns);
    } else {
      btns.remove();
      ul.remove();
      line.remove();
    }
  });
  if (todos.length > 0) {
    body.append(line);
    body.append(ul);
    body.append(btns);
  } else {
    btns.remove();
    ul.remove();
    line.remove();
  }
});
