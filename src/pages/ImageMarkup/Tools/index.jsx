import ToggleButton from "@mui/material/ToggleButton";
import RectSelectIcon from "../../../common/RectIcon";
import DotsSelectIcon from "../../../common/DotsIcon";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCords, setMarkupType } from "../../../store/markupSlice";
import {Box, IconButton, ToggleButtonGroup} from "@mui/material";
import DeselectIcon from "@mui/icons-material/Deselect";

const Index = () => {
    const dispatch = useDispatch();
    const markupType = useSelector((state) => state.markups.markupType);

    const handleMarkupChange = (value) => {
        if (markupType !== value) {
            dispatch(setMarkupType(value));
        }
    };

    const handleClearMarkup = () => {
        dispatch(setCurrentCords({}));
    };

    return (
        <Box sx={{ display: "flex" }}>

            <ToggleButtonGroup>
                <ToggleButton
                    value={0}
                    selected={markupType === 0}
                    onClick={() => handleMarkupChange(0)}
                >
                    <RectSelectIcon />
                </ToggleButton>
                <ToggleButton
                    value={1}
                    selected={markupType === 1}
                    onClick={() => handleMarkupChange(1)}

                >
                    <DotsSelectIcon />
                </ToggleButton>
            </ToggleButtonGroup>

            <Box sx={{ display: "flex", alignItems: "center" }}></Box>
            <IconButton aria-label="delete" size="large" onClick={handleClearMarkup}>
                <DeselectIcon />
            </IconButton>
        </Box>
    );
};

export default Index;
