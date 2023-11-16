const http = require("http");
const server = http.createServer((req, res) => {
	if (req === "/"){
		res.writeHead(200, {'Content-Type':'text/html'})
		res.end('<h1>Welcome to Home</h1>')
	}
	if (req === "/about"){
		res.writeHead(200, {'Content-Type':'text/html'})
		res.end('<h1>This Is About</h1>')
	} else {
		res.writeHead(200, {'Content-Type':'text/html'})
		res.end('<h1>404 Not Found Page</h1>')
	}

})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log("Server running on", PORT === 5000 ? "http://localhost:5000" : PORT))