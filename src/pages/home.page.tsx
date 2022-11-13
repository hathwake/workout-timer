import React from "react";
import {Button, Card, Divider} from "antd";
import {WorkoutList} from "../components/workout-list";
import {useLoaderData, useNavigate} from "react-router-dom";
import {WorkoutId} from "../data/workout.type";

export interface HomeLoaderData {
    workouts: WorkoutId[];
}

export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const routeData = useLoaderData() as HomeLoaderData;

    const onAddWorkout = () => {
        navigate("/workouts/new");
    };


    return <>
        <h1>Home</h1>
        
        <Divider type="horizontal">Workouts</Divider>
        <WorkoutList workouts={routeData.workouts} onAddWorkout={onAddWorkout}></WorkoutList>
    </>;
};
