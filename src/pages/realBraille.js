import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt, faVideoCamera } from '@fortawesome/free-solid-svg-icons'; // For PDF/document
import axios from 'axios'; // Import Axios for making HTTP requests
import { v4 as uuidv4 } from 'uuid';
import './Braille.css';

const Braille = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [processing, setProcessing] = useState(false);

  const handleFileChange = (event) => {
    const newFilesArray = Array.from(event.target.files);
    const updatedFiles = [...selectedFiles, ...newFilesArray];
    setSelectedFiles(updatedFiles);
  };

  const resetSelection = () => {
    setSelectedFiles([]);
  };

  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
  };

  const handleSubmit = async () => {
    setProcessing(true);

    try {
      const folderName = uuidv4(); // Generate a unique folder name
      const formData = new FormData();
      formData.append('folderName', folderName);
      formData.append('pageNumber', '1'); // Assuming a single page for now

      selectedFiles.forEach((file) => {
        formData.append('document', file);
      });

      // Replace the following URL with the actual endpoint of your Flask server
      const response = await axios.post('http://localhost:5000/api/braille/submit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Handle the response as needed
      console.log('Braille conversion response:', response.data);

      // Reset the selected files after successful submission
      resetSelection();
    } catch (error) {
      console.error('Error during Braille conversion:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="braille-page">
      <div className="header-container">
        <h1>Thai Braille</h1>
        <p>บริการแปลงข้อความภาษาไทยเป็นอักษรเบรลล์ ท่านสามารถคลิกที่ปุ่มอัปโหลดเพื่อทำการเลือกไฟล์ข้อความที่ต้องการแปลงเป็นอักษรเบรลล์ และกดยืนยันเพื่อเริ่มการประมวลผล</p>
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
        <button className="upload-btn" onClick={() => document.getElementById('file-upload').click()}>
        <span className="upload-btn-icon">
            <FontAwesomeIcon icon={faUpload} />
          </span>
          <div>อัปโหลด</div>
          <p>รองรับเฉพาะไฟล์นามสกุล .docx</p>
        </button>
        
        <input id="file-upload" type="file" accept=".docx, .txt" multiple onChange={handleFileChange} style={{ display: 'none' }} />
      </div>
      {selectedFiles.length > 0 && (
        <div className="button-container">
          <button className="reset-btn" onClick={resetSelection}>ล้างทั้งหมด</button>
          <button className="submit-btn" onClick={handleSubmit}>ยืนยัน</button>
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
