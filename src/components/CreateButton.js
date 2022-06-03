import React from 'react';

const CreateButton = () => {
  const backendUrl = "http://localhost:3000";

  return (
    <form method="POST" action={backendUrl + '/create'}>
      <button type="submit">MAKE BUCKET</button>
    </form>
  )
}

export default CreateButton;