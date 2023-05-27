import {useSelector} from "react-redux";

import ImageMarkup from "./ImageMarkup";
const Index = ({ image}) => {

    const markupType = useSelector(state => state.markups.markupType)

    return <div style={{position:'relative'}}>

   <ImageMarkup backgroundImage={image} markType={markupType}/>
    </div>
}

export default Index;