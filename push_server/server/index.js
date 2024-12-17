// Modules
const http = require('http');
const fs = require('fs');
const path = require('path');
const push = require('./push');

// Create HTTP server
http.createServer((request, response) => {
    // Enable CORS
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Get requested URL and method
    const { url, method } = request;

    // Serve the index.html when the root URL is accessed
    if (method === 'GET' && url === '/') {
        // Set the content-type for the HTML file
        response.setHeader('Content-Type', 'text/html');

        // Send the content of the index.html file
        fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
            if (err) {
                response.statusCode = 500;
                response.end('Error loading index.html');
            } else {
                response.end(data);
            }
        });
    }

    // Subscribe to notifications
    else if (method === 'POST' && url.match(/^\/subscribe\/?/)) {
        let body = [];
        request.on('data', chunk => body.push(chunk)).on('end', () => {
            let subscription = JSON.parse(body.toString());
            push.addSubscription(subscription);
            response.end('Subscribed');
        });

    // Get public key for push notifications
    } else if (url.match(/^\/key\/?/)) {
        response.end(push.getkey());

    // Push notification
    } else if (method === 'POST' && url.match(/^\/push\/?/)) {
        let body = [];
        request.on('data', chunk => body.push(chunk)).on('end', () => {
            push.send(body.toString());
            response.end('Push sent');
        });

    // 404 for unknown requests
    } else {
        response.statusCode = 404;
        response.end('Error: Unknown Request');
    }

}).listen(3333, () => {
    console.log('Server Running on port 3333');
});
