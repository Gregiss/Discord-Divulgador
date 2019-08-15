const fs = require('fs');

var axios = require('axios')
let username;
let password;
let save;

let rawdata = fs.readFileSync('settings.json');
let accounts = JSON.parse(rawdata);

let joinServer = fs.readFileSync('peoples.json');
let servers = JSON.parse(joinServer);

var token;

var serverUrl = servers[0].join;

username = accounts[0].username;
password = accounts[0].password;

var message = "Hellow";

var headersData;

let idpeople = 611280196728914036;

let session;

var CookieParser = require('restify-cookies');
        var Restify = require('restify');
        var server = Restify.createServer();
        server.use(CookieParser.parse);
        server.get('/', function(req, res, next){
          var cookies = req.cookies; // Gets read-only cookies from the request
          res.setCookie(session); // Adds a new cookie to the response
          res.send(JSON.stringify(cookies));
        });
server.listen(8080);

console.log("Estou logando com a conta " + username);

var get_cookies = function(request) {
  var cookies = {};
  request.headers && request.headers.cookie.split(';').forEach(function(cookie) {
    var parts = cookie.match(/(.*?)=(.*)$/)
    cookies[ parts[1].trim() ] = (parts[2] || '').trim();
  });
  return cookies;
};

function logged() {
    axios.post('https://discordapp.com/api/v6/auth/login', { email: username, password: password, undelete: false, captcha_key: null, login_source: null })
    .then(function(response){
      if(response.status == 400){
        console.log("Usuario ou senha incorretos");
      } else{
        console.log('Logado com sucesso');
        token = response.data.token;
        session = response.headers['set-cookie'];
        console.log("Sessao" + session);
      }
  });
}

function Server(){
  
}
  
function sendMessage(){
    //setInterval(function(){
    let axiosConfig = {
      headers: {
      Authorization: token,
      },
    };

    let postData = {
        content: "Olá, testando bot",
        nonce: 611280196728914036,
        tts: false
      };

    axios.post('https://discordapp.com/api/v6/channels/611280196728914036/messages', postData, axiosConfig)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res);
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
  //}, 5000);
  
}

function consoler(){
    console.log(token);
}

function main() {
    logged();
    setTimeout(() => { 
    console.log("Started");
    consoler();
    sendMessage();
    }, 4000);
}

main();