// import React,{useEffect, useContext, useState} from 'react';

// import Heart from '../../assets/Heart';
// import './Post.css';
// import { FirebaseContext } from '../../store/Context';

// function Posts() {
// const {firebase} = useContext(FirebaseContext)
// const [products, setProducts] = useState([])

// useEffect(()=>{
//   firebase.firestore().collection('products').get().then((snapshot)=>{
//     const allPost = snapshot.docs.map((product)=>{
//       return{
//         ...product.data(),
//         id:product.id
//       }
//     })
//     setProducts(allPost)
//   })

// },[])
//    return (
//     <div className="postParentDiv">
//       <div className="moreView">
//         <div className="heading">
//           <span>Quick Menu</span>
//           <span>View more</span>
//         </div>
//         <div className="cards">
//           {products.map(product =>{
//             return <div
//             className="card"
//           >
//             <div className="favorite">
//               <Heart></Heart>
//             </div>
//             <div className="image">
//               <img src="../../../Images/R15V3.jpg" alt="" />
//             </div>
//             <div className="content">
//               <p className="rate">&#x20B9; 250000</p>
//               <span className="kilometer">Two Wheeler</span>
//               <p className="name"> YAMAHA R15V3</p>
//             </div>
//             <div className="date">
//               <span>Tue May 04 2021</span>
//             </div>
//           </div>

//           })
          
//             }
//         </div>
//       </div>
//       <div className="recommendations">
//         <div className="heading">
//           <span>Fresh recommendations</span>
//         </div>
//         <div className="cards">
//           <div className="card">
//             <div className="favorite">
//               <Heart></Heart>
//             </div>
//             <div className="image">
//               <img src="../../../Images/R15V3.jpg" alt="" />
//             </div>
//             <div className="content">
//               <p className="rate">&#x20B9; 250000</p>
//               <span className="kilometer">Two Wheeler</span>
//               <p className="name"> YAMAHA R15V3</p>
//             </div>
//             <div className="date">
//               <span>10/5/2021</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Posts;
// import React, { useEffect, useContext, useState } from 'react';
// import { getFirestore, collection, getDocs } from 'firebase/firestore'; 
// import Heart from '../../assets/Heart';
// import './Post.css';
// import { FirebaseContext } from '../../store/Context';
// import { db } from '../../firebase/config';  // Adjust the path if needed

// function Posts() {
//   const { firebase } = useContext(FirebaseContext);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const firestore = getFirestore(firebase);
//     const productsCollection = collection(firestore, 'products');
    
//     getDocs(productsCollection).then((snapshot) => {
//       const allPost = snapshot.docs.map((product) => {
//         return {
//           ...product.data(),
//           id: product.id,
//         };
//       });
//       setProducts(allPost);
//     });
//   }, [firebase]);
// const Posts = () => {
//   const [posts, setPosts] = useState([]);
//   const [products, setProducts] = useState([]);
//  // To store posts data

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         // Get the Firestore collection reference
//         const postsCollection = collection(db, 'products');
//         // Get all documents in the posts collection
//         const snapshot = await getDocs(productsCollection);
//         const productList = productSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setProducts(productList); // Update state with the posts
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };

//     fetchPosts(); // Call the function to fetch posts when the component mounts
//   }, []);
//   return (
//     <div className="postParentDiv">
//       <div className="moreView">
//         <div className="heading">
//           <span>Quick Menu</span>
//           <span>View more</span>
//         </div>
//         <div className="cards">
//           {products && products.length > 0 ? (
//             products.map((product) => {
//               return (
//                 <div key={product.id} className="card">
//                   <div className="favorite">
//                     <Heart />
//                   </div>
//                   <div className="image">
//                     {/* Check if product image exists, otherwise use a fallback image */}
//                     <img src={product.image || "../../../Images/R15V3.jpg"} alt={product.name || "Product"} />
//                   </div>
//                   <div className="content">
//                     {/* Display product price with a fallback */}
//                     <p className="rate">&#x20B9; {product.price || '250000'}</p>
//                     {/* Display product type with a fallback */}
//                     <span className="kilometer">{product.type || 'Two Wheeler'}</span>
//                     {/* Display product name with a fallback */}
//                     <p className="name">{product.name || 'YAMAHA R15V3'}</p>
//                   </div>
//                   <div className="date">
//                     {/* Display product date with a fallback */}
//                     <span>{product.date || 'Tue May 04 2021'}</span>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <p>No products available</p> // Handle case when there are no products
//           )}
//         </div>
//       </div>
//       <div className="recommendations">
//         <div className="heading">
//           <span>Fresh recommendations</span>
//         </div>
//         <div className="cards">
//           {/* Static recommendation card - could be dynamic if needed */}
//           <div className="card">
//             <div className="favorite">
//               <Heart />
//             </div>
//             <div className="image">
//               <img src="../../../Images/R15V3.jpg" alt="Product" />
//             </div>
//             <div className="content">
//               <p className="rate">&#x20B9; 250000</p>
//               <span className="kilometer">Two Wheeler</span>
//               <p className="name">YAMAHA R15V3</p>
//             </div>
//             <div className="date">
//               <span>10/5/2021</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };




// import React, { useEffect, useState } from 'react';
// import { db } from '../../firebase/config'; // Firebase config import
// import { collection, getDocs } from 'firebase/firestore'; // Firestore functions import
// import Heart from '../../assets/Heart'; // Heart icon import
// import { PostContext } from '../../store/PostContext';
// import {useHistory} from 'react-router-dom'
// const Posts = () => {
//   const [products, setProducts] = useState([]);
//   const {setPostDetails} = useContext(PostContext)
//   const history = useHistory();
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         // Fetch the 'products' collection from Firestore
//         const productsCollection = collection(db, 'products');
//         const productSnapshot = await getDocs(productsCollection);
        
