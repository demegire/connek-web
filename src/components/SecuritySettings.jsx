import React, { useContext } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";

const SecuritySettings = () => {
  const { currentUser } = useContext(AuthContext);
  const auth = getAuth();

  const handleResetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        alert('Password reset email sent!');
      })
      .catch((error) => {
        // An error occurred
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleResetPassword(currentUser.email);
  };

  return (
    <div className="accountSettings">
      <div className="profileInfo">
        <h2>Password</h2>
        <form onSubmit={handleSubmit}>
          <button type="submit">Reset Password</button>
        </form>
      </div>
      <hr/>
    </div>
  );
};

export default SecuritySettings;