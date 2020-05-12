/* eslint-disable no-console */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import debounce from './utils/debounce';
import Gpickr from './gpickr';

const LINEAR_DIRECTION = {
    TO_TOP: 'to top',
    TO_RIGHT: 'to right',
    TO_BOTTOM: 'to bottom',
    TO_LEFT: 'to left',
    TO_TOP_RIGHT: 'to top right',
    TO_TOP_LEFT: 'to top left',
    TO_BOTTOM_RIGHT: 'to bottom right',
    TO_BOTTOM_LEFT: 'to bottom left',
};

const MODE = {
    CONIC: 'conic',
    LINEAR: 'linear',
    RADIAL: 'radial',
};

const GradientPicker = ({
    angle,
    cssString,
    debounceMS,
    getGpickrRef,
    mode,
    modes,
    onChange,
    pickrConfig,
    setAngle,
    setMode,
    stops,
}) => {
    const [gpickr, setGpickr] = useState();
    const [initialized, setInitialized] = useState(false);

    const gpickrRef = useRef(null);

    useEffect(() => {
        modes = modes ? { radial: false, linear: false, conic: false, ...modes } : {};
    }, []);

    useEffect(() => {
        if (gpickrRef) {
            setGpickr(
                new Gpickr({
                    el: '.gpickr',
                    angle,
                    mode,
                    stops,
                    ...modes,
                    pickr: {
                        ...pickrConfig,
                    },
                }).on('init', () => {
                    setInitialized(true);
                })
            );
        }
    }, [gpickrRef]);

    useEffect(() => {
        if (gpickr) {
            const onGpickrChange = (gpickrInstance) => {
                if (setAngle && gpickrInstance._angle !== angle) setAngle(gpickrInstance._angle);
                if (setMode && gpickrInstance._mode !== mode) {
                    setMode(gpickrInstance._mode);
                }

                if (onChange) onChange(gpickrInstance);
            };

            const gpickrChange =
                debounceMS !== undefined ? debounce(onGpickrChange, debounceMS) : onGpickrChange;

            gpickr.on('change', gpickrChange);
            return () => gpickr.off('change', gpickrChange);
        }
    }, [angle, gpickr, mode]);

    useEffect(() => {
        if (gpickr && getGpickrRef) getGpickrRef(gpickr);
    }, [gpickr]);

    useEffect(() => {
        if (gpickr && initialized && cssString && cssString !== gpickr.getGradient()) {
            gpickr.setGradient(cssString);
        }
    }, [gpickr, cssString, initialized]);

    useEffect(() => {
        if (gpickr && initialized && angle !== undefined && gpickr._angle !== angle) {
            gpickr.setLinearAngle(angle);
        }
    }, [gpickr, initialized, angle]);

    useEffect(() => {
        if (gpickr && initialized && mode !== undefined && gpickr._mode !== mode) {
            gpickr.setMode(mode);
        }
    }, [gpickr, initialized, mode]);

    return <div className="gpickr" ref={gpickrRef} />;
};

GradientPicker.propTypes = {
    angle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    cssString: PropTypes.string,
    debounceMS: PropTypes.number,
    getGpickrRef: PropTypes.func,
    onChange: PropTypes.func,
    mode: PropTypes.string,
    modes: PropTypes.shape({
        conic: PropTypes.bool,
        linear: PropTypes.bool,
        radial: PropTypes.bool,
    }),
    setAngle: PropTypes.func,
    setMode: PropTypes.func,
    stops: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))
    ),
    pickrConfig: PropTypes.shape({
        theme: PropTypes.string,
        swatches: PropTypes.arrayOf(PropTypes.string),
        lockOpacity: PropTypes.bool,
        palette: PropTypes.bool,
        preview: PropTypes.bool,
        opacity: PropTypes.bool,
        hue: PropTypes.bool,
        input: PropTypes.bool,
        hex: PropTypes.bool,
        rgba: PropTypes.bool,
        cmyk: PropTypes.bool,
        hsla: PropTypes.bool,
        hsva: PropTypes.bool,
        cancel: PropTypes.bool,
        clear: PropTypes.bool,
        save: PropTypes.bool,
    }),
};

GradientPicker.defaultProps = {
    pickr: {
        theme: 'nano',
    },
};

export { GradientPicker as default, LINEAR_DIRECTION, MODE };
