import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditWorkout } from "../components/editors/workout.editor";
import { WorkoutStorage } from "../data/workout.storage";
import { Workout } from "../data/workout.type";
import { Form, notification } from "antd";

export const AddWorkoutPage: React.FC = () => {
    const [defaultWorkout] = useState<Workout>({
        name: "hello",
        lastOpened: Date.now(),
        plan: [
            {
                type: "ex",
                duration: 30.0,
                name: "Push-Ups"
            }
        ]
    });

    const [workoutForm] = Form.useForm();

    useEffect(() => {
        workoutForm.setFieldsValue(defaultWorkout);
    }, [defaultWorkout, workoutForm]);

    const navigate = useNavigate();
    
    const workoutStorage = useMemo(() => {
        return new WorkoutStorage();
    }, []);

    const onFinish = () => {
        const finalWorkout = workoutForm.getFieldsValue(true);
        workoutStorage.create(finalWorkout).then(() => {
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
        <h1>Add Workout</h1>
        <EditWorkout form={workoutForm} onFinish={onFinish} onCancel={onCancel}/>
    </>;
};
