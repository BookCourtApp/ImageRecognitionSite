import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentCords} from '../../../store/markupSlice';

const CanvasComponent = ({backgroundImage, markType}) => {
    const dispatch = useDispatch();

    const currentCords = useSelector((state) => state.markups.currentCords);

    const canvasRef = useRef(null);
    const overlayRef = useRef(null);

    const handleCanvasClick = (event) => {

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = Math.round((event.clientX - rect.left) * (canvas.width / canvas.clientWidth));
        const y = Math.round((event.clientY - rect.top) * (canvas.height / canvas.clientHeight));
        console.log(x, y)
        if (Object.keys(currentCords).length >= 8) {
            return;
        }

        if (markType === 1) {

            const newCords = {
                ...currentCords,
                [`x${Object.keys(currentCords).length / 2 + 1}`]: x,
                [`y${Object.keys(currentCords).length / 2 + 1}`]: y
            };
            if (Object.keys(newCords).length === 8) {
                dispatch(setCurrentCords(rearrangeCoordinates(newCords)))
            } else {
                dispatch(setCurrentCords(newCords));
            }
        }

        if (markType === 0) {

            if (Object.keys(currentCords).length === 2) {
                const newCords = {
                    ...currentCords,
                    x2: x,
                    y2: currentCords.y1,
                    x3: x,
                    y3: y,
                    x4: currentCords.x1,
                    y4: y
                };
                dispatch(setCurrentCords(newCords));
                return
            }

            dispatch(setCurrentCords({x1: x, y1: y}));

        }
    };



    useEffect(() => {
        const overlayCanvas = overlayRef.current;
        const overlayContext = overlayCanvas.getContext('2d');

        overlayContext.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

        for (let i = 1; i <= Object.keys(currentCords).length / 2; i++) {
            const x = currentCords[`x${i}`];
            const y = currentCords[`y${i}`];

            overlayContext.beginPath();
            overlayContext.arc(x, y, overlayCanvas.width / 200, 0, 2 * Math.PI);
            overlayContext.fillStyle = 'rgba(0,0,0,1)';
            overlayContext.fill();
        }

        if (Object.keys(currentCords).length === 8) {
            drawRect(overlayContext,currentCords)
        }
    }, [currentCords]);

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


    function drawRect(context, coordinates) {
        context.beginPath();
        context.moveTo(currentCords.x1, currentCords.y1);
        context.lineTo(currentCords.x2, currentCords.y2);
        context.lineTo(currentCords.x3, currentCords.y3);
        context.lineTo(currentCords.x4, currentCords.y4);
        context.closePath();
        context.fillStyle = 'rgba(128, 128, 128, 0.5)';
        context.fill();
    }

    function rearrangeCoordinates(coordinates) {
        const { x1, y1, x2, y2, x3, y3, x4, y4 } = coordinates;

        // Вычислить центральные точки
        const centerPointX = (x1 + x2 + x3 + x4) / 4;
        const centerPointY = (y1 + y2 + y3 + y4) / 4;

        // Вычислить углы точек относительно центральной точки
        const angles = [
            { x: x1 - centerPointX, y: y1 - centerPointY },
            { x: x2 - centerPointX, y: y2 - centerPointY },
            { x: x3 - centerPointX, y: y3 - centerPointY },
            { x: x4 - centerPointX, y: y4 - centerPointY },
        ];

        // Отсортировать углы по полярному углу (против часовой стрелки)
        angles.sort((a, b) => Math.atan2(a.y, a.x) - Math.atan2(b.y, b.x));

        // Восстановить координаты с новым порядком точек
        return {
            x1: centerPointX + angles[0].x,
            y1: centerPointY + angles[0].y,
            x2: centerPointX + angles[1].x,
            y2: centerPointY + angles[1].y,
            x3: centerPointX + angles[2].x,
            y3: centerPointY + angles[2].y,
            x4: centerPointX + angles[3].x,
            y4: centerPointY + angles[3].y,
        };
    }



    return (
        <>
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
    );
};

export default CanvasComponent;