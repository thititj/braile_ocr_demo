import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './Braille.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faFileAlt, faVideoCamera, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFile, faTrash } from '@fortawesome/free-solid-svg-icons';

const ProgressBar = ({ progress }) => {
    return (
        <div style={{ width: '100%', backgroundColor: '#ddd' }}>
            <div style={{ height: '20px', width: `${progress}%`, backgroundColor: 'blue' }}></div>
        </div>
    );
};

const FilePreview = ({ file, onRemove, onRotate, rotationAngle }) => (
    <div className="file-item">
        <div className="file-container">
            <FontAwesomeIcon icon={faFile} />
            <span className="file-name">{file.name}</span>
        </div>
        <button onClick={() => onRemove(file)} className="delete-file-btn">
            <FontAwesomeIcon icon={faTrash} />
        </button>
    </div>
);


const Braille = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [overallProgress, setOverallProgress] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);
    const [sessionFolderName, setSessionFolderName] = useState('');
    const [filePreviews, setFilePreviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const hiddenFileInput = useRef(null);

    useEffect(() => {
        // Cleanup function to revoke object URLs only when unmounting
        return () => {
            if (!filePreviews.length) {
                filePreviews.forEach(file => URL.revokeObjectURL(file.preview));
            }
        };
    }, [filePreviews]);

    const resetSelection = () => {
        setSelectedFiles([]);
        setFilePreviews([]);

        // Revoke object URLs for all previews to prevent memory leaks
        filePreviews.forEach(file => URL.revokeObjectURL(file.preview));
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const allFiles = [...selectedFiles, ...files];
        setSelectedFiles(allFiles);
        setOverallProgress(0);
        setCompletedCount(0);

        const newFilePreviews = files.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            })
        );
        setFilePreviews([...filePreviews, ...newFilePreviews]);
    };

    const updateOverallProgress = (fileProgress) => {
        const totalProgress = fileProgress.reduce((acc, progress) => acc + progress, 0);
        const averageProgress = totalProgress / fileProgress.length;
        setOverallProgress(averageProgress);
    };

    const handleImageSubmit = async () => {
        if (!selectedFiles.length) {
            alert('Please select files first.');
            return;
        }

        setIsModalOpen(true);
        const fileProgress = new Array(selectedFiles.length).fill(0);
        const folderName = uuidv4();
        setSessionFolderName(folderName);

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const formData = new FormData();
            formData.append('document', file);
            formData.append('folderName', folderName);

            try {
                await axios.post('http://localhost:5000/api/braille/submit', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        fileProgress[i] = percentCompleted;
                        updateOverallProgress(fileProgress);
                    },
                });

                // Update progress and completed count after each file is uploaded
                fileProgress[i] = 100;
                updateOverallProgress(fileProgress);
                setCompletedCount((prevCount) => prevCount + 1);
            } catch (error) {
                console.error('Error submitting image:', error);
                // Even in case of error, mark as complete for user feedback
                fileProgress[i] = 100;
                updateOverallProgress(fileProgress);
                setCompletedCount((prevCount) => prevCount + 1);
            }
        }
    };

    const handleDownload = async () => {
        if (!sessionFolderName) {
          alert('No session available for download.');
          return;
        }
        try {
          const response = await axios.get(`http://localhost:5000/api/braille/download/${sessionFolderName}`, {
            responseType: 'blob',
          });
          const blob = new Blob([response.data], { type: 'application/zip' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `braille_results.zip`);
          document.body.appendChild(link);
          link.click();
          link.remove();
        } catch (error) {
          console.error('Error downloading the zip:', error);
        }
      };

    const removeFile = (fileToRemove) => {
        // Filter out the file to remove from selectedFiles
        const updatedFiles = selectedFiles.filter(file => file.name !== fileToRemove.name);
        setSelectedFiles(updatedFiles);

        // Optionally, you may want to perform additional cleanup, such as revoking the URL for the removed file
        URL.revokeObjectURL(fileToRemove.preview);
    };


    const Modal = ({ isOpen, onClose, children }) => {
        if (!isOpen) return null;

        return (
            <div className="modal">
                <div className="modal-content">
                    {children}
                </div>
            </div>
        );
    };

    const handleModalClose = () => {
        setIsModalOpen(false); // Close the modal
        setCompletedCount(0);   // Reset the completed count
    };

    const [dragging, setDragging] = useState(false);

    const handleDragEnter = (event) => {
        event.preventDefault();
        event.stopPropagation();

        setDragging(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        event.stopPropagation();

        setDragging(false);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();

        setDragging(true);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();

        setDragging(false);

        const files = Array.from(event.dataTransfer.files);
        const allFiles = [...selectedFiles, ...files];
        setSelectedFiles(allFiles);

        const newFilePreviews = files.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            })
        );
        setFilePreviews([...filePreviews, ...newFilePreviews]);
    };

    return (
        <div className="braille-page">
            <div className="header-container">
                <h1>Thai Braille</h1>
                <p>บริการแปลงข้อความภาษาไทยเป็นอักษรเบรลล์ ท่านสามารถคลิกที่ปุ่มอัปโหลดเพื่อทำการเลือกไฟล์ข้อความที่ต้องการแปลงเป็นอักษรเบรลล์ และกดยืนยันเพื่อเริ่มการประมวลผล</p>
                <div className="button-group">
                    <a href="YOUR_YOUTUBE_TUTORIAL_LINK" target="_blank" className="tutorial-btn-b">
                        <span className="upload-btn-icon">
                            <FontAwesomeIcon icon={faVideoCamera} />
                        </span>
                        วิดีโอสาธิตการใช้งาน</a>
                    <a href="YOUR_PDF_MANUAL_LINK" target="_blank" className="manual-btn-b">
                        <span className="upload-btn-icon">
                            <FontAwesomeIcon icon={faFileAlt} />
                        </span>
                        ไฟล์คู่มือการใช้งาน</a>
                </div>
            </div>

            <div
                className={`upload-section ${dragging ? 'dragging' : ''}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <button
                    className="upload-btn"
                    onClick={() => hiddenFileInput.current.click()}
                >
                    <span className="upload-btn-icon">
                        <FontAwesomeIcon icon={faUpload} />
                    </span>
                    <div>อัปโหลด</div>
                    <p>รองรับเฉพาะไฟล์นามสกุล .docx</p>
                </button>
                <input
                    ref={hiddenFileInput}
                    id="file-upload"
                    type="file"
                    accept=".docx, .txt"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </div>

            {selectedFiles.length > 0 && (
                <div className="button-container">
                    <button className="reset-btn" onClick={resetSelection}>ล้างทั้งหมด</button>
                    <button
                        className="submit-btn"
                        onClick={handleImageSubmit}
                        disabled={completedCount === selectedFiles.length}
                    >
                        ยืนยัน
                    </button>
                </div>
            )}

            <div className="file-list-container">
                {selectedFiles.map((file, index) => (
                    <FilePreview
                        key={index}
                        file={file}
                        onRemove={removeFile}
                    />
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                <FontAwesomeIcon icon={faTimes} className="modal-close-icon" onClick={handleModalClose} />
                <p> กรุณาอย่าออกจากหน้านี้ การประมวลผลอาจใช้เวลาหลายนาทีขึ้นอยู่กับจำนวนไฟล์ เมื่อระบบประมวลผลเสร็จจะมีปุ่มสำหรับดาวน์โหลดขึ้นที่ด้านล่าง</p>
                <ProgressBar progress={overallProgress} />
                <p>Finished {completedCount} of {selectedFiles.length} Files</p>
                {completedCount === selectedFiles.length && selectedFiles.length > 0 && (
                    <div className="button-row">
                        <button onClick={handleDownload} className="download-braille-btn" >Download Braille</button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Braille;
