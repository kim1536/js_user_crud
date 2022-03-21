// 파라미터러 잔달된 topic id로 rest api를 통해서 topic를 구하여 화면에 출력한다.
let topicId = new URL(location.href).searchParams.get("id");

const xhr = new XMLHttpRequest();
xhr.open('GET', `http://localhost:8080/topic/${topicId}`, true);
xhr.onload = () => {
     // JSON으로 데이터 가져오기
     const topic = JSON.parse(xhr.response); 
     if(xhr.status == 200 && xhr.readyState == 4) {
         // 결과로 구해진 상세페이지에 화면에 출력한다.
         var table = document.getElementById("topicTable").getElementsByTagName('tbody')[0];
         var newRow = table.insertRow(table.length);
         cell1 = newRow.insertCell(0);
         cell1.innerHTML = topic.id;
         cell2 = newRow.insertCell(1);
         cell2.innerHTML = topic.title;
         cell3 = newRow.insertCell(2);
         cell3.innerHTML = topic.age;
         cell4 = newRow.insertCell(3);
         cell4.innerHTML = topic.description;
         cell5 = newRow.insertCell(4);
         cell5.innerHTML = topic.createAt;
    }
    else {
        console.log("실패");
    }
}
 xhr.send();