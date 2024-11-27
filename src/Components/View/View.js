
import React, { useEffect, useState, useContext } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';

function View() {
  const [userDetails, setUserDetails] = useState(null); // To store user (seller) details
  const { postDetails } = useContext(PostContext); // Product details from context
  const { firebase } = useContext(FirebaseContext); // Firebase instance

  useEffect(() => {
    if (postDetails?.userId) {
      const fetchUserDetails = async () => {
        try {
          const snapshot = await firebase
            .firestore()
            .collection('user')
            .where('id', '==', postDetails.userId)
            .get();

          snapshot.forEach((doc) => {
            setUserDetails(doc.data());
          });
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };

      fetchUserDetails();
    }
  }, [postDetails, firebase]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        {/* Display product image */}
        <img
          src={postDetails?.image || '../../../Images/placeholder.png'}
          alt={postDetails?.name || 'Product'}
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          {/* Display product details */}
          <p>&#x20B9; {postDetails?.price || 'N/A'}</p>
          <span>{postDetails?.name || 'Unknown Product'}</span>
          <p>{postDetails?.category || 'Unknown Category'}</p>
          <span>{postDetails?.createdAt || 'Unknown Date'}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          {/* Display seller details */}
          <p>{userDetails?.name || 'No Name'}</p>
          <p>{userDetails?.phone || 'No Contact Info'}</p>
        </div>
      </div>
    </div>
  );
}

export default View;

