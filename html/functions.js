var socket = io('http://localhost:3000');
socket.on('chat', package=>read(package));

var chatContent = document.getElementById('chatContent');
var text = document.getElementById('text');
chatContent.scrollTop = chatContent.scrollHeight;

let identification = "15151"
let nickname = "DC"

function create_post(msg) {
    var msj = document.createElement('div');
    msj.setAttribute("class", "mensaje"); 
    if(msg.student_id === '15151'){
        msj.setAttribute("class", "mi mensaje")
    }
    let content = document.createElement('p');
    content.innerHTML = msg.student_id + "-" + msg.nick + ": " + msg.text; 
    msj.appendChild(content); 
    chatContent.appendChild(msj);

}

function send_message() {
    let package = {
        student_id: identification,
        text: text.value,
        nick: nickname
    }

    socket.emit('message', package);
    create_post(package);
    chatContent.scrollTop = chatContent.scrollHeight;
    text.value = "";
}


function read(package) {
    // var ran = Math.floor(Math.random() * 100 + 1);
    for (let i = 0; i < package.length; i++) {
        create_post(package[i]);
    }

}

