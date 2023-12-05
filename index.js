const http = require("http");
const fs = require("fs");
const path = require("path")


const server = http.createServer((req, res) => {
	
	if (req.url === "/"){
		fs.readFile(
			path.join(__dirname, 'public', 'homepage.html' ),   //archivo externo
			(err, content) => {
				if (err) throw err;
				res.writeHead(200, {'Content-Type':'text/html'})
				res.end(content)
			}
		)
	} else if (req.url === "/about"){
		fs.readFile(
			path.join(__dirname, 'public', 'about.html' ),   //archivo externo
			(err, content) => {
				if (err) throw err;
				res.writeHead(200, {'Content-Type':'text/html'})
				res.end(content)
			}
		)

	} else {
		res.writeHead(200, {'Content-Type':'text/html'})
		res.end('<h1>404 Not Found Page</h1>')

	}
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log("Server running on", PORT === 5000 ? "http://localhost:5000" : PORT))