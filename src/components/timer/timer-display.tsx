import { Button } from "antd";
import { useEffect, useMemo, useState } from "react";
import { Timer, TimerStep } from "../../data/timer";


export interface TimerDisplayProps {
    timer: Timer;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({timer}) => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentStep, setCurrentStep] = useState<TimerStep | undefined>(undefined);
    const [finished, setFinished] = useState<boolean>(false);
    const [paused, setPaused] = useState<boolean>(false);

    const [currentTime, setCurrentTime] = useState(Date.now());

    useEffect(() => {

        timer.tick(currentTime);

        setElapsedTime(timer.currentElapsedTime);
        setDuration(timer.duration);
        setCurrentStep(timer.currentStep);
        setFinished(timer.finished);
        setPaused(timer.paused);

    }, [currentTime, timer]);

    useEffect(() => {
        let currentAnimationFrame: any = undefined;

        const func = () => {
            setCurrentTime(Date.now());

            currentAnimationFrame = requestAnimationFrame(() => func());
        };

        currentAnimationFrame = requestAnimationFrame(() => func());

        return () => {
            cancelAnimationFrame(currentAnimationFrame);
        };
    });

    return <>
        <h1>{(elapsedTime / 1000).toFixed(0)}s of {(duration / 1000).toFixed(0)}s</h1>
        <span>Timer state: {finished ? "finished" : paused ? "paused" : "running"}</span>
        <div>current step: {currentStep?.name}</div>

        <Button disabled={timer.finished} onClick={() => timer.togglePause()}>{timer.paused ? "Start" : "Pause"}</Button>
        <Button onClick={() => timer.goBack()}>Go back</Button>
        <Button onClick={() => timer.skipCurrentStep()}>Skip Step</Button>
        <Button onClick={() => timer.resetCurrentStep()}>Reset Step</Button>
        <Button onClick={() => timer.reset()}>Reset</Button>
    </>;
};
