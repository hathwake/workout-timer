import { Form, Input, Modal } from "antd";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { EditWorkout } from "../components/edit-workout";
import { Workout, WorkoutId } from "../data/workout.type";

export const AddWorkoutPage: React.FC = () => {
    const [workout, setWorkout] = useState<Workout>({
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

    }

    const onCancel = () => {
        navigate(-1);
    }

    return <>
        <h1>Add Workout</h1>
        <EditWorkout workout={workout} onFinish={onFinish} onCancel={onCancel}/>
    </>
}
