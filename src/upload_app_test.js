import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function UploadAppTest() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const reportId = 'test123'; // dit mag je aanpassen per test

  // ✅ Check of je ingelogd bent
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('✅ Ingelogd als:', user.uid);
        setUserId(user.uid);
      } else {
        console.log('❌ Niet ingelogd!');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setError(null);

    const path = `uploads/reports/${reportId}/${selectedFile.name}`;
    const fileRef = ref(storage, path);

    try {
      const snapshot = await uploadBytes(fileRef, selectedFile);
      const url = await getDownloadURL(snapshot.ref);
      setDownloadUrl(url);
      console.log('✅ Upload geslaagd:', url);
    } catch (err) {
      console.error('❌ Upload mislukt:', err);
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>SPP Storing App – Upload Test</h2>

      {userId ? (
        <p style={{ fontSize: 14, color: 'gray' }}>🔐 Ingelogd als: {userId}</p>
      ) : (
        <p style={{ fontSize: 14, color: 'red' }}>⛔ Niet ingelogd</p>
      )}

      <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
      <br /><br />
      <button onClick={handleUpload} disabled={!selectedFile || uploading}>
        {uploading ? 'Bezig met uploaden...' : 'Upload'}
      </button>

      {downloadUrl && (
        <div style={{ marginTop: 20 }}>
          <p>✅ Download link:</p>
          <a href={downloadUrl} target="_blank" rel="noreferrer">{downloadUrl}</a>
        </div>
      )}

      {error && (
        <div style={{ marginTop: 20, color: 'red' }}>
          <p>❌ Fout: {error}</p>
        </div>
      )}
    </div>
  );
}

export default UploadAppTest;
