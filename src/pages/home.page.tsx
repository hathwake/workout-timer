import React from "react";
import {Button, Card} from "antd";
import {WorkoutList} from "../components/workout-list";
import {useLoaderData, useNavigate} from "react-router-dom";
import {WorkoutId} from "../data/workout.type";
import {PlusCircleOutlined} from "@ant-design/icons";

export interface HomeLoaderData {
    workouts: WorkoutId[];
}

export const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const routeData = useLoaderData() as HomeLoaderData;

    const onAddNewWorkout = () => {
        navigate("/workouts/new");
    };

    const workoutListActions = [
        <Button icon={<PlusCircleOutlined style={{color: "green"}}/>} onClick={onAddNewWorkout}>
            Add
        </Button>
    ];

    return <>
        <h1>Home</h1>
        <Card title={"Workouts"} actions={workoutListActions}>
            <WorkoutList workouts={routeData.workouts}></WorkoutList>
        </Card>
    </>;
};
