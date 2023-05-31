import {Box, Container, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useState} from "react";

import ImageMarkup from "./pages/ImageMarkup";
import ImageRecognition from "./pages/ImageRecognition";

function App() {

    const [mode, setMode] = useState('markup')

    const handleModeChange = (e, mode) => {
        setMode(mode)
    }

    return <Container
        sx={{padding: 0, paddingTop: '15px',}}>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <ToggleButtonGroup color="primary" value={mode} exclusive sx={{marginBottom: '15px'}}
                               onChange={handleModeChange}>
                <ToggleButton value="markup" variant="contained">Разметка</ToggleButton>
                <ToggleButton value="recognition">Распознавание</ToggleButton>
            </ToggleButtonGroup>
        </Box>
        {
            (mode === 'markup')
                ? <ImageMarkup/>
                : <ImageRecognition/>
        }

    </Container>
}

export default App;
