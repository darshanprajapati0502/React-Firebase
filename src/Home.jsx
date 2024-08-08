import React from 'react';
// import { useNavigate } from "react-router-dom";
import './Home.css'

import { useEffect } from 'react';
import { useState } from 'react';
import { db } from './Fireconfig';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
// import { getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';


function Home() {
   const navigate = useNavigate();
  
  //  const [user, setUser] = useState([]);
  //   useEffect(() => {
  //     const docRef = collection(db, "Addproduct");
  //     const docSnap = getDocs(docRef)
  //       .then((response) => {
  //         console.log(response);
  //         const data = response.docs.map((e) => {
  //           return e.data();
  //         });
  //         console.log(data);
  //         setUser(data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, []);
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
  getDownloadURL(ref(storage,`/images/${user.name}` ))
    .then((url) => {
      console.log(url);
    })
    .catch((error) => {
      // Handle any errors
    });

const handleUpdateClick = (keyid) => {
  navigate(`/Update/${keyid}`); // Navigate to UpdateProduct page
};
    

  
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
              <p className="font-serif font-normal text-[#16171a] py-4">
                Price:{e.price}₹
              </p>
          
            </div>
          );
        })}
      </div>
    </div>
  );

}
export default Home