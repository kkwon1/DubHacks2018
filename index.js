var xhr = new XMLHttpRequest();
xhr.onload= function() {
    if (this.status == 200) {
        var inner = "";
        var json = JSON.parse(this.responseText);
        for (var j of json) {
            inner += '<li class="list-group-item">' + j["prompt"] + '</li>'
        }
        document.getElementById("list-container").innerHTML = inner;
    }
}
xhr.open('GET', 'http://localhost:3000/polls', true);
xhr.send(null);
