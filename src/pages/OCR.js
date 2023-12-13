import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './OCR.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faRotateRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt, faVideoCamera } from '@fortawesome/free-solid-svg-icons'; // For PDF/document

const ProgressBar = ({ progress }) => {
    return (
        <div style={{ width: '100%', backgroundColor: '#ddd' }}>
            <div style={{ height: '20px', width: `${progress}%`, backgroundColor: 'blue' }}></div>
        </div>
    );
};

const OCR = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [overallProgress, setOverallProgress] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);
    const [sessionFolderName, setSessionFolderName] = useState('');
    const [imagePreviews, setImagePreviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const hiddenFileInput = useRef(null);
    const [rotationAngles, setRotationAngles] = useState({});

    useEffect(() => {
        // Cleanup function to revoke object URLs only when unmounting
        return () => {
            if (!imagePreviews.length) {
                imagePreviews.forEach(file => URL.revokeObjectURL(file.preview));
            }
        };
    }, [imagePreviews]);

    const resetSelection = () => {
        setSelectedFiles([]);
        setImagePreviews([]);

        // Revoke object URLs for all previews to prevent memory leaks
        imagePreviews.forEach(file => URL.revokeObjectURL(file.preview));
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const newFiles = Array.from(event.target.files);
        const allFiles = [...selectedFiles, ...newFiles];
        setSelectedFiles(files);
        setSelectedFiles([...event.target.files]);
        setSelectedFiles(allFiles);
        setOverallProgress(0);
        setCompletedCount(0);

        const newImagePreviews = newFiles.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file)
            })
        );
        setImagePreviews([...imagePreviews, ...newImagePreviews]);
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
            formData.append('image', file);
            formData.append('folderName', folderName);

            try {
                await axios.post('http://localhost:5000/api/ocr/submit', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        fileProgress[i] = percentCompleted;
                        updateOverallProgress(fileProgress);
                    }
                });

                // Update progress and completed count after each file is uploaded
                fileProgress[i] = 100;
                updateOverallProgress(fileProgress);
                setCompletedCount(prevCount => prevCount + 1);
            } catch (error) {
                console.error('Error submitting image:', error);
                // Even in case of error, mark as complete for user feedback
                fileProgress[i] = 100;
                updateOverallProgress(fileProgress);
                setCompletedCount(prevCount => prevCount + 1);
            }
        }
    };

    const handleDownload = async () => {
        if (!sessionFolderName) {
            alert('No session available for download.');
            return;
        }
        try {
            const response = await axios.get(`http://localhost:5000/api/ocr/download/${sessionFolderName}`, {
                responseType: 'blob', // Important for handling the binary data of the zip file
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${sessionFolderName}_ocr_results.zip`); // Name the download file
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading the zip:', error);
        }
    };

    const removeImage = (fileToRemove) => {
        // Filter out the file to remove from selectedFiles
        const updatedFiles = selectedFiles.filter(file => file.name !== fileToRemove.name);
        setSelectedFiles(updatedFiles);

        // Revoke the URL for the removed file
        URL.revokeObjectURL(fileToRemove.preview);

        // Update imagePreviews to exclude the removed file
        const updatedPreviews = imagePreviews.filter(preview => preview.name !== fileToRemove.name);
        setImagePreviews(updatedPreviews);
    };

    const rotateImage = (fileName) => {
        setRotationAngles(prevAngles => ({
            ...prevAngles,
            [fileName]: (prevAngles[fileName] || 0) + 90 // Rotate by 90 degrees
        }));
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

    const [draggedImgIndex, setDraggedImgIndex] = useState(null);
    const [overImgIndex, setOverImgIndex] = useState(null);

    const onDragStart = (index) => {
        setDraggedImgIndex(index);
    };

    const onDragEnd = () => {
        setDraggedImgIndex(null);
        setOverImgIndex(null); // Reset on drag end
    };

    const onDragOver = (index) => {
        if (draggedImgIndex === null) return;
        setOverImgIndex(index);

        // Reorder the image previews
        let newImagePreviews = [...imagePreviews];
        const draggedImg = newImagePreviews[draggedImgIndex];
        newImagePreviews.splice(draggedImgIndex, 1); // Remove the dragged image from its original position
        newImagePreviews.splice(index, 0, draggedImg); // Insert the dragged image at the new position

        setImagePreviews(newImagePreviews);
        setDraggedImgIndex(index); // Update the index of the dragged image
    };

    const handleClickUpload = event => {
        hiddenFileInput.current.click();
    };

    return (

        <div className="ocr-app">
            <div className="header-container">
                <h1>Thai OCR</h1>
                <p>Service for converting image to docx files with a simple click.</p>
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
            <button className="upload-btn" onClick={handleClickUpload}>
    <span className="upload-btn-icon">
        <FontAwesomeIcon icon={faUpload} />
    </span>
    <div>Upload</div>
    <p>Supports .jpg, .png, .jpeg</p>
</button>
            <input type="file" accept="image/*" onChange={handleFileChange} ref={hiddenFileInput} multiple style={{ display: 'none' }} />


            {selectedFiles.length > 0 && (
                <div className="button-container">
                    <button className="reset-btn" onClick={resetSelection}>Reset Selection</button>
                    <button className="submit-btn" onClick={handleImageSubmit}>Submit</button>
                </div>
            )}
            <div className="image-preview-container">
                {imagePreviews.map((file, index) => (
                    <div
                        key={file.name}
                        draggable
                        onDragStart={() => onDragStart(index)}
                        onDragEnd={onDragEnd}
                        onDragOver={() => onDragOver(index)}
                        className={`image-card ${draggedImgIndex === index ? 'dragging' : ''} ${overImgIndex === index ? 'over' : ''}`}
                    >
                        <div className="button-containers">
                            <button className="rotate-btn" onClick={() => rotateImage(file.name)}>
                                <FontAwesomeIcon icon={faRotateRight} />
                            </button>
                            <button className="remove-btn" onClick={() => removeImage(file)}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>

                        </div>
                        <div
                            className="image-container"
                            style={{ transform: `rotate(${rotationAngles[file.name] || 0}deg)` }}
                        >
                            <img src={file.preview} alt={`Preview ${index}`} />
                        </div>
                        <div className="page-number">Page {index + 1}</div>
                    </div>
                ))}
            </div>




            <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                <FontAwesomeIcon icon={faTimes} className="modal-close-icon" onClick={handleModalClose} />
                <p> กรุณาอย่าออกจากหน้านี้ การประมวลผลอาจใช้เวลาหลายนาทีขึ้นอยู่กับจำนวนรูปภาพ เมื่อระบบประมวลผลเสร็จจะมีปุ่มสำหรับดาวน์โหลดขึ้นที่ด้านล่าง</p>
                <ProgressBar progress={overallProgress} />
                <p>Finished {completedCount} of {selectedFiles.length} Images</p>
                {completedCount === selectedFiles.length && selectedFiles.length > 0 && (
                    <div className="button-row">
                        <button onClick={handleDownload} className="download-results-btn">Download Results</button>
                        <button className="download-braille-btn" >Download Braille</button>
                        </div>
                )}
            </Modal>
        </div>
    );
};

export default OCR;
