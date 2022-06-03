import React from 'react';
import { useParams } from "react-router";

const CreatedPage = () => {
  let { bucketUrl } = useParams();
  let host = window.location.origin.toString();
  return (
    <div>
      <p>{host + '/' + bucketUrl}</p>
    </div>
  )
}

export default CreatedPage;