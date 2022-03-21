getTopics();
// topic 목록을 서버 rest api를 호출하여 화면에 출력한다.
function getTopics(){
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:8080/topic', true);
xhr.onload = () => {
    // JSON으로 데이터 가져오기
    const topics = JSON.parse(xhr.response); 
    if(xhr.status == 200 && xhr.readyState == 4) {
        // 결과로 구해진 topic 목록을 화면에 출력한다.
       topics.forEach((topic) => {
           document.querySelector('#topicDate').innerHTML += `<tr>
           <td>${topic.id}</td>
           <td><a style="cursor:pointer;" id="detailTopic" href="./detail.html?id=${topic.id}">${topic.title}</a></td>
           <td>${topic.age}</td>
           <td>${topic.createAt}</td>
           <td><button type="button" onClick="onEdit(${topic.id})">수정</button></td>
           <td><button type="button" onClick="onDelete(${topic.id})">삭제</button></td>
           </tr>`
       })
    } else {
        console.log("조회 실패");
    };
};
xhr.send();
}

// 파라미터로 받은 id을 서버에 전달하여 id에 해당되는 topic을 삭제한다.
function onDelete(topicId) {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `http://localhost:8080/topic/${topicId}`, true);
    if (confirm('삭제 하시겠습니까?')) {
        xhr.onload = () => {
            if (xhr.status == 200 && xhr.readyState == 4) {
                location.reload();
            } else {
                console.log("실패");
            }
        };
        xhr.send(null);
    } 
};