//         // Map the snapshot to get the products data and extract the image URLs
//         const productList = productSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         // Set the fetched product data to state
//         setProducts(productList);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, []); // Empty dependency array means it runs only once when the component mounts




//   return (
//     <div className="postParentDiv">
//     <div className="moreView">
//       <div className="heading">
//         <span>Quick Menu</span>
//         <span>View more</span>
//       </div>
//       <div className="cards">
//         {products.map((product) => (
//           <div
//           className="card" onClick={()=>{
//             setPostDetails(product)
//           }} key={product.id}
//           >
//           <div className="favorite">
//             <Heart></Heart>
//           </div>
//           <div className="image">
//             <img src={product.image} alt="" />
//           </div>
//           <div className="content">
//             <p className="rate">{product.price}</p>
//             <span className="kilometer">{product.category}</span>
//             <p className="name">{product.name}</p>
//           </div>
//           <div className="date">
//             <span>{product.createdAt || 'Tue October 26 2024'}</span>
//           </div>
//         </div>
//         ))}
        
//       </div>
//     </div>
//     <div className="recommendations">
//       <div className="heading">
//         <span>Fresh recommendations</span>
//       </div>
//       <div className="cards">
//         <div className="card">
//           <div className="favorite">
//             <Heart></Heart>
//           </div>
//           <div className="image">
//             <img src="../../../Images/R15V3.jpg" alt="" />
//           </div>
//           <div className="content">
//             <p className="rate">&#x20B9; 250000</p>
//             <span className="kilometer">Two Wheeler</span>
//             <p className="name"> YAMAHA R15V3</p>
//           </div>
//           <div className="date">
//             <span>10/5/2021</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   );
// };



// export default Posts;





// import React, { useEffect, useState, useContext } from 'react';
// import { db } from '../../firebase/config'; // Firebase config
// import { collection, getDocs } from 'firebase/firestore'; // Firestore functions
// import Heart from '../../assets/Heart'; // Heart icon
// import { PostContext } from '../../store/PostContext'; // Context for sharing post details
// import { useHistory } from 'react-router-dom'; // For navigation
// import './Post.css'; // Styling

// const Posts = () => {
//   const [products, setProducts] = useState([]); // State to store products
//   const { setPostDetails } = useContext(PostContext); // Access PostContext
//   const history = useHistory(); // Navigation instance

//   // Fetch products from Firestore
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const productsCollection = collection(db, 'products'); // Firestore collection
//         const productSnapshot = await getDocs(productsCollection); // Fetch documents
//         const productList = productSnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setProducts(productList); // Update state with fetched data
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts(); // Call fetch function
//   }, []);

//   // Handle product click to set details and navigate
//   const handleProductClick = (product) => {
//     setPostDetails(product); // Set selected product details in context
//     history.push('/view'); // Navigate to product details page
//   };

//   return (
//     <div className="postParentDiv">
//       {/* Quick Menu Section */}
//       <div className="moreView">
//         <div className="heading">
//           <span>Quick Menu</span>
//           <span>View more</span>
//         </div>
//         <div className="cards">
//           {products.length > 0 ? (
//             products.map((product) => (
//               <div
//                 key={product.id}
//                 className="card"
//                 onClick={() => handleProductClick(product)} // On product click
//               >
//                 <div className="favorite">
//                   <Heart />
//                 </div>
//                 <div className="image">
//                   <img
//                     src={product.image || "../../../Images/default-product.jpg"} // Fallback image
//                     alt={product.name || "Product"}
//                   />
//                 </div>
//                 <div className="content">
//                   <p className="rate">&#x20B9; {product.price || 'Price not available'}</p>
//                   <span className="kilometer">{product.type || 'Unknown Type'}</span>
//                   <p className="name">{product.name || 'No Name Available'}</p>
//                 </div>
//                 <div className="date">
//                   <span>{product.date || 'Unknown Date'}</span>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No products available</p>
//           )}
//         </div>
//       </div>

//       {/* Recommendations Section */}
//       <div className="recommendations">
//         <div className="heading">
//           <span>Fresh recommendations</span>
//         </div>
//         <div className="cards">
//           <div className="card">
//             <div className="favorite">
//               <Heart />
//             </div>
//             <div className="image">
//               <img src="../../../Images/R15V3.jpg" alt="Default Recommendation" />
//             </div>
//             <div className="content">
//               <p className="rate">&#x20B9; 250000</p>
//               <span className="kilometer">Two Wheeler</span>
//               <p className="name">YAMAHA R15V3</p>
//             </div>
//             <div className="date">
//               <span>10/5/2021</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Posts;





import React, { useEffect, useState, useContext } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import Heart from '../../assets/Heart';
import { PostContext } from '../../store/PostContext';
import { useHistory } from 'react-router-dom';
import './Post.css'; // Styling

const Posts = () => {
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(PostContext);
  const history = useHistory();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div
              className="card"
              onClick={() => {
                setPostDetails(product);
                history.push('/view'); // Navigate to the product details page
              }}
              key={product.id}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img
                  src={product.image || '../../../Images/default-product.jpg'}
                  alt={product.name || 'Product'}
                />
              </div>
              <div className="content">
                <p className="rate">₹{product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt || 'Tue October 25 2024'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
