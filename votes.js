var xhr = new XMLHttpRequest();
xhr.onload= function() {
    if (this.status == 200) {
        var inner = "";
        var json = JSON.parse(this.responseText);
        for (var choice of json[0]["choices"]) {
            console.log(choice);
            inner += '<li class="list-group-item">' + choice["descriptor"] + ': ' + choice["votes"] + '</li>';
        }
        document.getElementById("list-container").innerHTML = inner;
    }
}
var url = new URL(window.location.href);
var id = url.searchParams.get("id");
xhr.open('GET', 'http://localhost:3000/polls?_id=' + id, true);
xhr.send(null);