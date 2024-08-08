import React, { useState } from "react";
import { db, storage } from "./Fireconfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

function Model() {
  const [file, setFile] = useState(null);
  const [imageurl, setI] = useState("");

  //  var imageurl = null;

  // const [data, setData] = useState([]);
  // const [image, setImage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    // setImage(e.target.files[0]);
  };
  const handleFileUpload = () => {
    console.log(file);
   
    const storageRef = ref(storage, `/images/${file.name}`);
    uploadBytes(storageRef, file)
      .then(() => {
         getDownloadURL(ref(storage, `/images/${file.name}`)).then((url) => {
          // imageurl = url;
         
          console.log("Download URL:", url);
           setI(url);
           
        });
        console.log("Uploaded a blob or file!");
      })
      .catch((error) => {
        console.log(error);
      });

      const docref = addDoc(collection(db, "Addproduct_2"), {
        ImageUrl:imageurl
      })
        .then((response) => {
          console.log(response);
          
        })
        .catch((error) => {
          console.log(error);
        });
   };

  //   if (image == null) return;
  //   // Sending File to Firebase Storage
  //   storage
  //     .ref(`/images/${image.name}`)
  //     .put(image)
  //     .on("state_changed", alert("success"), alert);
  // };
  // const listItem = () => {
  //   storage
  //     .ref()
  //     .child("images/")
  //     .listAll()
  //     .then((res) => {
  //       res.items.forEach((image) => {
  //         setData((arr) => [...arr, image.name]);
  //       });
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //     });
  // };

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-10">
      <div className="flex items-center justify-center p-3 bg-[#f4f4f4] hover:bg-[#87adcf] gap-10 rounded-2xl outline-none border-none">
        <input
          onChange={handleFileChange}
          type="file"
          placeholder="upload the file "
          className="bg-slate-500 rounded-2xl "
        />
        <button
          className="bg-[#2b95b3] h-7 flex justify-center items-center w-100  outline-none "
          onClick={handleFileUpload}
        >
          Add the file
        </button>
      </div>
      <div className="flex justify-center items-center grid-cols-4">
        <img src={imageurl} alt="" className="h-20 w-20 bg-slate-400 rounded-2xl" />
      </div>
      {/* <button onClick={listItem}>List Item</button>
      <br />
      <br />
      {data.map((val) => (
        <h2>{val}</h2>
      ))}*/}
    </div>
  );
}

export default Model;
