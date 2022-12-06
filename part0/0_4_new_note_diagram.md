sequenceDiagram
participant Browser
Note over Browser: Focuses input field <br> and enters note text
Note over Browser: Press "Save" button
Browser->>Server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
Note over Browser,Server: POST Data: note=New+note+text 
Note over Server: Server saves new note
Server-->>Browser: HTTP 302 Redirect to https://studies.cs.helsinki.fi/exampleapp/notes
Browser->>Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
Server-->>Browser: HTML-code
Browser->>Server: https://studies.cs.helsinki.fi/exampleapp/main.css
Server-->>Browser: HTTP 304 Not modified
Browser->>Server: https://studies.cs.helsinki.fi/exampleapp/main.js
Server-->>Browser: HTTP 304 Not modified
Note over Browser: browser starts executing js-code <br/> that requests JSON data from server 
Browser->>Server: https://studies.cs.helsinki.fi/exampleapp/data.json
Server-->>Browser: data.json
Note over Server: file with notes including new note
Note over Browser: Browser executes the event handler<br/>that renders notes to display

