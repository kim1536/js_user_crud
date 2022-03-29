// 파라미터러 잔달된 topic id로 rest api를 통해서 topic를 구하여 화면에 출력한다.
let topicId = new URL(location.href).searchParams.get("id");

const xhr = new XMLHttpRequest();
xhr.open('GET', `http://localhost:8080/topic/${topicId}`, true);
xhr.onload = () => {
     // JSON으로 데이터 가져오기
     const topic = JSON.parse(xhr.response); 
     if(xhr.status == 200 && xhr.readyState == 4) {
         // 결과로 구해진 수정페이지 화면에 출력한다.
         document.querySelector('#topicEditDiv').innerHTML += `<form id="topicEdit">
         <label> Title: 
             <input  type="text" name="title" placeholder="${topic.title}" required>
         </label>
         </br>
         <label> AGE: 
             <input  type="number" name="age"  max= "100"  placeholder="${topic.age}" required>
         </label>
         </br>
         <label> Description: 
             <input  type="text" name="desc"  placeholder="${topic.description}" required>
         </label>
         </br>
         <button type="submit" onClick="onEdit(${topic.id})">등록</button>
        </form>`
       }
    else {
        console.log("실패");
    }
}
 xhr.send();

 // 등록 버튼을 클릭 시 form에서 입력 받은 값을 서버에 전달 후 메인 페이지로 이동한다.
function onEdit(editTopicId) {
    const editForm = document.querySelector("#topicEdit");
    editForm.addEventListener('submit', (e) => {
    e.preventDefault();

   let editFormData = {
    title: e.target.title.value,
    age: e.target.age.value,
    description: e.target.desc.value,
    createAt: new Date(),
    };

    let editTopic = JSON.stringify(editFormData); // JSON데이터로 변환 함

    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `http://localhost:8080/topic/${editTopicId}`, true);
    xhr.setRequestHeader('Content-type','application/json');

    xhr.onload = () => {
        if (xhr.status == 200 && xhr.readyState == 4) {
            console.log("성공");
            alert("글 수정 성공");
            location.href = 'http://127.0.0.1:5500/main.html';
        } else {
            console.log("실패");
        }
    }
    xhr.send(editTopic);
});
};
 