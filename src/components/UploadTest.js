import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase'; // of './firebase' afhankelijk van locatie

function UploadTest() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [reportId, setReportId] = useState('test123');

  const handleUpload = async () => {
    if (!selectedFile || !reportId) return;

    const fileRef = ref(storage, `uploads/reports/${reportId}/${selectedFile.name}`);
    try {
      const snapshot = await uploadBytes(fileRef, selectedFile);
      const url = await getDownloadURL(snapshot.ref);
      setDownloadUrl(url);
      console.log('✅ Upload gelukt:', url);
    } catch (err) {
      console.error('❌ Upload mislukt:', err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Afbeelding uploaden</h2>
      <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>

      {downloadUrl && (
        <div>
          <p>✅ Download URL:</p>
          <a href={downloadUrl} target="_blank" rel="noopener noreferrer">{downloadUrl}</a>
        </div>
      )}
    </div>
  );
}

export default UploadTest;
