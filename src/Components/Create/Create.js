// import React, { Fragment, useState, useContext } from 'react';
// import './Create.css';
// import Header from '../Header/Header';
// import {} from '../../store/Context'
// import {FirebaseContext, AuthContext} from '../../store/Context'
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// const Create = () => {
//   const {firebase} = useContext(FirebaseContext)
//   const { storage } = useContext(FirebaseContext);
//   const {user} = useContext(AuthContext)
//   const [name, setName] = useState('');
//   const [category, setCategory] = useState('');
//   const [price, setPrice] = useState('');
//   const [image, setImage] = useState('');
//   // const handleSubmit = () =>{
//   //    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
//   //     ref.getDownloadURL().then((url)=>{
//   //       console.log(url)
//   //     })
//   //    })
//   // }
//   const handleSubmit = async(event) => {
//     // if (image) {
//     //   // Create a reference to the storage location
//     //   const storageRef = ref(storage, `/image/${image.name}`);
      
//     //   // Upload file to Firebase Storage
//     //   uploadBytes(storageRef, image).then(() => {
//     //     // Get the download URL after uploading
//     //     getDownloadURL(storageRef).then((url) => {
//     //       console.log("Uploaded image URL:", url);
//     //       // You can now use the URL as needed
//     //     });
//     //   });
//     // }
//     const file = event.target.files[0];

// if (!file) return;

// const data = new FormData();
// data.append('file', file);
// data.append('upload_preset', 'olx clone'); // Replace with your actual upload preset
// data.append('cloud_name', 'dgbbdhdg7'); // Replace with your actual cloud name

// try {
//   const response = await fetch('https://api.cloudinary.com/v1_1/dgbbdhdg7/image/upload', {
//     method: 'POST',
//     body: data,
//   });

//   // Parse the JSON response
//   const uploadedImage = await response.json();
//   console.log("Uploaded image URL:", uploadedImage.url);
// } catch (error) {
//   console.error("Error uploading image:", error);
// }


//   return (
//     <Fragment>
//       <Header />
//       <card>
//         <div className="centerDiv">
          
//             <label htmlFor="fname">Name</label>
//             <br />
//             <input
//               className="input"
//               type="text"
//               value={name}
//               id="fname"
//               onChange={(e)=>setName(e.target.value)}
//               name="Name"
//               defaultValue="John"
//             />
//             <br />
//             <label htmlFor="fname">Category</label>
//             <br />
//             <input
//               className="input"
//               type="text"
//               value={category}
//               id="fname"
//               onChange={(e)=>setCategory(e.target.value)}
//               name="category"
//               defaultValue="John"
//             />
//             <br />
//             <label htmlFor="fname">Price</label>
//             <br />
//             <input className="input" type="number" value={price} id="fname" onChange={(e)=>setPrice(e.target.value)} name="Price" />
//             <br />
        
//           <br />
//           <img  alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
         
//             <br />
//             <input onChange={(e)=>setImage(e.target.files[0])} type="file" />
//             <br />
//             <button onClick={handleSubmit} className="uploadBtn">Upload and Submit</button>
         
//         </div>
//       </card>
//     </Fragment>
//   );
// };

// export default Create;
import React, { Fragment, useState, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/Context';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {useHistory} from 'react-router-dom'

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { storage } = useContext(FirebaseContext); // Ensure `storage` is correctly initialized in your Firebase configuration.
  const { user } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false); // State to track upload status

  const history = useHistory();

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
      setUploadedImageUrl(uploadedImage.url); // Save uploaded image URL to state
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false); // Set uploading state to false
    }
    history.push('/')
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
        />
        <br />
        <img
          alt="Preview"
          width="200px"
          height="200px"
          src={image ? URL.createObjectURL(image) : uploadedImageUrl || ''}
        />
        <br />
        <input onChange={(e) => setImage(e.target.files[0])} type="file" />
        <br />
        <button onClick={handleSubmit} className="uploadBtn" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Upload and Submit'}
        </button>
      </div>
    </Fragment>
  );
};

export default Create;

