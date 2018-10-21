var xhr = new XMLHttpRequest();
xhr.onload= function() {
    if (this.status == 200) {
        var inner = "";
        var json = JSON.parse(this.responseText);
        for (var j of json) {
            inner += '<li class="list-group-item" onclick="location.href=\'http://localhost:3000/?id=' + j["_id"] +'\'">' + j["prompt"] + '</li>';
        }
        document.getElementById("list-container").innerHTML = inner;
    }
}
xhr.open('GET', 'http://localhost:3000/polls', true);
xhr.send(null);


function createPoll() {
    var xhr = new XMLHttpRequest();
    var poll = prompt("Name of your poll");
    if (poll != null) {
        xhr.open("POST", 'http://localhost:3000/polls', true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() {
            //Call a function when the state changes.
            if(this.readyState == XMLHttpRequest.DONE && this.status == 201) {
                var json = JSON.parse(this.responseText);
                document.getElementById("list-container").innerHTML += '<li class="list-group-item" onclick="location.href=\'http://localhost:3000/?id=' + json["_id"] +'\'">' + json["prompt"] + '</li>';
            }
        }

        xhr.send("latitude=49&longitude=-123&prompt=" + poll);
    }
}