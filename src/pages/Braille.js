import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt, faVideoCamera } from '@fortawesome/free-solid-svg-icons'; // For PDF/document
import './Braille.css';

const Braille = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    // Create an array from the newly selected files
    const newFilesArray = Array.from(event.target.files);
    
    // Combine the existing files with the new files
    const updatedFiles = [...selectedFiles, ...newFilesArray];
    
    setSelectedFiles(updatedFiles);
};

  const resetSelection = () => {
    setSelectedFiles([]);
    // Additional reset logic if needed
  };

  const handleSubmit = () => {
    // Logic to handle submission
  };


  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
  };

  return (
    <div className="braille-page">
      <div className="header-container">
                <h1>Thai Braille</h1>
                <p>Service for converting text or document files to braille</p>
                <div className="button-group">
                    <a href="YOUR_YOUTUBE_TUTORIAL_LINK" target="_blank" className="tutorial-btn">
                    <span className="upload-btn-icon">
                    <FontAwesomeIcon icon={faVideoCamera} /> 
                </span>
                    วิดีโอสาธิตการใช้งาน</a>
                    <a href="YOUR_PDF_MANUAL_LINK" target="_blank" className="manual-btn">
                    <span className="upload-btn-icon">
                    <FontAwesomeIcon icon={faFileAlt} /> 
                </span>
                    ไฟล์คู่มือการใช้งาน</a>
                </div>
            </div>

      <div className="upload-section">
        <button onClick={() => document.getElementById('file-upload').click()}>
          <FontAwesomeIcon icon={faUpload} /> Upload Files
        </button>
        <input id="file-upload" type="file" multiple onChange={handleFileChange} style={{ display: 'none' }} />
      </div>
      {selectedFiles.length > 0 && (
                <div className="button-container">
                    <button className="reset-btn" onClick={resetSelection}>Reset</button>
                    <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                </div>
            )}

      <div className="file-list-container">
        {selectedFiles.map((file, index) => (
          <div className="file-item" key={index}>
            <FontAwesomeIcon icon={faFile} />
            <span className="file-name">{file.name}</span>
            <button onClick={() => removeFile(index)} className="delete-file-btn">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>

      {/* Additional functionality for Braille conversion goes here */}
    </div>
  );
};

export default Braille;
