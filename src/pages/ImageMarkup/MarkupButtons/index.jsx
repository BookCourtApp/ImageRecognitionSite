import React from 'react';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentBook, setCurrentTexts,saveCurrentMarkup} from "../../../store/markupSlice";
import {Box} from "@mui/material";

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import BookIcon from '@mui/icons-material/Book';
import FontDownloadIcon from '@mui/icons-material/FontDownload';

const MarkingPanel = () => {
    const dispatch = useDispatch();

    const currentCords = useSelector(state => state.markups.currentCords);
    const cordsSet = Object.keys(currentCords).length === 8;

    const currentBook = useSelector((state) => state.markups.currentBook);
    const bookSet = Object.keys(currentBook).length === 8;

    const currentTexts = useSelector(state => state.markups.currentTexts)
    const handleBook= () => {
        dispatch(setCurrentBook())
    };
    const handleText = () => {
        //запрашиваем название книги и подтверждаем, внося книгу в currentMarkup
        let text = prompt('Введите название книги: ');
        dispatch(setCurrentTexts(text))
    };

    const canApply = (bookSet && currentTexts.length >= 1)
    const handleApply = () => {
        dispatch(saveCurrentMarkup())
    };

    return (

        <Box sx={{display: 'flex', gap: '10px'}}>
            <Button
                variant='contained'
                onClick={handleBook}
                disabled={!cordsSet || bookSet }
                size={"small"}
            >
                <BookIcon/>
                Mark a book
            </Button>

            <Button
                variant='contained'
                onClick={handleText}
                disabled={!(bookSet && cordsSet)}
                size={"small"}
            >
                <FontDownloadIcon sx={{marginRight:'3px'}}/>
                Mark text
            </Button>

            <Fab size="small" color="primary" disabled = {!canApply} onClick={handleApply}>
                <AddIcon/>
            </Fab>
        </Box>

    );
};

export default MarkingPanel;