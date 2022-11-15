import { useEffect, useMemo, useState } from "react";
import { useLoaderData, useNavigate, useRouteLoaderData } from "react-router-dom";
import { EditWorkout } from "../components/editors/workout.editor";
import { WorkoutStorage } from "../data/workout.storage";
import { Workout, WorkoutId } from "../data/workout.type";
import { Form, notification } from "antd";

export interface EditWorkoutPageData {
    workout: WorkoutId;
}

export const EditWorkoutPage: React.FC = () => {
    const { workout } = useLoaderData() as EditWorkoutPageData;

    const [workoutForm] = Form.useForm();

    useEffect(() => {
        workoutForm.setFieldsValue(workout);
    }, [workout, workoutForm]);

    const navigate = useNavigate();
    
    const workoutStorage = useMemo(() => {
        return new WorkoutStorage();
    }, []);

    const onFinish = (workout: WorkoutId) => {
        workoutStorage.store(workout).then(() => {
            navigate("/home");
        }).catch((e) => {
            notification.error({
                message: e instanceof Error ? e.message : JSON.stringify(e),
            });
        });
    };

    const onCancel = () => {
        navigate(-1);
    };

    return <>
        <h1>Edit Workout</h1>
        <EditWorkout form={workoutForm} onFinish={onFinish} onCancel={onCancel}/>
    </>;
};
