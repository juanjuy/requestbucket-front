import React from 'react';
import { useParams } from "react-router";

const CreatedPage = () => {
  let { bucketUrl } = useParams();

  let requestLink = window.location.origin.toString() + '/' + bucketUrl;
  let historyLink = window.location.origin.toString() + '/history/' + bucketUrl;

  const copyLink = (link) => {
    return async function(event) {
      await navigator.clipboard.writeText(link);
      event.target.innerHTML = 'Link copied!';
    }
  }

  let host = window.location.origin.toString();
  return (
    <div>
      <h2>Send requests to this link:</h2>
      <p>{host + '/' + bucketUrl}</p><button id="copy-button" onClick={copyLink(requestLink)}>Copy link</button>
      <h2>Check your request history here:</h2>
      <p>{host + '/history/' + bucketUrl}</p><button id="copy-button" onClick={copyLink(historyLink)}>Copy link</button>
    </div>
  )
}

export default CreatedPage;