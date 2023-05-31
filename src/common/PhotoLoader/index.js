import React, { useState, useRef } from 'react';
import {Button, IconButton} from '@mui/material';

import FileUploadIcon from '@mui/icons-material/FileUpload';
function PhotoUploader({ onFileSelect }) {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        onFileSelect(file);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div>
            <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
            <label>
                <Button variant="contained"  startIcon={< FileUploadIcon/>} onClick={handleButtonClick}>
                    Загрузить фото
                </Button>
            </label>
            {selectedFile && <p>Выбран файл: {selectedFile.name}</p>}
        </div>
    );
}

export default PhotoUploader;
