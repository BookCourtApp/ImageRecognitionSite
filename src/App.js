import {Box, Button, ButtonGroup, Container} from "@mui/material";
import {useState} from "react";

import ImageMarkup from "./ImageRecognition";

function App() {

    const [mode, setMode] = useState('markup')

    const handleModeChange = () => {

    }

    return <Container
        sx={{ padding: 0, paddingTop: '15px', }}>
        <Box sx={{display: 'flex', justifyContent:'center'}}>

            <ButtonGroup sx={{marginBottom:'15px'}}>
                <Button variant="contained">Разметка</Button>
                <Button>Распознавание</Button>
            </ButtonGroup>
        </Box>

        <ImageMarkup/>

    </Container>
}

export default App;
