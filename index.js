const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function get() {
    var xhr = new XMLHttpRequest();
	xhr.onload= function() {
		console.log("fuck");
		if (this.status == 200) {
			document.getElementById("list-container").innerHTML = '<li class="list-group-item">Cras justo odio</li>';
		}
	}
	xhr.open('GET', 'http://localhost:3000/polls', true);
	xhr.send(null);
}