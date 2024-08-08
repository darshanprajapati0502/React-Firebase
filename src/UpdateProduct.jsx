import React, { useEffect, useState } from "react";
import { db, getDownloadURL } from "./Fireconfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {
  const { pId } = useParams(); // Use this directly for document reference
  console.log(pId);
  // const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    photo: "",
    price: "",
    id: "", // This field is not needed for update
  });

  // Fetch product data based on pId
  useEffect(() => {
    if (pId) {
      const fetchProduct = async () => {
        const docRef = doc(db, "Addproduct", pId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data());
          setImage(docSnap.data().photo);
        } else {
          console.log("No such document!");
        }
      };

      fetchProduct();
    }
  }, [pId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFile(files[0]);
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newImageUrl = image; // Default to existing image if no new file is selected

    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `/images/${file.name}`);

      try {
        await uploadBytes(storageRef, file);
        newImageUrl = await getDownloadURL(storageRef);
      } catch (error) {
        console.error("Error uploading file: ", error);
      }
    }

    try {
      const docRef = doc(db, "Addproduct", pId); // Use pId directly
      await updateDoc(docRef, {
        name: data.name,
        description: data.description,
        price: data.price,
        photo: newImageUrl, // Use new image URL if available
      });
      console.log("Document successfully updated.");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div className="product-form-container">
      <div className="main">
        <form onSubmit={handleSubmit} className="product-form ">
          <h2 className="text-2xl font-bold text-[#5e7ad6]">
            UPDATE PRODUCT DETAILS
          </h2>

          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={data.description}
            onChange={handleChange}
            required
          ></textarea>

          <label htmlFor="photo">Photo:</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleChange}
          />

          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={data.price}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
