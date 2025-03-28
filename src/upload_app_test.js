import React, { useState, useEffect } from 'react';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCXLiGBdPLTtUKk6IRfq-FWz4sZc1c7rCk",
  authDomain: "spp-storing-app.firebaseapp.com",
  projectId: "spp-storing-app",
  storageBucket: "spp-storing-app.appspot.com",
  messagingSenderId: "230498060957",
  appId: "1:230498060957:web:ad9a7d6fd321555a9ea274",
  measurementId: "G-W5J754LYW0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

function UploadTestApp() {
  const [userId, setUserId] = useState(null);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  // Inloggen
  useEffect(() => {
    signInAnonymously(auth).catch((err) => console.error("❌ Auth error:", err));

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("✅ Ingelogd als:", user.uid);
        setUserId(user.uid);
      } else {
        console.warn("❌ Niet ingelogd");
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUpload = async () => {
    if (!file || !userId) return;

    const filePath = `uploads/reports/demo-${Date.now()}/${file.name}`;
    const storageRef = ref(storage, filePath);

    try {
      setUploading(true);
      setError(null);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("✅ File uploaded:", downloadURL);
      setUrl(downloadURL);
    } catch (err) {
      console.error("❌ Upload failed:", err);
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: 'Arial' }}>
      <h1>✅ Upload Test</h1>
      <p style={{ fontSize: 14 }}>Gebruiker: {userId || "⛔ Niet ingelogd"}</p>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <br /><br />

      <button onClick={handleUpload} disabled={!file || !userId || uploading}>
        {uploading ? 'Bezig met uploaden...' : 'Upload'}
      </button>

      {url && (
        <div style={{ marginTop: 20 }}>
          <p>✅ Download link:</p>
          <a href={url} target="_blank" rel="noreferrer">{url}</a>
        </div>
      )}

      {error && (
        <p style={{ color: 'red' }}>❌ Fout: {error}</p>
      )}
    </div>
  );
}

export default UploadTestApp;
