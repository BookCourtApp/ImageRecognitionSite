import React from "react";

import Viewport from './Viewport'
import FilePicker from "../ImageMarkup/FilePicker";
import BookList from "./BookList"
import {getMarkups, setImage} from "../../store/recognitionSlice";
import {useDispatch, useSelector} from "react-redux";


import {Box, Button, Container} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import VisibilityIcon from '@mui/icons-material/Visibility';

const Index = () => {
    const dispatch = useDispatch();

    const image = useSelector(state => state.recognition.image);
    const uploadStatus = useSelector(state => state.recognition.status);
    const markups = useSelector(state => state.recognition.markups);
    const currentIndex = useSelector(state => state.recognition.currentIndex);
    const onFileSelect = (file) => {
        dispatch(setImage(file));
    }

    const handleRecognize = () => {
        dispatch(getMarkups());
    }

    return <Container>
        {
            (uploadStatus === "error")
            && <Alert severity="error">Ошибка</Alert>
        }
        <Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={uploadStatus === "pending"}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>

        {image
            ? <Box>

                <div style={{position: 'relative'}}>
                    <Viewport backgroundImage={image} markups={markups}/>
                </div>
                {markups.length > 0 && (
                    <Box sx={{
                        height:'100%',
                        overflow: 'scroll'
                    }}>
                        <BookList/>
                    </Box>)}

            </Box>
            : <Box>
                <FilePicker onFileSelect={onFileSelect}/>

            </Box>}
        <Box sx={{display: 'flex', justifyContent: 'center', paddingTop: '10px'}}>
            {!markups.length && <Button variant="contained" startIcon={<VisibilityIcon/>} disabled={!image}
                                        onClick={handleRecognize}>Распознать</Button>}
        </Box>
    </Container>
}

export default Index