import {Box, Button} from "@mui/material";
import FilePicker from './FilePicker'


import MarkupButtons from "./MarkupButtons";
import Tools from "./Tools";
import SavedMarkups from "./SavedMarkups";

import Alert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {postMarkups, setImage} from "../../store/markupSlice";


import {useDispatch, useSelector} from "react-redux";
import * as PropTypes from "prop-types";
import Viewport from "./Viewport";


function ImageMarkup(props) {
    return null;
}

ImageMarkup.propTypes = {backgroundImage: PropTypes.any};
const Index = () => {
    const dispatch = useDispatch();

    const image = useSelector(state => state.markups.image)
    const uploadStatus = useSelector(state => state.markups.status)
    const onFileSelect = (file) => {
        dispatch(setImage(file));
    }
    const handleUpload = () => {
        dispatch(postMarkups())
    }

    return (
        <Box>
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

                    <div style={{position:'relative'}}>

                        <Viewport backgroundImage={image} />
                    </div>
                    <Box sx={{padding: '10px'}}>
                        <div style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
                            <Tools/>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                            <MarkupButtons/>
                        </div>
                        <div style={{marginTop: '20px'}}>
                            <SavedMarkups/>
                        </div>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Button variant="contained" size="large" startIcon={<FileUploadIcon/>}
                                onClick={handleUpload}>upload</Button>
                    </Box>


                </Box>
                : <FilePicker onFileSelect={onFileSelect}/>}
        </Box>
    )
}
export default Index;