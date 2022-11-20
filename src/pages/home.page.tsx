import React, { useMemo, useState } from "react";
import {Button, Card, Divider, notification} from "antd";
import {WorkoutList} from "../components/workout-list";
import {useLoaderData, useNavigate} from "react-router-dom";
import {WorkoutId} from "../data/workout.type";
import { WorkoutStorage } from "../data/storage/workout.storage";

export interface HomeLoaderData {
    workouts: WorkoutId[];
}

export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const routeData = useLoaderData() as HomeLoaderData;

    const [workouts, setWorkouts] = useState(routeData.workouts);

    const workoutStorage = useMemo(() => {
        return new WorkoutStorage();
    }, []);

    const onAddWorkout = () => {
        navigate("/workouts/new");
    };

    const onRemoveWorkout = (id: string) => {
        workoutStorage.delete(id).then(() => {
            return workoutStorage.list();
        }).then((workouts) => {
            setWorkouts(workouts);
        }).catch(e => {
            notification.error({
                message: e instanceof Error ? e.message : JSON.stringify(e)
            });
        });
    };

    return <>
        <h1>Home</h1>
        
        <Divider type="horizontal">Workouts</Divider>
        <WorkoutList workouts={workouts} onAddWorkout={onAddWorkout} onRemoveWorkout={onRemoveWorkout}></WorkoutList>
    </>;
};
