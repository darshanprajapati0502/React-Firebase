import React from 'react'
import "./Home.css";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "./Fireconfig";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
// import { getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

function AdminHome() {
    const navigate = useNavigate();
     
  const [user, setUser] = useState([]);
  useEffect(() => {
    onSnapshot(collection(db, "Addproduct"), (snap) => {
      const Alldata = snap.docs.map((e) => ({
        keyid: e.id,
        ...e.data(),
      }));
      console.log(Alldata);
      setUser(Alldata);
    });
  }, []);
  async function deletefn(keyid) {
    console.log(keyid);
    await deleteDoc(doc(db, "Addproduct", keyid))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const storage = getStorage();
  getDownloadURL(ref(storage, `/images/${user.name}`))
    .then((url) => {
      console.log(url);
    })
    .catch((error) => {
      // Handle any errors
    });

  const handleUpdateClick = (keyid) => {
    navigate(`/Update/${keyid}`); // Navigate to UpdateProduct page
  };
  useEffect(()=>{
    const email = localStorage.getItem("signInEmail");
    if(email!=='nd2405@gmail.com')
      {
         navigate("/");
      }
  },[]);
    
  return (
    <div className="Home  ">
      <div className="py-1">
        <h2 className="text-[#3c3e3d] font-bold text-3xl font-serif m-10 underline">
          ALL PRODUCTS
        </h2>
      </div>
      <div className="items gap-y-7  ">
        {user.map((e, i) => {
          return (
            <div className="itemscon gap-4" key={i}>
              <p className="font-bold text-2xl py-3 text-[#5f6fa5] underline">
                ID:{e.keyid}
              </p>
              <h3 className="font-bold text-2xl py-3 text-[#5f6fa5] underline">
                Name:
              </h3>
              <p className="font-serif font-normal text-[#16171a] h-16">
                {e.name}
              </p>
              <h4 className="font-mono text-xl font-bold text-[#16171a]">
                ID:{e.id}
              </h4>
              <h3 className="font-bold text-2xl py-3 text-[#5f6fa5]">
                Description:
              </h3>
              <h4 className="font-serif font-normal h-40 text-[#16171a]">
                {e.description}
              </h4>
              <img
                className="font-serif font-normal h-52  rounded-xl text-[#16171a] "
                src={e.photo}
                alt="none"
              />
              <p className="font-serif font-normal text-[#16171a]">
                Price:{e.price}₹
              </p>
              {/* <button
                className="font-serif font-normal text-[#fffff]"
                onClick={() => {
                  deletefn(e.keyid);
                }}
              >
                DELETE
              </button> */}
              <button
                onClick={() => {
                  deletefn(e.keyid);
                }}
                className="noselect my-4"
              >
                <span className="text">Delete all</span>
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path>
                  </svg>
                </span>
              </button>
              <button
                onClick={() => handleUpdateClick(e.keyid)}
                className="noselect my-4"
              >
                <span className="text">Update</span>
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 1L8.28 4.72 14.56 11L18.28 7.28 12 1ZM3 22H21V20H3V22ZM4 18H20V20H4V18Z"></path>
                  </svg>
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminHome