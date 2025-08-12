import './App.css';
import { useState, useRef, useEffect } from 'react';
import { uploadFile } from './services/api';

function App() {
  const fileInputRef = useRef();
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
        setShowResult(true);
      }
    };
    getImage();
  }, [file]);

  return (
    <div className='container'>
      <div className='wrapper'>
        <h1>File Sharing</h1>
        <img src="/file-share.jpg" alt="File Sharing" className="hero-image" />
        <p>
          Welcome to the File Sharing App! Easily upload your files and get a quick downloadable link instantly. Whether you want to share documents, images, or any file type, this app helps you convert and generate a shareable link in just a few clicks — no complicated steps required. Just select your file, hit upload, and share the link with anyone you want!
        </p>

        {/* Show Upload Button only before file upload */}
        {!showResult && (
          <button className='button' onClick={onUploadClick}>Upload</button>
        )}

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => {
            setShowResult(false);
            setFile(e.target.files[0]);
          }}
        />

        {/* Show link and share button after upload */}
        {showResult && result && (
          <>
            <div className='result'>
              <h2>File Uploaded Successfully!</h2>
              <p>
                Shareable Link:{" "}
                <a href={result} target="_blank" rel="noopener noreferrer">
                  {result}
                </a>
              </p>
            </div>

            <button
              className="share-button"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'File Share Link',
                    text: 'Here’s the file link:',
                    url: result
                  }).catch(err => console.log("Share cancelled", err));
                } else {
                  navigator.clipboard.writeText(result)
                    .then(() => alert("Link copied to clipboard!"))
                    .catch(() => alert("Failed to copy link"));
                }
              }}
            >
              Share Link
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
