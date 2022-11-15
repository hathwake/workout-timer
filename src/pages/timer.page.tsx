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
        <h1>Timer: {workout.name}</h1>

        <TimerDisplay timer={timer} />
    </>;
};