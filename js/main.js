import { httpServer } from "./httpServer.js"

const url = "http://localhost:5000/users"

function getTopics(url){
    return new Promise(function(resolve, reject) {
        httpServer.get(url)
        .then((data) =>  {
            resolve(data)
        })
        .catch(err => reject(err))
    });
};

getTopics(url)
.then(users => 
    users.forEach((user) => {
        document.querySelector('#userDate').innerHTML += `<tr>
        <td>${user.id}</td>
        <td><a style="cursor:pointer;" id="detailTopic" href="./detail.html?id=${user.id}">${user.userNM}</a></td>
        <td>${user.userId}</td>
        <td>${user.userAg}</td>
        <td>${user.creatDT}</td>
        <td><button type="button" onClick="location.href='./edit.html?id=${user.id}'">수정</button></td>
        <td><button type="button" id="deleteBtn" data-id="${user.id}">삭제</button></td>
        </tr>`
    })
);

document.addEventListener('click', function(event) {
    if (event.target.id === 'deleteBtn') {
      httpServer.delete(`${url}/${event.target.dataset.id}`)
        .then((data) =>  {
            resolve(data)
            console.log(data)
        })
        .catch(err => reject(err))
    };
})
