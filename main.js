getTopics();
// topic 목록을 서버 rest api를 호출하여 화면에 출력한다.
function getTopics(){
const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:8080/topic', true);
xhr.onload = () => {
    if(xhr.status == 200 && xhr.readyState == xhr.DONE) {
        const topics = JSON.parse(xhr.response); // JSON으로 데이터 가져오기
// 결과로 구해진 topic 목록을 화면에 출력한다.
        for(let i in topics){
        var table = document.getElementById("topicsTable").getElementsByTagName('tbody')[0];
        var newRow = table.insertRow(table.length);
        cell1 = newRow.insertCell(0);
        cell1.innerHTML = topics[i].id;
        cell2 = newRow.insertCell(1);
        cell2.innerHTML = topics[i].title;
        cell3 = newRow.insertCell(2);
        cell3.innerHTML = topics[i].age;
        cell4 = newRow.insertCell(3);
        cell4.innerHTML = topics[i].createAt;
        cell5 = newRow.insertCell(4);
        cell5.innerHTML = `<button type="button" onClick="onEdit(this)">수정</button>
                           <button type="button" onClick="onDelete(${topics[i].id})">삭제</button>`;
        
      }
    } else {
        console.log("조회 실패");
    };
};
xhr.send();
}

function onDelete(topicId) {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `http://localhost:8080/topic/${topicId}`, true);
    if (confirm('삭제 하시겠습니까 ?')) {
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
