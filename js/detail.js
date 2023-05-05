import { httpServer } from "./httpServer.js";
let serectId = new URL(location.href).searchParams.get("id");

const url = "http://localhost:5000/users"

function getUsers(url){
    return new Promise(function(resolve, reject) {
        httpServer.get(url)
        .then((data) =>  {
            resolve(data)
        })
        .catch(err => reject(err))
    });
};

getUsers(`${url}/${serectId}`)
.then(user => {
    const userTable = document.querySelector('#userTable');
        userTable.innerHTML += `<tr>
        <td>${user.id}</td>
        <td>${user.userNM}</a></td>
        <td>${user.userId}</td>
        <td>${user.userPW}</td>
        <td>${user.userAg}</td>
        <td>${user.creatDT}</td>
        </tr>`;
    })
.catch(error => {
    console.error(error);
});