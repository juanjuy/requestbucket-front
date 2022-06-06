// ping the backend to query the history from mongo
// then format it and display it properly
import React, { useEffect } from "react";
import { useParams } from "react-router";
import axios from 'axios';
import { useState } from "react";

import io from "socket.io-client";
const ENDPOINT = "http://localhost:3000"
const socket = io(ENDPOINT) // only works without specifying port, must be because of proxy to express backend?

const Block = ({ headers, payload, requestType }) => {
  const formatJSONIntoString = (obj) => {
    if (typeof obj === "string") {
      return '';
    }
    let str = '';
    for (let key in obj) {
      str += `${key}: ${obj[key]},\n`;
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
  
  // add state to set and get messages
  const [message, setMessage] = useState("")
  const [messageReceived, setMessageReceived] = useState("default")
  const sendMessage = () => {
    console.log('sending message: ', message)
    socket.emit("send_message", { message })
  }

  useEffect(() => {
    const getData = async() => {
      let data = await axios.get('/stash/' + bucketUrl);
      if (typeof data.data !== 'string') {
        setReqs(data.data);
        console.log('REQS: ', reqs)
      }
    }
    getData();

    socket.on('connect', () => {
      console.log(`--- SOCKET connected to ${socket.id}`)
    })
    
    socket.on("connect_error", () => {
      console.error('--- SOCKET CONNECTION ERROR')
    });

    socket.on("receive_message", (data) => setMessageReceived(data.message));

    // disconnect from event to prevent memory leaks
    return () => {
      socket.disconnect()
    }

  }, [bucketUrl])
    
    return (
      <div>
          <div>
          <input placeholder="message..."
            onChange={(event) => setMessage(event.target.value)
          } />
          <button onClick={sendMessage}> Send Message</button>
          <h1>Message Received:</h1>
          <p>{messageReceived}</p>
        </div>

      <ul id="history">
      {reqs.map((request, i) => {
        return (<Block key={i} headers={request.headers} payload={request.payload} requestType={request.requestType}/>)
      })}
    </ul>
    </div>
  )
}

export default History;

        // sample data, this is what will be returned by pinging axios
        // const reqs = [{"headers":{"host":"localhost:3000","connection":"keep-alive","sec-ch-ua":"\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"","sec-ch-ua-mobile":"?0","sec-ch-ua-platform":"\"Windows\"","dnt":"1","upgrade-insecure-requests":"1","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Safari/537.36","accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9","sec-fetch-site":"none","sec-fetch-mode":"navigate","sec-fetch-user":"?1","sec-fetch-dest":"document","accept-encoding":"gzip, deflate, br","accept-language":"en-GB,en-US;q=0.9,en;q=0.8"},"requestType":"GET","id":"629968dc586e62eec58eff9c"},{"headers":{"user-agent":"PostmanRuntime/7.29.0","accept":"*/*","postman-token":"5fc70f75-3bf7-4dda-846f-7fd3f3f0b090","host":"localhost:3000","accept-encoding":"gzip, deflate, br","connection":"keep-alive","content-type":"application/x-www-form-urlencoded","content-length":"38"},"payload":{"falala":"a third data of test!"},"requestType":"POST","id":"629968e7586e62eec58eff9e"}];