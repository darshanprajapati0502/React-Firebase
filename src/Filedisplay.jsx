import React, { useEffect, useState } from 'react'
import { storage } from './Fireconfig';

function Filedisplay() {
    const [files, setFiles] = useState([]);
    const folderPath = files.name; // Replace with the path to your folder in Firebase Storage

    useEffect(() => {
      const fetchFiles = async () => {
        try {
          const listRef = storage.ref(folderPath);

          // List all items (files) in the specified folder
          const result = await listRef.listAll();
          const urls = await Promise.all(
            result.items.map(async (itemRef) => {
              // Get download URL for each file
              const url = await itemRef.getDownloadURL();
              return { url, name: itemRef.name };
            })
          );

          setFiles(urls);
        } catch (error) {
          console.error("Error fetching files:", error);
        }
      };

      fetchFiles();
    }, [folderPath]);
  return (
    <div>
      <h1>Files in Storage</h1>
      <div>
        {files.length === 0 ? (
          <p>No files found.</p>
        ) : (
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                <img
                  src={file.name}
                  alt={file.name}
                  style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '10px',}}
                  
                />
                <p>{file.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Filedisplay