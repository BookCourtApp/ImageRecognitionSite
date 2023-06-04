import {useSelector} from "react-redux";
import {List, ListItem, ListItemText} from "@mui/material";
const BookList = () => {

    const currentIndex = useSelector(state => state.recognition.currentIndex)
    const markups = useSelector(state => state.recognition.markups)

    return <div>
        {
            currentIndex === null ? <h3>Выберите книгу</h3>
                : <div>
                <h3 style={{margin:0}}>Возможные варианты: </h3>
                    <List>
                        {markups[currentIndex].possibleBooks.map((item,index) => {

                            const [title, author] = item.split('|')

                            return (
                                <ListItem style={{ margin:0, padding:0 }} key={index}>
                                    <ListItemText
                                        primary={author}
                                        secondary={title}

                                    />
                                </ListItem>
                            )
                        })}
                    </List>
                </div>
        }
    </div>
}

export default BookList