import React, { useContext, useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { SearchedUserContext } from "../context/SearchedUserContext";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";

import sampleImage from "../img/sampleImage.jpg";
import sampleImage2 from "../img/sampleImage2.jpg";
import sampleImage3 from "../img/sampleImage3.jpg";
import nopp from "../img/noprofilepicture.png";

const imageArr = [sampleImage, sampleImage2, sampleImage3, nopp];

const ProfilesPage = () => {
  const { username } = useParams();
  const { setSearchedUser } = useContext(SearchedUserContext);

  const [user, setUser] = useState({});

  const [err, setErr] = useState(false);
  const handleUser = async () => {
    console.log(username);
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    // const q = query(collection(db, "users"));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data().photoURL)
        let img = doc.data().photoURL
          ? imageArr[Math.floor(Math.random() * (imageArr.length - 2))] // random profile picture
          : imageArr[3]; // no profile picture

        setSearchedUser({
          ...doc.data(),
          responseRate: Math.floor(Math.random() * 100),
          photoURL: img,
        });
        setUser({
          ...doc.data(),
          responseRate: Math.floor(Math.random() * 100),
          photoURL: img,
        });

        console.log(doc.data());
      });
    } catch (err) {
      setErr(true);
      console.log(err);
    }
  };

  useEffect(() => {
    handleUser();
  }, []);
 
  return (
    <div className="home">
      
      
      {err && (
        <div className="">
          <h1>Kullanıcı Bulunamadı.</h1>
          <Link to={`/`}>Chat</Link>
        </div>
      )}
      {user.displayName ? (
        <div className="chatProfile">
          <img
            src={
              user.photoURL
                ? imageArr[Math.floor(Math.random() * 2)]
                : nopp
            }
            alt="user"
          />
          <h3 className="chatProfileUsername">{user.displayName}</h3>
          <p className="chatProfileMessageCost">
            {user.dollarsPerCharacter
              ? user.dollarsPerCharacter + "$ / Character"
              : "Chat price not specified."}
          </p>
          <p className="chatProfileResponseRate">
            Responds to  
            <span
              className={
                user.responseRate >= 50
                  ? "highlighted-green"
                  : "highlighted-red"
              }
            >
              
              {" "}{user.responseRate}%{" "}
            </span>
             of the users within a day.
          </p>
          <Link className="startChat" to="/">
            View In Chat
          </Link>
        </div>
      ) : (
        <div className="loadingAnimation"></div>
      )}
    </div>
  );
};

export default ProfilesPage;
