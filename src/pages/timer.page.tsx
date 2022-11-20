import { Divider } from "antd";
import { useMemo } from "react";
import { useLoaderData } from "react-router-dom";
import { TimerDisplay } from "../components/timer/timer-display";
import { Timer } from "../data/timer";
import { WorkoutId } from "../data/workout.type";

export interface TimerPageData {
    workout: WorkoutId;
}

export const TimerPage: React.FC<{}> = () => {
    const { workout } = useLoaderData() as TimerPageData;

    const timer = useMemo(() => {
        return new Timer(workout);
    }, [workout]);


    return <>
        <h1>{workout.name}</h1>

        <Divider type="horizontal" style={{margin: "12px 0px"}}></Divider>

        <TimerDisplay timer={timer} />
    </>;
};