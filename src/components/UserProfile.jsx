import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const UserProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const userId = params.userId;

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setIsLoading(false);
        setUser(docSnap.data());
      }
    };

    getUserProfile();
  }, []);

  return (
    <div className="userProfile">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <img src={user?.photoURL} alt="Profile" />
          <h2>{user?.displayName}</h2>

          <p
            style={{ color: "rgb(175, 175, 175)", marginTop: "1rem" }}
          >{`Price per character for message: ${
            user?.dollarsPerCharacter
              ? "$" + user.dollarsPerCharacter
              : "Not set"
          }`}</p>
          <p style={{ color: "rgb(175, 175, 175)" }}>{`Response rate: 85%`}</p>
          {currentUser && (
            <Link
              style={{
                marginTop: "2rem",
              }}
              className="button"
              to={`/?chat=${user?.uid}`}
            >
              Chat with {user?.displayName}
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default UserProfile;
