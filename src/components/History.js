// ping the backend to query the history from mongo
// then format it and display it properly
import React, { useEffect } from "react";
import { useParams } from "react-router";
import axios from 'axios';
import { useState } from "react";

// import socket client library and 
import io from "socket.io-client";
const ENDPOINT = "http://localhost:3000" // express backend
const socket = io(ENDPOINT)

const Block = ({ headers, payload, requestType }) => {
  const formatJSONIntoString = (obj) => {
    if (typeof obj === "string") {
      return '';
    }
    let str = '';
    for (let key in obj) {
      str += `${key}: ${obj[key]}\n`;
    }
    
    return str;
  }
  
  headers = formatJSONIntoString(headers);
  payload = formatJSONIntoString(payload);
  
  return (
    <li className="block">
      <p><b>Request Type:</b><br/> {requestType}</p>
      <p><b>Headers:</b></p>
      <div className="obj">{headers || "No headers in this request"}</div>
      <p><b>Body:</b></p>
      <div className="obj">{payload || "No body in this request"}</div>
    </li>
  )
}

const History = () => {
  const [reqs, setReqs] = useState([]);
  let { bucketUrl } = useParams();
      
  socket.on('connect', () => console.log(`--- SOCKET connected to ${socket.id}`))
  socket.on("connect_error", () => console.error('--- SOCKET CONNECTION ERROR'));

  useEffect(() => {
    console.log('first effect');
    ;(async () => {
      let data = await axios.get('/stash/' + bucketUrl);
      if (typeof data.data !== 'string') {
        setReqs(data.data);
        console.log('--data', data.data)
      }
    })();
    
  }, [bucketUrl])
  
  useEffect(() => {
    console.log('second effect');
    // listen for new requests to specific bucketUrl
    socket.on("NEW_REQUEST_IN_BUCKET", (data) => {
      console.log('got a new event!!', data.data)
      if (data.bucketUrl === bucketUrl) {
        console.log('REQS BEFORE SET', reqs)
        setReqs([...reqs, data.data]) // BUGGY: reassigns reqs array to only one item
      }
    })
      
    return () => {
      socket.disconnect() // disconnect from event to prevent memory leaks
    }
  },[bucketUrl])

  console.log('REQS before render: ', reqs)
    
  return (
    <ul id="history">
    {reqs.reverse().map((request, i) => {
      return (<Block key={i} headers={request.headers} payload={request.payload} requestType={request.requestType}/>)
    })}
   </ul>
  )
}

export default History;
