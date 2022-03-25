const http = require("http");
var fs = require("fs");

var server = http.createServer(function(request, response){
    // response.end("Hello World");
    if(request.method==="GET"){

        if(request.url==='/'){
            fs.readFile("./index.html","utf-8",function(err, data){
                if(err){
                    response.end("An error occured.")
                }
                else{
                    response.end(data);
                }
            })
        }
        else if(request.url==="/Contact"){
            response.end("Contact Us.")
        }
        else{
            response.end("Invalid Request.")
        }

    }
    else{
        response.end("Not a GET request.")
    }
});

server.listen(3000, function(){
    console.log("Server is running at 3000.")
});