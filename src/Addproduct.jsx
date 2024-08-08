import React, { useEffect, useState } from "react";
import "./Addproduct.css";

import { db, getDownloadURL } from "./Fireconfig";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

function Addproduct() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    photo: "",
    price: "", // Initialize price as an empty string
    id: "",
  });

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
    console.log("Form Data:", data);

    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `/images/${file.name}`);

      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setImage(url);

        await addDoc(collection(db, "Addproduct"), {
          name: data.name,
          id: data.id,
          description: data.description,
          price: data.price,
          photo: url, // Use the URL from getDownloadURL
        });

        console.log("Document successfully written.");
      } catch (error) {
        console.error("Error uploading file or adding document: ", error);
      }
    } else {
      console.error("No file selected for upload.");
    }
  };

  const [user, setUser] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Addproduct"), (snap) => {
      const allData = snap.docs.map((e) => ({
        keyid: e.id,
        ...e.data(),
      }));
      console.log(allData);
      setUser(allData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="product-form-container">
      <div className="main">
        <form onSubmit={handleSubmit} className="product-form">
          <h2 className="text-2xl font-bold text-[#5e7ad6]">ADD PRODUCT DETAILS</h2>
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

          <label htmlFor="id">Id:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={data.id}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Addproduct;
