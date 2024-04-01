const http = require("http");

let server = http.createServer((request, response) => {

   if (request.url == "/about") {
       response.write("You accessed /about");
   } else {
       response.write("Hello from a Node Server!");
   }

   response.end();
});

server.listen(3000);