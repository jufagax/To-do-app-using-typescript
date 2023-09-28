/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
import confetti from 'canvas-confetti';

confetti.create(document.getElementById('canvas') as HTMLCanvasElement, {
  resize: true,
  useWorker: true,
})({ particleCount: 200, spread: 200 });
 **/

// console.log("hi");

// import { v4 as uuidV4 } from "uuid"

// console.log(uuidV4()) 

// import { v4 as uuidV4 } from "uuid"//npm install types if needed -  npm i --save-dev @types/uuid

// type Task = {//created a type called task 
//   id: string, 
//   title: string,
//   completed: boolean,
//   createdAt: Date
// }

// const list = document.querySelector<HTMLUListElement>("#list")
// const form = document.getElementById("#new-task-form") as HTMLFormElement | null
// const input = document.querySelector<HTMLInputElement>("#new-task-title")

// form?.addEventListener("submit" ,e=>{
//   e.preventDefault()

//   if(input?.value == "" || input?.value == null) return //it could be null, so use the qstn mark , if the thing exits give the value or else give return it 

//   const newTask: Task = {//a todo - a task , a object is ccreated with id title completed date 
//     id : uuidV4(),
//     title : input.value, 
//     completed : false,
//     createdAt : new Date(),
//   }

//   addListItem(newTask)
// })

// function addListItem(task: Task){
//   const item = document.createElement("li")
//   const label = document.createElement("label")
//   const checkbox = document.createElement("input")

//   checkbox.type = "checkbox"
//   label.append(checkbox, task.title)
//   item.append(label)
//   list?.append(item)
// }


import { v4 as uuidV4 } from "uuid"

type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("new-task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#new-task-title")
const tasks: Task[] = loadTasks()//task array - just to save the thngs we do and they don't do even if we refresh 
tasks.forEach(addListItem)

form?.addEventListener("submit", e => {
  e.preventDefault()

  if (input?.value == "" || input?.value == null) return

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  }
  tasks.push(newTask)
  saveTasks()

  addListItem(newTask)
  input.value = ""
})

function addListItem(task: Task) {
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")

  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    saveTasks()
  })

  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  label.append(checkbox, task.title)

  item.append(label)
  list?.append(item)
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks))//saving tasks to local storage 
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS")
  if (taskJSON == null) return []
  return JSON.parse(taskJSON)
}