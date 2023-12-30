import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const UserProfile = ({ user }) => {
  const { currentUser } = useContext(AuthContext);
  const params = useParams();
  const userId = params.userId;

  return (
    <div className="userProfile">
      <img src={user?.photoURL} alt="Profile" />
      <h2>{user?.displayName}</h2>
      <p>{user?.dollarsPerCharacter}</p>
      <p>RANDOM PERCENTAGE HERE</p>
      {currentUser && <Link to={`/chat/${user?.uid}`}>Chat</Link>}
    </div>
  );
};

export default UserProfile;
