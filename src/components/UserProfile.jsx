// src/components/UserProfile.jsx
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const UserProfile = ({ user }) => {
  const { currentUser } = useContext(AuthContext);
  const [bio, setBio] = useState(user.bio);

  const handleBioChange = (e) => {
    setBio(e.target.value);
    // TODO: Update the user's bio in the database
  };

  return (
    <div className="userProfile">
      <img src={user.photoURL} alt="Profile" />
      <h2>{user.displayName}</h2>
      <textarea value={bio} onChange={handleBioChange} />
      {currentUser && <Link to={`/chat/${user.uid}`}>Chat</Link>}
    </div>
  );
};

export default UserProfile;