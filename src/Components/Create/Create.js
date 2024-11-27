import React, { Fragment, useState, useContext, useEffect } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/Context';
import { useHistory } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';

const Create = () => {
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    let objectUrl;
    if (image) {
      objectUrl = URL.createObjectURL(image);
    }
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [image]);

  const handleSubmit = async () => {
    if (!image) {
      console.error('No image selected!');
      return;
    }
  
    setIsUploading(true); // Set uploading state to true
  
    // Using Cloudinary for file upload
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'olx clone'); // Replace with your actual upload preset
    data.append('cloud_name', 'dgbbdhdg7'); // Replace with your actual cloud name
  
    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dgbbdhdg7/image/upload',
        {
          method: 'POST',
          body: data,
        }
      );
  
      const uploadedImage = await response.json();
      console.log('Uploaded image URL:', uploadedImage.url);
      
      const date = new Date().toDateString()
      // Add the product to Firestore using the URL directly
      const usersCollection = collection(db, 'products');
      await addDoc(usersCollection, {
        name,
        price,
        category,
        image: uploadedImage.url, // Use the URL directly
        sellerId: user.uid,
        createdAt: date
      });
  
      console.log('Product added successfully!');
      history.push('/');
  
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false); // Set uploading state to false
    }
  };
  

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <label htmlFor="fname">Name</label>
        <br />
        <input
          className="input"
          type="text"
          value={name}
          id="fname"
          onChange={(e) => setName(e.target.value)}
          name="Name"
          disabled={isUploading}
        />
        <br />
        <label htmlFor="category">Category</label>
        <br />
        <input
          className="input"
          type="text"
          value={category}
          id="category"
          onChange={(e) => setCategory(e.target.value)}
          name="Category"
          disabled={isUploading}
        />
        <br />
        <label htmlFor="price">Price</label>
        <br />
        <input
          className="input"
          type="number"
          value={price}
          id="price"
          onChange={(e) => setPrice(e.target.value)}
          name="Price"
          disabled={isUploading}
        />
        <br />
        <img
          alt="Preview"
          width="200px"
          height="200px"
          src={image ? URL.createObjectURL(image) : ''}
        />
        <br />
        <input onChange={(e) => setImage(e.target.files[0])} type="file" disabled={isUploading} />
        <br />
        <button onClick={handleSubmit} className="uploadBtn" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Upload and Submit'}
        </button>
      </div>
    </Fragment>
  );
};

export default Create;
