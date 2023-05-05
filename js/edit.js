import { httpServer } from "./httpServer.js";

let serectId = new URL(location.href).searchParams.get("id");

const url = "http://localhost:5000/users"

const today = new Date();
const year = today.getFullYear(); // 년도
const month = today.getMonth() + 1;  // 월
const date = today.getDate(); 

getUser(`${url}/${serectId}`);

function getUser(url){
  return httpServer.get(url)
  .then((user) => {
    const userTable = document.querySelector('#userEditDiv');
    userTable.innerHTML += `<form id="userEdit">
      <label> USER ID: 
          <input  type="text" name="userId" placeholder="${user.userId}" required>
      </label>
      </br>
      <label> USER PW: 
        <input  type="text" name="userPW"  placeholder="${user.userPW}" required>
      </label>
      </br>
      <label> USER NM: 
        <input  type="text" name="userNM"  placeholder="${user.userNM}" required>
      </label>
      </br>
      <label> AGE: 
          <input  type="number" name="userAg"  max= "100"  placeholder="${user.userAg}" required>
      </label>
      </br>
      <button type="submit">등록</button>
    </form>`;
    const editForm = document.querySelector("#userEdit");
    editForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let userFormData = {
        userId: e.currentTarget.userId.value,
        userPW: e.currentTarget.userPW.value,
        userNM: e.currentTarget.userNM.value,
        userAg: e.currentTarget.userAg.value,
        creatDT: year + "-" + month + "-" + date
      };
      console.log(userFormData)
      onEdit(user.id, userFormData)
      .then(() => {
        location.href = "/main.html";
      })
      .catch((err) => console.error(err));
    })
  })
  .catch(error => {
    console.log(error)});
};


function onEdit(userID, userFormData) {
    return httpServer.put(`${url}/${userID}`, userFormData)
};