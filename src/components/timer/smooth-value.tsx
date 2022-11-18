import { useCallback, useEffect, useRef, useState } from "react";


export const useSmoothValue = (value: number, smoothing: number): number => {
    const [currentValue, setCurrentValue] = useState(value);
    const currentAnimFrame = useRef<any | undefined>(undefined);
    const currentTime = useRef<number>(0);

    const [running, setRunning] = useState(false);

    useEffect(() => {
        if(!running && currentValue !== value) {
            setRunning(true);
        }
    }, [value, currentValue, running]);

    const smooth = useCallback(() => {
        const timeDelta = (Date.now() - currentTime.current) / 1000;

        const valueDiff = value - currentValue;

        const nextValue = currentValue + valueDiff * timeDelta / smoothing;
        
        if(Math.abs(value - nextValue) < 0.001) {
            setCurrentValue(value);
            setRunning(false);
        } else {
            setCurrentValue(nextValue);
        }

        currentAnimFrame.current = requestAnimationFrame(smooth);

        currentTime.current = Date.now();
    }, [currentValue, smoothing, value]);

    useEffect(() => {
        cancelAnimationFrame(currentAnimFrame.current);
        if(running) {
            currentTime.current = Date.now();

            currentAnimFrame.current = requestAnimationFrame(smooth);

            return () => {
                cancelAnimationFrame(currentAnimFrame.current);
            };
        }
    }, [smooth, running]);

    return currentValue;
};
