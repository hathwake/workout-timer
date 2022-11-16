import { Button, List } from "antd";
import { useEffect, useState } from "react";
import { Timer, TimerStep } from "../../data/timer";
import { CircularProgressbar } from "./circular-progressbar-v1";
import {
    PlayCircleOutlined,
    PauseCircleOutlined,
    StepForwardOutlined,
    StepBackwardOutlined,
    FastBackwardOutlined,
    RollbackOutlined,
} from "@ant-design/icons";
import { reactIf } from "../../directives/if";
import { TimerActionButton } from "./timer-action-button";

export interface TimerDisplayProps {
    timer: Timer;
}

const round = (val: number, digits: number) => {
    const power = Math.pow(10, digits);

    return Math.round(val * power) / power;
};

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ timer }) => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentStep, setCurrentStep] = useState<TimerStep | undefined>(undefined);
    const [numberOfSteps, setNumberOfSteps] = useState<number>(0);
    const [numberOfCurrentStep, setNumberOfCurrentStep] = useState<number>(0);
    const [finished, setFinished] = useState<boolean>(false);
    const [paused, setPaused] = useState<boolean>(true);

    useEffect(() => {
        timer.setCurrentElapsedTime(timer.duration / 2);
    }, [timer]);

    useEffect(() => {
        const update = timer.onUpdate(() => {
            setElapsedTime(timer.currentElapsedTime);
            setDuration(timer.duration);
            setCurrentStep(timer.currentStep);
            setNumberOfSteps(timer.getNumberOfSteps());
            setNumberOfCurrentStep(timer.getNumberOfCurrentStep());
            setFinished(timer.finished);
            setPaused(timer.paused);
        });

        return () => {
            update.unsubscribe();
        };
    }, [timer]);

    const roundedDuration = Math.round(duration / 1000);
    const roundedTime = Math.round(elapsedTime / 1000);
    const roundedStepDuration = currentStep ? Math.round(currentStep.duration / 1000) : 0;
    const roundedStepTime = currentStep ? Math.round(roundedTime - (currentStep.begin / 1000)) : 0;
    
    const stepProgress = roundedStepDuration > 0 ? (roundedStepTime) / roundedStepDuration : 0;
    const totalProgress = roundedDuration ? roundedTime / roundedDuration : 0;

    const stackStyles: React.CSSProperties = {
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "100%",
        transform: "translate(-50%, -50%)"
    };

    let innerGradientColors: [string, string] = ["#AA6DA3", "#B118C8"];
    if (currentStep?.isPause) {
        innerGradientColors = ["#502274", "#2F242C"];
    }

    return <>
        <div style={{ position: "relative", width: "100%", aspectRatio: "1" }}>
            <CircularProgressbar
                gradientPrefix="timer"
                innerGradient={innerGradientColors}
                outerGradient={["#6A5D7B", "#5D4A66"]}
                style={{ ...stackStyles }}
                innerProgress={elapsedTime === 0 ? 1 : round(stepProgress, 2)}
                outerProgress={elapsedTime === 0 ? 1 : round(totalProgress, 2)}
                padding={5}
                strokeWidth={15}
                radius={100}
            />

            <div style={{ ...stackStyles, width: "fit-content", textAlign: "center" }}>
                {reactIf(currentStep?.isPause,
                    <>
                        <span>REST</span><br />
                    </>
                )}
                <span style={{ fontSize: "3em", fontFamily: "monospace" }}>{roundedStepTime}s</span>
                <br />
                <span>
                    {numberOfCurrentStep + 1}/{numberOfSteps}
                </span>
            </div>
        </div>

        <h1 style={{ textAlign: "center", fontFamily: "monospace", borderBottom: "1px solid lightgrey" }}>
            {currentStep?.name}
        </h1>

        <div style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: "10px"
        }}>
            <TimerActionButton onClick={() => timer.resetCurrentStep()}>
                <FastBackwardOutlined />
            </TimerActionButton>

            <TimerActionButton onClick={() => timer.goBack()}>
                <StepBackwardOutlined />
            </TimerActionButton>

            <TimerActionButton size="large" disabled={finished} onClick={() => timer.togglePause()}>
                {paused ?
                    <PlayCircleOutlined />
                    :
                    <PauseCircleOutlined />
                }
            </TimerActionButton>

            <TimerActionButton onClick={() => timer.skipCurrentStep()}>
                <StepForwardOutlined />
            </TimerActionButton>

            <TimerActionButton onClick={() => timer.reset()}>
                <RollbackOutlined />
            </TimerActionButton>
        </div>

        <h1>Coming next:</h1>
        <List>
            {
                timer.steps.slice(timer.getNumberOfCurrentStep() + 1).map((step, index) => {
                    return <List.Item key={index}>
                        <span style={{display: "inline-block", minWidth: "50px", fontFamily: "monospace"}}>
                            {Math.round(step.duration / 1000)}s
                        </span>
                        {step.name}
                    </List.Item>;
                })
            }
        </List>
    </>;
};
