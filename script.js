let addButton = document.getElementById("add-task-button");
let taskContent = document.getElementById("input-task");
let taskUl = document.getElementById("task-list");
let deleteButtons = document.querySelectorAll(".delete-btn")
let checkboxes = document.querySelectorAll(".task-checkbox")

let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

function taskFromLocalStorage(){
    for(const i in taskList){
        let taskText = taskList[i]["task"];
        let isChecked = taskList[i]["isChecked"];
        addTaskToList(taskText, isChecked, true);
    }
}

taskFromLocalStorage();

function deleteTask(button){
    let divButton = button.parentElement;
    let divContainer = divButton.parentElement;
    let divSpan = divContainer.children[1];
    let span = divSpan.children[0];
    let taskText = span.textContent;
    // remove from localstorage
    for(let i =0; i < taskList.length; i++){
        if(taskList[i]["task"] === taskText){
            taskList.splice(i, 1)
            localStorage.setItem("tasks", JSON.stringify(taskList));
        }
    }

    let li = divContainer.parentElement;
    li.remove();
}

function checkedTask(checkbox){
    let divCheckbox = checkbox.parentElement;
    let divContainer = divCheckbox.parentElement;
    let divSpan = divContainer.children[1];
    let span = divSpan.children[0];
    let taskText = span.textContent;
    if(checkbox.checked){
        span.classList.add("checked-task");
        for(let i =0; i < taskList.length; i++){
            if(taskList[i]["task"] === taskText){
                taskList[i]["isChecked"] = true;
            }
        }

    }else {
        span.classList.remove("checked-task");
        for(let i =0; i < taskList.length; i++){
            if(taskList[i]["task"] === taskText){
                taskList[i]["isChecked"] = false;
            }
        }
    }
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

function addTaskToList (taskText, isChecked = false, storageAdded = false){
    let li = document.createElement("li");
    //Flex-container for task div
    let divContainer = document.createElement('div');
    divContainer.className = "flex-container-list";

    // flex-checkbox div
    let divCheckbox = document.createElement("div");
    divCheckbox.className = "flex-checkbox";
    let input = document.createElement("input");
    input.type = "checkbox";
    if(isChecked){
        input.checked = true;
    }
    input.addEventListener("change", function (){
        checkedTask(input);
    })
    divCheckbox.appendChild(input);

    // flex-task div
    let divSpan = document.createElement("div");
    divSpan.className = "flex-task";
    let span = document.createElement("span");
    span.className = "task";
    span.textContent = taskText;
    if(isChecked){
        span.classList.add("checked-task");
    }
    divSpan.appendChild(span);

    // flex-delete-btn div
    let divButton = document.createElement("div");
    divButton.className = "flex-delete-btn";
    let button = document.createElement("button");
    button.className = "delete-btn";
    button.textContent = "X";
    // on-click listener for added button
    button.addEventListener("click", function (){
        deleteTask(button);
    });
    divButton.appendChild(button);

    // appending every div element to container then to li and li to ul
    divContainer.appendChild(divCheckbox);
    divContainer.appendChild(divSpan);
    divContainer.appendChild(divButton);
    li.appendChild(divContainer);

    taskUl.appendChild(li);

    if(!storageAdded) {
        let taskObject = {};
        taskObject.task = taskText;
        taskObject.isChecked = false;

        taskList.push(taskObject);
        localStorage.setItem("tasks", JSON.stringify(taskList));

    }
}

addButton.addEventListener("click", function (){
    if (taskContent.value !== "") {
        addTaskToList(taskContent.value);
        taskContent.value = "";
    }
})

deleteButtons.forEach(item =>{
    item.addEventListener("click", function (){
        deleteTask(item);
    })
})

checkboxes.forEach(item =>{
    item.addEventListener("change", function (){
        checkedTask(item);
    })
})

