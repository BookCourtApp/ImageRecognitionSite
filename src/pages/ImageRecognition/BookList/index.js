import {useDispatch, useSelector} from "react-redux";
import {List, ListItem, ListItemText, ListSubheader} from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import Search from "./Search";
import {setSelectedTextIndex} from "../../../store/recognitionSlice";
import {useState} from "react";

const BookList = () => {
    const dispatch = useDispatch();

    const [searchValue, setSearchValue] = useState('');

    const currentIndex = useSelector(state => state.recognition.currentIndex)
    const markups = useSelector(state => state.recognition.markups)


    return <div style={{marginTop: '10px'}}>
        {
            currentIndex === null ? <h3>Выберите книгу</h3>
                : <div>
                    <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
                    <List sx={{padding: 0}}>
                        <ListSubheader component="div" id="nested-list-subheader" sx={{paddingLeft: '10px'}}>
                            Возможные варианты
                        </ListSubheader>
                        {markups[currentIndex].possibleBooks.map((item, index) => {
                            const [author, title] = item.split('|');
                            if (title.toLowerCase().includes(searchValue.toLowerCase()) || author.toLowerCase().includes(searchValue.toLowerCase())) return (
                                <ListItem style={{
                                    margin: 0,
                                    padding: '0 10px'
                                }} key={index} onClick={() => dispatch(setSelectedTextIndex({
                                    bookIndex: currentIndex,
                                    selectedTextIndex: index
                                }))}>
                                    <ListItemText
                                        primary={author}
                                        secondary={title}

                                    />
                                    {
                                        (index === markups[currentIndex].selectedTextIndex) ? <CheckBoxIcon/> :
                                            <CheckBoxOutlineBlankIcon/>
                                    }

                                </ListItem>
                            );
                        })}
                    </List>

                </div>
        }
    </div>
}

export default BookList