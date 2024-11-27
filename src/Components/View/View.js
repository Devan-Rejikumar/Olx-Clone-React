import React, { useEffect, useState, useContext } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import { query, where, getDocs, collection } from "firebase/firestore";
import { db } from '../../firebase/config';

function View() {
  const [userDetails, setUserDetails] = useState({
    name: "Loading...",
    phone: "Loading...",
  });

  const { postDetails } = useContext(PostContext); // Product details from context
  const { firebase } = useContext(FirebaseContext); // Firebase instance

  useEffect(() => {
    const fetchSeller = async () => {
      if (!postDetails?.sellerId) {
        console.error("Seller ID is missing.");
        return;
      }
    
      try {
        const q = query(collection(db, "user"), where("id", "==", postDetails.sellerId));
        const querySnapshot = await getDocs(q);
    
        if (querySnapshot.empty) {
          console.warn("No seller document found.");
          setUserDetails({ name: 'No name available', phone: 'No phone available' });
        } else {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            setUserDetails({ name: data.username, phone: data.phone });
          });
        }
      } catch (error) {
        console.error("Error fetching seller details:", error);
        setUserDetails({ name: 'No name available', phone: 'No phone available' });
      }
    };

    fetchSeller(); // Call the function inside useEffect

  }, [postDetails]);  // Re-run when postDetails changes

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails?.image || '../../../Images/placeholder.png'}
          alt={postDetails?.name || 'Product'}
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price || 'N/A'}</p>
          <span>{postDetails?.name || 'Unknown Product'}</span>
          <p>{postDetails?.category || 'Unknown Category'}</p>
          <span>{postDetails?.createdAt || 'Unknown Date'}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.name}</p>
          <p>{userDetails?.phone}</p>
        </div>
      </div>
    </div>
  );
}

export default View;