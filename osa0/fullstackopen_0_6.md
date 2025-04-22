sequenceDiagram
    participant browser 
    participant server 
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: Updated data.json file
    deactivate server

	Note right of browser: The single page app only responds with an updates JSON file, so network operations are minimal compared to 	the "notes" web app.
    