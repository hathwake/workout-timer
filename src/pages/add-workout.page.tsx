import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditWorkout } from "../components/edit-workout";
import { Workout } from "../data/workout.type";

export const AddWorkoutPage: React.FC = () => {
    const [workout] = useState<Workout>({
        name: "hello",
        plan: [
            {
                type: "ex",
                length: 30.0,
                name: "Push-Ups"
            }
        ]
    });
    const navigate = useNavigate();

    const onFinish = (workout: Workout) => {
        console.log("finished", workout);
    };

    const onCancel = () => {
        navigate(-1);
    };

    return <>
        <h1>Add Workout</h1>
        <EditWorkout workout={workout} onFinish={onFinish} onCancel={onCancel}/>
    </>;
};
