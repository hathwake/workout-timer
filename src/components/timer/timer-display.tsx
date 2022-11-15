import { Button } from "antd";
import { useEffect, useMemo, useState } from "react";
import { Timer, TimerStep } from "../../data/timer";


export interface TimerDisplayProps {
    timer: Timer;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({timer}) => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [length, setLength] = useState(0);
    const [currentStep, setCurrentStep] = useState<TimerStep | undefined>(undefined);
    const [finished, setFinished] = useState<boolean>(false);
    const [paused, setPaused] = useState<boolean>(false);

    const [currentTime, setCurrentTime] = useState(Date.now());

    useEffect(() => {

        timer.tick(currentTime);

        setElapsedTime(timer.currentElapsedTime);
        setLength(timer.length);
        setCurrentStep(timer.currentStep);
        setFinished(timer.finished);
        setPaused(timer.paused);

    }, [currentTime, timer]);

    useEffect(() => {
        const intervalRef = setInterval(() => {
            setCurrentTime(Date.now());
        }, 500);

        return () => {
            clearInterval(intervalRef);
        };
    });

    return <>
        <h1>{elapsedTime / 1000}s of {length}s</h1>
        <span>Timer state: {finished ? "finished" : paused ? "paused" : "running"}</span>
        <div>current step: {currentStep?.name}</div>

        <Button onClick={() => timer.reset()}>Reset</Button>
    </>;
};
