// UploadForm.js
import React, { useState } from 'react';
import axios from 'axios';

export default function UploadForm() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input type="file" accept=".zip" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload ECG</button>
    </div>
  );
}
