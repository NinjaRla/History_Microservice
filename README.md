# HISTORY_MICROSERVICE README

## Description: 
The Shareable Link Microservice records the session ID and stores the history data locally. 

## Instructions:
**Installing the Microservice**
  
  ```
  npm install
  ```

  **Starting the Microservice**

  ```
  npm start
  ```

  The service runs locally on: http://localhost:3070/

  The service is hosted on Render: 

**REQUESTING DATA from the microservice:**
  Mandatory query parameter: (session_id, fact_id)

### Valid Queries

GET: /history?session_id=${session_id}

POST: /history with a JSON body containing {session_id, fact_id}

**Example Call:**

Locally
```
GET: "http://localhost:3070/history?session_id=${session_id}"

POST: "http://localhost:3070/history"
```
On Cloud
```  
GET:

POST:
```
**RECEIVING DATA from the microservice:**
GET:
The microservice will return the query parameters: session_id and fact_id, and a message indicating success. 
POST:
The microservice will return the query parameter: session_id, and history.

The history can be obtained via the GET request:
REST API: GET with the end point /history

**Example Call:**
For the example request:
    
GET: with the passed paramaeter (session_id), the microservice will return a json body with the input parameter (session_id) and the history.

{ <br />
  &ensp;&ensp;'session_id' : 'ss2311s', <br />
  &ensp;&ensp;'history': history <br />
}

POST: with the passed parameters (session_id, fact_id), the microservice will return a json body with the input parameters (session_id, fact_id), and a sucessful message.

microservice sends a status code with a json body: <br />
{ <br />
  &ensp;&ensp;'session_id' : 'ss2311s', <br />
  &ensp;&ensp;'fact_id' : 'space1', <br />
  &ensp;&ensp;'message' : 'Fact successfully recorded.' <br />
}
