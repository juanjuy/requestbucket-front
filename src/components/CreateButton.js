import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const CreateButton = () => {
  let navigate = useNavigate();

  const makeBucket = async () => {
    let req = await axios.post('/create');
    navigate('/create/' + req.data);
  }

  return (
    <div className="create-button">
      <button onClick={makeBucket} type="submit">MAKE BUCKET</button>
    </div>
  )
}

export default CreateButton;