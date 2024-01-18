let input = document.querySelector(".addToDo input");
let form = document.querySelector("form");
let ul = document.querySelector(".todoList");
let btns = document.querySelector(".btns");
let body = document.querySelector(".todo-wrapper");
let line = document.querySelector(".line");
let delAll = document.querySelector(".delAll");
let delComplete = document.querySelector(".delComplete");

let todos = [];

if (window.localStorage.length > 0) {
  todos = JSON.parse(window.localStorage.getItem("json"));
}

renderTaskNode();

let checkArr = (arr) => {
  if (arr.length > 0) {
    body.append(line);
    body.append(ul);
    body.append(btns);
  } else {
    btns.remove();
    ul.remove();
    line.remove();
  }
};

checkArr(todos);

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
  addLocal();
};

function createTaskNode(obj) {
  console.log(obj);
  const li = document.createElement("li");
  li.classList.add("ToDo");
  li.innerHTML = `
    <input type="checkbox" name="" id="input">
    <p >${obj.text}</p>
    <button class='redo'>✏️</button>
    <button class='del'>❌</button>
    `;
  const check = li.querySelector("#input");
  check.checked = obj.isComleted;
  check.addEventListener("change", () => toggleIsCompleted(obj.id));

  let edit = li.querySelector(".redo");
  edit.addEventListener("click", () => editTask(li, obj));

  let cros = li.querySelector(".del");
  cros.addEventListener("click", () => {
    li.remove();
    todos = todos.filter((el) => el.id !== obj.id);
    console.log(todos);
    addLocal();
    checkArr(todos);
  });
  return li;
}

function renderTaskNode() {
  ul.innerHTML = "";
  todos.forEach((el) => ul.append(createTaskNode(el)));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
  renderTaskNode();
  addLocal();
  checkArr(todos);
  input.value = "";
});

function editTask(el, obj) {
  el.innerHTML = `
     <input type="checkbox" name="" id="input">
     <input class='redoText' type='text' value='${obj.text}' >
     <button class='redov'>✅</button>
     <button class='delv'>❌</button>
     `;
  let edit = el.querySelector(".redov");
  let input = el.querySelector(".redoText");
  edit.addEventListener("click", () => {
    if (input.value == "") {
      obj.text;
    } else {
      obj.text = input.value;
    }
    addLocal();
    el.replaceWith(createTaskNode(obj));
  });
}

delAll.addEventListener("click", () => {
  todos = [];
  ul.innerHTML = "";
  addLocal();
  checkArr(todos);
});

delComplete.addEventListener("click", () => {
  todos = todos.filter((el) => !el.isComleted);
  ul.innerHTML = "";
  renderTaskNode();
  addLocal();
  checkArr(todos);
});

function trueFalse(num) {
  // if (num == 1) {
  //   return true;
  // } else {
  //   return false;
  // }
  num == 1 ? true : false;
}

function addLocal() {
  let json = JSON.stringify(todos);
  window.localStorage.setItem("json", json);
}
