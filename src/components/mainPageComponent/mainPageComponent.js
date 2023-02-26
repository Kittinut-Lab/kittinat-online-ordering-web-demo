import React from 'react';
import { useHistory } from 'react-router-dom';
import { withRouter } from "react-router-dom";


function MainPage() {
  const history = useHistory();

  const handleLogout = () => {
    // Perform logout logic here
    history.push('/');
  };

  return (
    <div>
      <h1>Welcome to the Main Page!</h1>
      <p>You are now logged in.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default withRouter(MainPage);
