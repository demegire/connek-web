import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db  } from "../firebase";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import '../animations.scss'; // Import the CSS file for styling


const Register = () => {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      // Check if user name already exists
      const querySnapshot = await getDocs(collection(db, "userNames"));

      querySnapshot.forEach((doc) => {
        if (String(doc.id) == displayName){
          throw "user_name_exists";
        }
      });

      // Create user on auth
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Update profile
      await updateProfile(res.user, {
        displayName,
      });

      // Create user on firestore
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
      });

      // Add displayName and uid to the 'userNames' table on Firestore
      await setDoc(doc(db, "userNames", displayName), {
        uid: res.user.uid
      });

      // Create empty user chats on firestore
      await setDoc(doc(db, "userChats", res.user.uid), {});
      navigate("/");

    } catch (err) {
      if (err=="user_name_exists"){
        setErr("User name already exists, please pick a different one.");
      } else {
        setErr("Failed to create account, please try again in a while.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">connek</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="user name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <button disabled={loading}>Sign Up</button>
        </form>
        {err && <p> {err} </p>}
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
