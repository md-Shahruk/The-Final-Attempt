# Topics will be covered:
- Request/Response lifecycle 
- Status codes
- Headers
- Cookies
- CORS
- HTTPS/TLS handshake

### HTTP: The Full Request/Response Lifecycle
#### HTTP is a text based, request response protocol that runs over TCP. When a browser wants anything from a server a webpage, an image, JSON data  it speaks HTTP. `client asks, server answer`

- Whenever browser asks the server for something. The server sends it bakc. This ask-and-answer is called a request and response.

"ask" look like:
```js
  GET /home HTTP/1.1
  Host: facebook.com
  this says: hey facebook.com give me  the/home page please.
  GET: means I want to receive something not sending anything, just asking.
```
"answer" look like:
```js
   HTTP/1.1 200 OK
   Content-Type: text/html
   <html>... the facebook homepage ...</html>

   this says: Here you go! Status 200 means everything went fine. Here's the HTML.

   What is a method?
   - When you talk to a sever, you tell it what you want to do. That's called method.

```
```js
   HTTP Method:
   GET: Check your balance just look
   POST: Deposite money (send something new)
   PUT: Replace your info completely
   PATCH: Update just your phone number
   DELETE: Close your account 

   For now:
   GET: give me something
   POST: here is something new, save it 


   What does `stateless` means?
   - Stateless means server forgets you  after every request.
   This is why websites need things like `login sessions and cookies`-  so they can remember who you are.
```

### Status Codes — The server's way of reacting 
#### When the server sends back a response, it also sends a number that tells how things went. That number is called a status code.

```js
    2xx — Success
    200 OK — everything worked perfectly
    201 Created — you sent something new and it was saved (common after POST)
    204 No Content — worked fine, but nothing to send back (common after DELETE)

    3xx — Redirect
    301 Moved Permanently — this URL changed forever, update your links
    302 Found — temporarily moved, keep using the old URL

    4xx — Your fault
    400 Bad Request — you sent something the server couldn't understand
    401 Unauthorized — you need to log in first
    403 Forbidden — you're logged in but still not allowed
    404 Not Found — that page/resource doesn't exist 

    5xx — Server's fault
    500 Internal Server Error — something crashed on the server side
    503 Service Unavailable — server is down or overloaded 

    You → GET /profile → Server
    Server → 200 OK → "Here's your profile"
    Server → 401      → "Please log in first"
    Server → 404      → "No profile found"
    Server → 500      → "Something crashed on our end"
```

### Headers — The extra information attached to every request and response
#### Like the restaurant analogy, notes write on order slip. `no onions, extra sauce`

Request Headers - what the browser tells the server
```js
    Host: google.com
    Accept: text/html
    Accept-Language: en-US
    User-Agent: Mozilla/5.0 (Chrome)
    Authorization: Bearer abc123token

    Host: Which website am I talking to?
    Accept: What kind of response do I want back?
    Accept-Language: What language do I prefer?
    User-Agent: Which browser/device am I?
    Authorization: Here's my login token to prove who I am
```

Response Headers - what the server tells the browser
```js
    Content-Type: application/json
    Content-Length: 348
    Cache-Control: max-age=3600
    Set-Cookie: sessionId=xyz

    Content-Type: What kind of data am I sending you?
    Content-Length: How many bytes is the response?
    Cache-Control: How long should you save this response?
    Set-Cookie: Here, store this small piece of data

    The most important one `Content-Type`
    This tells the browser what format the data is in so it knows how to handle it.

    text/html → it's a webpage, render it
    application/json → it's JSON data, parse it
    image/png → it's an image, display it
```

One real-world example to tie it together
```js
    Log in into a website:
    POST /login
    Authorization: Bearer abc123
    Content-Type: application/json

    {"email": "shahruk@email.com", "password": "1234"}

    Server responds:
    200 OK
    Content-Type: application/json
    Set-Cookie: sessionId=xyz789

    {"message": "Login successful"}
```

### Cookies — How websites remember you
- Stateless: The server forgets you after every request.
- So how does facebook know you are still logged in after refresh the page. - Cookies
#### A cookie is just a small piece of text that the server tells browser to store and send back with every future request.

Step 1 - You log in
```js
   POST /login
   {"email": "shahruk@email.com", "password": "1234"}
```
Step 2 - Server confirms and gives a cookie
```js
   200 OK
   Set-Cookie: sessionId=xyz789
   server saying: Login successful, store this sessionid in your browser.
```
Step 3 - Every future request, browser sends the cookie back automatically 
```js
   GET /profile
   Cookie: sessionId=xyz789 
   The server reads the cookie, looks up xyz789,
```

Cookie properties - the important ones
```js
   Expires: When does this cookie die? (after 7 days)
   HttpOnly: JavaScript cannot read this cookie — only the browser sends it. Protects against attacks.
   Secure: Only send this cookie over HTTPS, never plain HTTP 
   SameSite: Only send this cookie if the request comes from the same website 

   `HttpOnly` and `Secure` are security features.
```
- Session cookie - dies when  close the browser. No expiry date set.
- Persistent cookie - survives after  close the browser. Has an expiry date.


### CORS — Why your request sometimes gets blocked 

Imagine you have two websites:

- frontend: `myapp.com`
- backend API: `api.myapp.com` 

if frontend tries to fetch data from backend. The browser block it. Because they are different domains. And by default, browser don't allow that.
This protection is called the `Same-Origin Policy`.

What is "origin"?
Origin = protocol + domain + port 
```js
   https://myapp.com:443
     ↑         ↑       ↑
   protocol  domain   port
```

CORS stands for `Cross-Origin Resource Sharing.`
```js
   "Hey browser, it's okay. I allow requests from this other origin. Don't block it."
   The server does this by sending back a special header:
   Access-Control-Allow-Origin: https://myapp.com
```

```js
   Browser: "Hey api.myapp.com, myapp.com wants your data. Is that okay?"
   Server:  "Yes, I allow myapp.com." → request goes through 
   Server:  (says nothing)            → browser blocks it 

   CORS errors are not a frontend or backend problem. They are a browser security feature.
```

The Preflight Request - what happens behind the scenes

For certain request like POST with JSON the browser doesn't send the real request immediately. First send a preflight- a small asking permission request using the `OPTIONS` method.

```js
   OPTIONS /data
   Origin: https://myapp.com
   Access-Control-Request-Method: POST 

   "I'm about to send a POST from myapp.com — is that allowed?"
```
```js
   Access-Control-Allow-Origin: https://myapp.com
   Access-Control-Allow-Methods: GET, POST

   "okay cool" — then sends the real request.
```

Real life:
```js
   building a Node.js/Express backend, just do this:
   const cors = require('cors');
   app.use(cors({ origin: 'https://myapp.com' }));

   The library handles sending the right headers automatically.
```