import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import '../animations.scss'; // Import the CSS file for styling
import { downsizeImage } from '../utils';


const AccountSettings = () => {
  const { currentUser } = useContext(AuthContext);
  const storage = getStorage();
  const [loading, setLoading] = useState(false);
  const [funds, setFunds] = useState('');

  const handleImageUpload = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const downsizedImage = await downsizeImage(file, 128, 128); // Specify the desired downsized dimensions

    const date = new Date().getTime();
    const displayName = currentUser.displayName;
    const storageRef = ref(storage, 'profilePictures/' + `${displayName + date}`); // Eskisini sil
    await uploadBytesResumable(storageRef, downsizedImage).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        try {
          await updateProfile(currentUser, {
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "users", currentUser.uid), {
            photoURL: downloadURL,
          },
          { merge: true });
          setLoading(false);
        } catch (err) {
          setLoading(false);
        }
      });
    });
  };

  const depositFunds = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, "users", currentUser.uid), {
      funds: 5,
    },
    { merge: true });
    setFunds(5);
  };

  const withdrawFunds = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, "users", currentUser.uid), {
      funds: 1,
    },
    { merge: true });
    setFunds(1);
  };

  useEffect(() => {
    // Function to fetch the current setting from Firestore
    const fetchFunds = async () => {
        if (currentUser?.uid) {
            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setFunds(docSnap.data().funds || '');
            }
        }
    };

    fetchFunds();
}, [currentUser]);

  return (
    <div className="accountSettings">
      <div className="profileInfo">
        <h2>Profile Picture</h2>
        {loading ? (
          <div className="loadingAnimation"></div>
        ) : (
          <img src={currentUser.photoURL} alt="Profile" />
        )}        <p>{currentUser.displayName}</p>
        <input type="file" onChange={handleImageUpload} />
      </div>
      <hr/>
      <div className="profileInfo">
        <h2>Funds</h2>
        <div className="funds">
          <h2>$ {funds}</h2>
          <form onSubmit={depositFunds}>
            <button type="submit">Add</button>
          </form>
          <form onSubmit={withdrawFunds}>
            <button type="submit">Withdraw</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;