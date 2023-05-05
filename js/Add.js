import { httpServer } from "./httpServer.js"

const today = new Date();
const year = today.getFullYear(); // 년도
const month = today.getMonth() + 1;  // 월
const monthDT = month < 10 ? "0"+month : month
const date = today.getDate(); 
const dateDT = month < 10 ? "0"+date : date

const url = "http://localhost:5000/users"

const addForm = document.querySelector("#userAdd");
addForm.addEventListener('submit', (e) => {
    e.preventDefault();

   let addFormData = {
    userId: e.target.userId.value,
    userPW: e.target.userPW.value,
    userNM: e.target.userNM.value,
    userAg: e.target.userAg.value,
    creatDT: year + "-" + monthDT + "-" + dateDT
    };

    httpServer.post(url, addFormData)
    .then((data)=> console.log("성공" + data))
    .catch((err) => console.log(err))
});






