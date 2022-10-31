import { Button, Checkbox, Form, Input, InputNumber } from "antd";
import { FormInstance } from "rc-field-form";
import { useEffect } from "react";
import { Workout, WorkoutId } from "../data/workout.type"


export interface EditWorkoutProps<W extends Workout> {
    workout: W;
    onCancel: () => void;
    onFinish: (workout: W) => void;

    submitText?: string;
    cancelText?: string;
}

const EditExercise: React.FC<{namePrefix: string}> = ({namePrefix}) => {


    return <>
        <Form.Item name={namePrefix + "name"}>
            <Input></Input>
        </Form.Item>

        <Form.Item name={namePrefix + "length"}>
            <InputNumber min={0}></InputNumber>
        </Form.Item>

        <Form.Item name={namePrefix + "pause"}>
            <InputNumber addonBefore={
                <Checkbox></Checkbox>
            }></InputNumber>
        </Form.Item>
    </>
}

export const EditPlan: React.FC<{plan: Workout["plan"]}> = ({plan}) => {


    // const items = plan.map(item => {
    //     if(item.type === "ex") {
    //         return <EditExercise></EditExercise>
    //     }
    // })
    throw new Error("NOT IMPLEMENTED")
}

export const EditWorkout: React.FC<EditWorkoutProps<Workout>> = ({workout, onFinish, onCancel, submitText, cancelText}) => {
    const [form] = Form.useForm<Workout>();

    useEffect(() => {
        form.setFieldsValue(workout)
    }, [form, workout])

    return <>
        <Form form={form} onFinish={(values) => onFinish(workout)} labelCol={{span: 8}} wrapperCol={{span: 16}}>
            <Form.Item label="Name" name="name">
                <Input></Input>
            </Form.Item>

            <Form.Item wrapperCol={{span: 24}}>
                <Button.Group style={{width: "100%"}}>
                    <Button block={true} danger={true} onClick={onCancel}>{cancelText || "Cancel"}</Button>
                    <Button block={true} type="primary" htmlType="submit">{submitText || "Submit"}</Button>
                </Button.Group>
            </Form.Item>

            <EditPlan plan={form.getFieldValue("plan")}></EditPlan>
        </Form>
    </>
}