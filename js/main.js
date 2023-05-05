import { httpServer } from "./httpServer.js"

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

getUsers(url)
.then(users => {
    const userTable = document.querySelector('#userTable');
    users.forEach((user) => {
        userTable.innerHTML += `<tr>
        <td>${user.id}</td>
        <td><a style="cursor:pointer;" id="detailTopic" href="../html/detail.html?id=${user.id}">${user.userNM}</a></td>
        <td>${user.userId}</td>
        <td>${user.userAg}</td>
        <td>${user.creatDT}</td>
        <td><button type="button" onClick="location.href='../html/edit.html?id=${user.id}'">수정</button></td>
        <td><button type="button" class="deleteBtn" data-id="${user.id}">삭제</button></td>
        </tr>`;
    });

    const deleteButtons = document.querySelectorAll(".deleteBtn");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const userId = button.dataset.id;
        onDelete(userId)
          .then(() => {
            // 削除成功時の処理
            console.log("削除成功");
          })
          .catch((error) => {
            // 削除失敗時の処理
            console.error(error);
          });
        });
    });
})
.catch(error => {
    console.error(error);
});


function onDelete(userId) {
    console.log(`${url}/${userId}`);
    return new Promise(function(resolve, reject) {
      httpServer.delete(`${url}/${userId}`)
        .then(() => {
          alert("DELETE OK");
          resolve();
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }





