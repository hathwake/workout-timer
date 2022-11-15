import { Button } from "antd";
import { useEffect, useState } from "react";
import { Timer, TimerStep } from "../../data/timer";
import { CircularProgressbar } from "./circular-progressbar";
import {
    PlayCircleOutlined,
    PauseCircleOutlined,
    StepForwardOutlined,
    StepBackwardOutlined,
    FastBackwardOutlined,
    RollbackOutlined,
} from "@ant-design/icons";

export interface TimerDisplayProps {
    timer: Timer;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ timer }) => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentStep, setCurrentStep] = useState<TimerStep | undefined>(undefined);
    const [finished, setFinished] = useState<boolean>(false);
    const [paused, setPaused] = useState<boolean>(false);

    const [currentTime, setCurrentTime] = useState(Date.now());

    useEffect(() => {
        timer.setCurrentElapsedTime(timer.duration / 2);
    }, [timer]);

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

    let stepProgress = 0.0;
    if (currentStep) {
        stepProgress = (elapsedTime - currentStep.begin) / currentStep.duration;
    }

    const stackStyles: React.CSSProperties = {
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "100%",
        transform: "translate(-50%, -50%)"
    };

    return <>
        <h1>{(elapsedTime / 1000).toFixed(0)}s of {(duration / 1000).toFixed(0)}s</h1>
        <span>Timer state: {finished ? "finished" : paused ? "paused" : "running"}</span>
        <div>current step: {currentStep?.name}</div>

        {/* <div>
            <Button disabled={timer.finished} onClick={() => timer.togglePause()}>{timer.paused ? "Start" : "Pause"}</Button>
            <Button onClick={() => timer.goBack()}>Go back</Button>
            <Button onClick={() => timer.skipCurrentStep()}>Skip Step</Button>
            <Button onClick={() => timer.resetCurrentStep()}>Reset Step</Button>
            <Button onClick={() => timer.reset()}>Reset</Button>
        </div> */}

        <div style={{ position: "relative", width: "80vw", height: "80vw" }}>
            <CircularProgressbar style={{ ...stackStyles }} progress={elapsedTime / duration} strokeWidth={25} />
            <CircularProgressbar style={{ ...stackStyles, width: "75%" }} progress={stepProgress} strokeWidth={25} />

            <div style={{...stackStyles, width: "fit-content", textAlign: "center"}}>
                {(elapsedTime / 1000).toFixed(0)}s of {(duration / 1000).toFixed(0)}
            </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
            <Button type="text" onClick={() => timer.resetCurrentStep()}>
                <FastBackwardOutlined />
            </Button>

            <Button type="text" onClick={() => timer.goBack()}>
                <StepBackwardOutlined />
            </Button>

            <Button type="text" disabled={timer.finished} onClick={() => timer.togglePause()}>
                {timer.paused ?
                    <PlayCircleOutlined />
                    :
                    <PauseCircleOutlined />
                }
            </Button>

            <Button type="text" onClick={() => timer.skipCurrentStep()}>
                <StepForwardOutlined />
            </Button>

            <Button type="text" onClick={() => timer.reset()}>
                <RollbackOutlined />
            </Button>
        </div>
    </>;
};
