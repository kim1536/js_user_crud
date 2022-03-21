// form에서 입력 받은 값을 서버에 전달 후 메인 페이지로 이동한다.
const addForm = document.querySelector("#topicAdd");
addForm.addEventListener('submit', (e) => {
    e.preventDefault();

   let addFormData = {
    title: e.target.title.value,
    age: e.target.age.value,
    description: e.target.desc.value,
    };

    let addTopic = JSON.stringify(addFormData);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/topic', true);
    xhr.setRequestHeader('Content-type','application/json');

    xhr.onload = () => {
        if (xhr.status == 200 && xhr.readyState == 4) {
            console.log("성공");
        } else {
            console.log("실패");
        }
    }
    xhr.send(addTopic);
    location.href = 'http://127.0.0.1:5500/main.html';
});



