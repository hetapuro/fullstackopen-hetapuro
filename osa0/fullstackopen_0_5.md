sequenceDiagram
    participant browser 
    participant server 
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: the "spa" html file 
    deactivate server

	Note right of browser: The HTML includes a href for "/exampleapp/main.css" and script "/exampleapp/spa.js", that are loaded next
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: main.css document
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the spa.js file "var notes = [] var redrawNotes = function() {var ul = docu..."
    deactivate server

	Note right of browser: The browser starts executing the JavaScript code that fetches "/exampleapp/data.json" file from the server

    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: the data.json file [{content: "ttt", date: "2025-04-22T10:53....."
    deactivate server    

	Note right of browser: The JSON includes the list of saved notes
    