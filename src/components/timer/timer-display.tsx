import { Divider, List, Tooltip } from "antd";
import { useEffect, useMemo, useState } from "react";
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
import { reactIf } from "../../directives/if";
import { TimerActionButton } from "./timer-action-button";
import { useSmoothValue } from "./smooth-value";
import { Button } from "../ui/button";
import { useAudioPlayer } from "./audio-player";

export type TimerSound = "countdown_step" | "countdown_finished";
export type PlaySoundCallback = (sound: TimerSound) => Promise<void>;

export interface TimerDisplayProps {
    timer: Timer;
    onPlaySound?: PlaySoundCallback;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ timer, onPlaySound }) => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentStep, setCurrentStep] = useState<TimerStep | undefined>(undefined);
    const [numberOfSteps, setNumberOfSteps] = useState<number>(0);
    const [numberOfCurrentStep, setNumberOfCurrentStep] = useState<number>(0);
    const [finished, setFinished] = useState<boolean>(false);
    const [paused, setPaused] = useState<boolean>(true);
    
    const [lastFullSecond, setLastFullSecond] = useState<number>(Math.floor(elapsedTime / 1000));
    const currentFullSecond = Math.floor(elapsedTime / 1000);

    if(currentFullSecond !== lastFullSecond) {
        setLastFullSecond(currentFullSecond);

        const timeUntilNext = currentStep ? (currentStep.begin / 1000 + currentStep.duration / 1000) - currentFullSecond : -1;

        if(timeUntilNext < 4 && timeUntilNext >= 0) {
            onPlaySound?.("countdown_step");
        }
    }

    const stepTime = currentStep ? elapsedTime - currentStep.begin : 0;
    const stepProgress = currentStep ? stepTime / currentStep.duration : 0;
    const totalProgress = duration > 0 ? elapsedTime / duration : 1;

    const smoothness = 0.1;

    const animTotalProgress = useSmoothValue(elapsedTime === 0 ? 1.0 : totalProgress, smoothness);
    const animStepProgress = useSmoothValue(elapsedTime === 0 ? 1.0 : stepProgress, smoothness);

    useEffect(() => {

        const update = timer.onUpdate(() => {
            if(!timer.paused && timer.currentStep !== currentStep) {
                onPlaySound?.("countdown_finished");
            }

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
    }, [timer, currentStep, onPlaySound]);

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
            <div style={{ position: "relative", flexShrink: 0, flexGrow: 0, width: "max(30vh, 300px)", aspectRatio: "1" }}>
                <CircularProgressbar
                    gradientPrefix="timer"
                    innerGradient={innerGradientColors}
                    outerGradient={["#6A5D7B", "#5D4A66"]}
                    style={{ ...stackStyles }}
                    innerProgress={animStepProgress}
                    outerProgress={animTotalProgress}
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
                    <span style={{ fontSize: "3em", fontFamily: "monospace" }}>{currentStep ? ((elapsedTime - currentStep.begin) / 1000).toFixed(2) : 0}s</span>
                    <br />
                    <span>
                        {numberOfCurrentStep + 1}/{numberOfSteps}
                    </span>
                </div>
            </div>
        </div>
        
        <div title={currentStep?.name} style={{
            fontSize: "2em",
            textAlign: "center",
            fontFamily: "monospace",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
        }}>
            {currentStep?.name}
        </div>

        <Divider type="horizontal" style={{margin: "12px 0px"}}></Divider>

        <div style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: "10px"
        }}>
            <Button type="action" height="64px" onClick={() => timer.goBack()}>
                <StepBackwardOutlined />
            </Button>

            <Button type="action" height="76px" disabled={finished} onClick={() => timer.togglePause()}>
                {paused ?
                    <PlayCircleOutlined />
                    :
                    <PauseCircleOutlined />
                }
            </Button>

            <Button type="action" height="64px" onClick={() => timer.skipCurrentStep()}>
                <StepForwardOutlined />
            </Button>
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
            <Button height="32px" type="link" onClick={() => timer.resetCurrentStep()}>Reset Exercise</Button>
            <div style={{ flexGrow: 1 }}></div>
            <Button height="32px" type="link" onClick={() => timer.reset()}>Reset Timer</Button>
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
