import { Button, Divider, List, Tooltip } from "antd";
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
import { useSmoothValue } from "./smooth-value";

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

    const stepTime = currentStep ? elapsedTime - currentStep.begin : 0;
    const stepProgress = currentStep ? stepTime / currentStep.duration : 0;
    const totalProgress = duration > 0 ? elapsedTime / duration : 1;

    const smoothness = 0.1;

    const animTotalProgress = useSmoothValue(totalProgress, smoothness);
    const animStepProgress = useSmoothValue(stepProgress, smoothness);

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
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", flexShrink: 0, flexGrow: 0, width: "max(40vh, 300px)", aspectRatio: "1" }}>
                <CircularProgressbar
                    gradientPrefix="timer"
                    innerGradient={innerGradientColors}
                    outerGradient={["#6A5D7B", "#5D4A66"]}
                    style={{ ...stackStyles }}
                    innerProgress={elapsedTime === 0 ? 1 : animStepProgress}
                    outerProgress={elapsedTime === 0 ? 1 : animTotalProgress}
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
                    <span style={{ fontSize: "3em", fontFamily: "monospace" }}>{currentStep ? Math.round((elapsedTime - currentStep.begin) / 1000) : 0}s</span>
                    <br />
                    <span>
                        {numberOfCurrentStep + 1}/{numberOfSteps}
                    </span>
                </div>
            </div>
        </div>
        
        <Tooltip title={currentStep?.name}>
            <div style={{
                fontSize: "2em",
                textAlign: "center",
                fontFamily: "monospace",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
            }}>
                {currentStep?.name}
            </div>
        </Tooltip>

        <Divider type="horizontal" style={{margin: "12px 0px"}}></Divider>

        <div style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: "10px"
        }}>
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
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
            <Button type="link" onClick={() => timer.resetCurrentStep()}>Reset Exercise</Button>
            <div style={{ flexGrow: 1 }}></div>
            <Button type="link" onClick={() => timer.reset()}>Reset Timer</Button>
        </div>

        <Divider type="horizontal" style={{margin: "12px 0px"}}></Divider>

        <h1>Coming next:</h1>
        <List>
            {
                timer.steps.slice(timer.getNumberOfCurrentStep() + 1).map((step, index) => {
                    return <List.Item key={index}>
                        <span style={{ display: "inline-block", minWidth: "50px", fontFamily: "monospace" }}>
                            {Math.round(step.duration / 1000)}s
                        </span>
                        {step.name}
                    </List.Item>;
                })
            }
        </List>
    </>;
};
