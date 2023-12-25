import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../context/AuthContext";
import { doc, setDoc, getDoc } from "firebase/firestore"; // import getDoc for fetching document
import { db } from "../firebase";

const AttentionSettings = () => {
    const { currentUser } = useContext(AuthContext);
    const [dollarsPerCharacter, setDollarsPerCharacter] = useState('');
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        // Function to fetch the current setting from Firestore
        const fetchAttentionPrice = async () => {
            if (currentUser?.uid) {
                const docRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setDollarsPerCharacter(docSnap.data().dollarsPerCharacter || '');
                }
            }
        };

        fetchAttentionPrice();
    }, [currentUser]);

    const handleInputChange = async (event) => {
        const value = event.target.value;
        const isNumber = value.match(/^\d*\.?\d*$/); // regex pattern for integers or floats

        // Check if it's a number and not an empty string after the decimal
        const isValidNumber = isNumber && (value === '' || value.match(/\d/));

        setIsValid(isValidNumber);

        if (isValidNumber && value !== '.') {
            setDollarsPerCharacter(value);
            if (value && currentUser?.uid) {
                await setDoc(doc(db, "users", currentUser.uid), {
                    dollarsPerCharacter: value,
                },
                { merge: true });
            }
        }
    };

    return (
        <div className="accountSettings">
            <div className="profileInfo">
                <h2>Valuation</h2>
                <div className="inputContainer">
                    <input
                        type="text"
                        value={dollarsPerCharacter}
                        onChange={handleInputChange}
                        className={!isValid ? 'invalid' : ''}
                    />
                    {!isValid && <div className="error">Invalid value. Please enter a valid number (e.g., 1, 2, 0.22).</div>}
                    <span>USD per character</span>
                </div>
            </div>
            <hr />
        </div>
    );
};

export default AttentionSettings;
