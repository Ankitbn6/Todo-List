let todolist = JSON.parse(localStorage.getItem("todolist")) || [];
function Todo(t) {
  this.title = t;
  this.status = false;
  this.id=new Date();
}
document.getElementById("addList").addEventListener("click", () => {
  addTodo();
});

function addTodo() {
  let title = document.getElementById("inputTodo");
  if (title.value.trim() != "") {
    let todo = new Todo(title.value);
    todolist.push(todo);
    localStorage.setItem("todolist", JSON.stringify(todolist));
    showTodo();
    title.value = null;
  }
}

function deleteTodo(ele){
  let todo1=JSON.parse(localStorage.getItem("todolist"));
  for(let i=0;i<todo1.length;i++){
    if(todo1[i].id==ele.id){
      todo1.splice(i,1);
      i--;
    }
  }
  localStorage.setItem("todolist", JSON.stringify(todo1));
  showTodo();
}
function checkbox(ele){
  let todo1=JSON.parse(localStorage.getItem("todolist"));
  todo1=todo1.map((item)=>{
    if(item.id===ele.id){
      return({
        ...item,
        status:!item.status
      });
    }
    else{
      return item;
    }
  })
  todo1.sort((a,b)=>a.status-b.status)
  localStorage.setItem("todolist",JSON.stringify(todo1));
  showTodo();
}

function showTodo() {
  let container = document.getElementById("todolist");
  container.innerHTML = "";
  todolist = JSON.parse(localStorage.getItem("todolist")) || [];
  todolist.sort((a,b)=>a.status-b.status);
  todolist.map((ele) => {
    let todoItem = document.createElement("div");
    todoItem.setAttribute("id",ele.id);

    let check_title = document.createElement("div");
    check_title.setAttribute("class","dualElement");

    let check_img = document.createElement("img");
    check_img.addEventListener("click",()=>{checkbox(ele)})
    if (ele.status === true) {
      check_img.src = "./image/checked.png";
    } else {
      check_img.src = "./image/unchecked.png";
    }

    let title = document.createElement("input");
    title.value=ele.title;
    title.readOnly=true;
    title.setAttribute("id",ele.id);
    title.setAttribute("class","title_input")

    let edit_delete = document.createElement("div");
    edit_delete.setAttribute("class","dualElement");

    let edit_img = document.createElement("img");
    edit_img.src = "./image/edit.png";
    edit_img.addEventListener("click",()=>{
      title.readOnly=false;
            title.focus();
            title.addEventListener('blur',()=>{
                title.readOnly=true;
                ele.title=title.value;
                localStorage.setItem('todolist',JSON.stringify(todolist));
    })})

    let delete_img = document.createElement("img");
    delete_img.src = "./image/delete.png";
    delete_img.addEventListener("click",()=>{deleteTodo(ele)})

    check_title.append(check_img,title);
    edit_delete.append(edit_img,delete_img);
    todoItem.append(check_title, edit_delete);
    container.append(todoItem);
  });
}

showTodo();