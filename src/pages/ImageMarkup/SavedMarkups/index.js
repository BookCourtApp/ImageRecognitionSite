import {useSelector} from "react-redux";

import {useDispatch} from "react-redux";

import {deleteMarkup} from "../../../store/markupSlice";
import ConfirmationDialog from "../../../common/ConfirmationDialog";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions } from '@mui/material';
import {useState} from "react";


const Index = () => {
    const dispatch = useDispatch();

    const savedMarkups = useSelector(state => state.markups.savedMarkups)

    const handleDelete = (index) => {
        dispatch(deleteMarkup(index))
    }

    const [dialogOpen, setDialogOpen] = useState(false);

    return (
       <>
           {
               savedMarkups.map((item, index) => (
                   <>
                       <ConfirmationDialog
                           title="Удаление"
                           content="Вы действительно хотите разметку?"
                           acceptText="Удалить"
                           cancelText="Отмена"
                           open={dialogOpen}
                           setOpen={setDialogOpen}
                           onConfirmAction={(index) => handleDelete(index)}
                       />

                   <Card sx={{ maxWidth: 345 }}>
                       <CardContent>
                           <Typography gutterBottom variant="h5" component="div">
                               Книга {index+1}
                           </Typography>
                           <Typography variant="body2" color="text.secondary">
                               {item.texts.map(item => (<div>{item.text}</div>))}
                           </Typography>
                       </CardContent>

                       <CardActions>
                           <Button size="small" color="error" onClick={() => setDialogOpen(true)}>
                               Удалить
                           </Button>
                       </CardActions>
                   </Card>
                       </>
               ))
           }
       </>
    );
}

export default Index