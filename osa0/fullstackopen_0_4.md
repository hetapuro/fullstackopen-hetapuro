sequenceDiagram
    participant browser 
    participant server 
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: HTTP/1.1 302 Found, text/html
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: exampleapp/notes html document
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the main.css file ".container { padding..."
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the main.js file "var xhttp = new XMLHttpRequest() ... xhttp.open("GET", "/exampleapp/data.json", true)..."
    deactivate server    

	Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: the JSON file "[{content: "i", date: "2025-04-22T10:45....."    deactivate server 

	Note right of browser: The JSON includes the list of saved notes which the browser shows as set in the .js file

    