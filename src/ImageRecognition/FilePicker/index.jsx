import {Box, IconButton} from "@mui/material";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Index = ({onFileSelect}) => {

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                onFileSelect(img.src)
            };
            img.src = event.target.result;
        };

        reader.readAsDataURL(file);
    };

    return (
        <Box sx={{width: '100%', height: '200px'}}>
            <IconButton
                component="label"
                htmlFor="fileInput"
                size="large"
                sx={{
                    borderRadius: 0,
                    border: '1px dashed grey',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CloudUploadIcon sx={{fontSize: 50}}/>
            </IconButton>
            <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{display: 'none'}}
            />
        </Box>
    );
};

export default Index;
