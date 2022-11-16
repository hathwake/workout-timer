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

    // const [currentTime, setCurrentTime] = useState(Date.now());

    useEffect(() => {
        timer.setCurrentElapsedTime(timer.duration / 2);
    }, [timer]);

    useEffect(() => {
        const update = timer.onUpdate(() => {
            setElapsedTime(timer.currentElapsedTime);
            setDuration(timer.duration);
            setCurrentStep(timer.currentStep);
            setFinished(timer.finished);
            setPaused(timer.paused);
        });

        return () => {
            update.unsubscribe();
        };
    }, [timer]);

    const stepTime = currentStep ? elapsedTime - currentStep.begin : 0;
    const stepProgress = currentStep ? (stepTime) / currentStep.duration : 0;
    const totalProgress = elapsedTime / duration;

    const stackStyles: React.CSSProperties = {
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "100%",
        transform: "translate(-50%, -50%)"
    };

    return <>
        <span>Timer state: {finished ? "finished" : paused ? "paused" : "running"}</span>
        <div>current step: {currentStep?.name}</div>

        <div style={{ position: "relative", width: "100%", aspectRatio: "1" }}>
            <CircularProgressbar
                gradientPrefix="timer"
                innerGradient={["#AA6DA3", "#B118C8"]}
                outerGradient={["#6A5D7B", "#5D4A66"]}
                style={{ ...stackStyles }}
                innerProgress={stepProgress}
                outerProgress={totalProgress}
                padding={5}
                strokeWidth={25}
            />

            <div style={{ ...stackStyles, width: "fit-content", textAlign: "center" }}>
                <span style={{fontSize: "3em", fontFamily: "monospace"}}>{(stepTime / 1000).toFixed(0)}s</span>
                {/* <br/> */}
                {/* <span style={{fontSize: "2em", fontWeight: "bold"}}>{currentStep?.name}</span> */}
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
