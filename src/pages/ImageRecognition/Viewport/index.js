import React, {useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {setCurrentIndex} from "../../../store/recognitionSlice";

const Viewport = ({backgroundImage, markups}) => {
    const dispatch = useDispatch();

    const canvasRef = useRef(null);
    const overlayRef = useRef(null);

    const handleCanvasClick = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = Math.round((e.clientX - rect.left) * (canvas.width / canvas.clientWidth));
        const y = Math.round((e.clientY - rect.top) * (canvas.height / canvas.clientHeight));

        const index =  findQuadrilateralIndex(markups, x,y);
        dispatch(setCurrentIndex(index))
    }

    useEffect(() => {
        const overlayCanvas = overlayRef.current;
        const overlayContext = overlayCanvas.getContext('2d');

        overlayContext.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

        markups.forEach(item => {
            drawRect(overlayContext,item)
        })

    }, [markups]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const overlay = overlayRef.current;
        const context = canvas.getContext('2d');
        const bg = new Image();
        bg.src = backgroundImage;

        bg.onload = () => {
            canvas.width = bg.width;
            canvas.height = bg.height;
            overlay.width = bg.width;
            overlay.height = bg.height;

            context.clearRect(0, 0, canvas.width, canvas.height);

            const aspectRatio = bg.width / bg.height;
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            let scaledWidth, scaledHeight, offsetX, offsetY;

            if (aspectRatio > 1) {
                scaledWidth = canvasWidth;
                scaledHeight = canvasWidth / aspectRatio;
                offsetY = (canvasHeight - scaledHeight) / 2;
                context.drawImage(bg, 0, offsetY, scaledWidth, scaledHeight);
            } else {
                scaledHeight = canvasHeight;
                scaledWidth = canvasHeight * aspectRatio;
                offsetX = (canvasWidth - scaledWidth) / 2;
                context.drawImage(bg, offsetX, 0, scaledWidth, scaledHeight);
            }
        };
    }, [backgroundImage]);

    return <>
        <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}

            style={{width: '100%', height: '100%'}}
        />
        <canvas
            ref={overlayRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                pointerEvents: 'none'
            }}
        />
    </>
}

export default Viewport;

function drawRect(context, coordinates, color = 'rgba(128, 128, 128, 0.5)') {
    const {x1,y1,x2,y2,x3,y3,x4,y4} = coordinates;
    context.beginPath();
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x3, y3);
    context.lineTo(x4, y4);
    context.closePath();
    const randomColor = `rgba(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, 0.3)`; 
    context.fillStyle = randomColor;
    context.fill();
}

function findQuadrilateralIndex(coordinates, x, y) {
    for (let i = 0; i < coordinates.length; i++) {
        const { x1, y1, x2, y2, x3, y3, x4, y4 } = coordinates[i];
        const isInQuadrilateral = isPointInQuadrilateral(x1, y1, x2, y2, x3, y3, x4, y4, x, y);
        if (isInQuadrilateral) {
            return i;
        }
    }
    return null;
}

function isPointInQuadrilateral(x1, y1, x2, y2, x3, y3, x4, y4, x, y) {
    const d1 = getSide(x, y, x1, y1, x2, y2);
    const d2 = getSide(x, y, x2, y2, x3, y3);
    const d3 = getSide(x, y, x3, y3, x4, y4);
    const d4 = getSide(x, y, x4, y4, x1, y1);

    const hasPositiveSign = (d1 > 0 && d2 > 0 && d3 > 0 && d4 > 0);
    const hasNegativeSign = (d1 < 0 && d2 < 0 && d3 < 0 && d4 < 0);

    return hasPositiveSign || hasNegativeSign;
}

function getSide(x, y, x1, y1, x2, y2) {
    return (x - x1) * (y2 - y1) - (y - y1) * (x2 - x1);
}
