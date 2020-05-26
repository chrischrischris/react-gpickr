import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import GradientPicker from '../js/GradientPicker';

const onColorChange = (color, pickr) => {
    console.log(color, pickr);
};

let initialStops = [
    ['rgb(181, 32, 32)', 0.3],
    ['rgba(64, 64, 191, 0.72)', 0.7],
    ['#47d147', 0.9],
];

const MyPicker = () => {
    const [angle, setAngle] = useState(180);
    const [css, setCss] = useState();
    const [mode, setMode] = useState();

    const onGradientChange = (gpickr) => {
        setCss(gpickr.getGradient());
    };

    return (
        <div>
            <div className="info">
                <div>
                    {/* <button onClick={changeStops}>Change Stops</button> */}
                    {`Angle: ${angle}`}
                    <div>
                        <button onClick={() => setAngle('to top right')}>Top Right</button>
                    </div>
                    <div>
                        <button onClick={() => setAngle('to top left')}>Top Left</button>
                    </div>
                </div>
                <div>
                    {/* <button onClick={changeStops}>Change Stops</button> */}
                    {`Mode: ${mode}`}
                    <div>
                        <button onClick={() => setMode('linear')}>Linear</button>
                    </div>
                    <div>
                        <button onClick={() => setMode('radial')}>Radial</button>
                    </div>
                </div>
                <div className="info-css">{css}</div>
            </div>
            <GradientPicker
                onColorChange={onColorChange}
                onChange={onGradientChange}
                stops={initialStops}
                angle={angle}
                setAngle={setAngle}
                mode={mode}
                setMode={setMode}
            />
        </div>
    );
};

ReactDOM.render(<MyPicker />, document.getElementById('rGpicker'));
