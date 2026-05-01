## Networking — How data actually travels across the internet 
### DNS — The internet's phone book
When type `google.com` computer has no idea where that is. Computers only understand IP addresses like `142.250.80.46` 

DNS converts human-readable names into IP addresses.
- Search Rahim: phone finds the number 0192204
- Search google.com: DNS finds `142.250.80.46`

```js
    You type google.com
       ↓
    Browser checks its own cache — "do I already know this IP?"
        ↓ (if not)
    Asks your Router
        ↓ (if not)
    Asks your ISP's DNS server
        ↓ (if not)
    Asks the Root DNS servers — the master phone book of the internet
        ↓
    Gets back: "google.com = 142.250.80.46"
        ↓
    Browser connects to that IP

    Once found, the IP is cached (saved temporarily) so the browser doesn't repeat this lookup every time.
```

### TCP/IP — How data travels 

IP = the address system. Every device on the internet has an IP address. It's how data knows where to go — like a postal address. 

TCP = the delivery system. It makes sure your data actually arrives, in the right order, without missing pieces.

When load a webpage, the data is too big to send in one piece. It gets broken into small chunks called packets. Each packet travels independently across the internet — possibly taking different routes.
TCP makes sure:
     All packets arrive
     They're reassembled in the correct order
     If a packet is lost, it gets re-sent


### Latency vs Bandwidth — Two very different things

`Latency` = how long it takes for data to make one trip 

Think of it like the time it takes to drive from Dhaka to Chittagong. That travel time is latency. It doesn't matter if you're driving a bicycle or a truck — the travel time is roughly the same.

`Bandwidth` = how much data can travel at the same time 

bandwidth is the width of the road. A 4-lane highway moves more cars at once than a 1-lane road. But the travel time is still the same.

```js
   Low latency  = fast response time (good for gaming, video calls)
   High bandwidth = lots of data at once (good for streaming, downloads)
```

### CDN — Bringing the server closer to you
Your server is physically located in the US. You're in Dhaka. Every request has to travel thousands of miles and back. That's high latency.

The solution — CDN (Content Delivery Network):

A CDN is a network of servers spread across the world. Copies of your website's static files (images, CSS, JS) are stored on all of them.

When you make a request, instead of going to the US server — you get the file from the nearest CDN server. Maybe Singapore. Maybe India. Much shorter distance, much lower latency.

```js
  Without CDN:  Dhaka → US server → Dhaka   (long trip)
  With CDN:     Dhaka → Singapore CDN → Dhaka   (short trip)

  
  CDNs store:
    - Images, videos
    - CSS and JS files
    - Fonts
    - Anything that doesn't change often (called static assets)

Dynamic data (like your personal feed or messages) still comes from the origin server — CDNs aren't for that.
Popular CDNs you'll use as a developer: Cloudflare, AWS CloudFront, Vercel's CDN (built in when you deploy there).
```

```js
    1. DNS lookup  → converts google.com to an IP address
    2. TCP connect → establishes a reliable connection to that IP 
    3. TLS handshake → encrypts the connection (HTTPS)
    4. HTTP request → browser asks for the page
    5. Server responds → sends back HTML
    6. Browser parses HTML/CSS → builds DOM and CSSOM
    7. Render tree → combines them
    8. Layout → calculates positions
    9. Paint → draws pixels
    10. Composite → final image appears on screen
```