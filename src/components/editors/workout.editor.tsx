import { Button, Divider, Form, Input } from "antd";
import React, { useEffect } from "react";
import { Workout } from "../../data/workout.type";
import { EditPlan } from "./plan.editor";

export interface EditWorkoutProps<W extends Workout> {
    workout: W;
    onCancel: () => void;
    onFinish: (workout: W) => void;

    submitText?: string;
    cancelText?: string;
}

export const EditWorkout: React.FC<EditWorkoutProps<Workout>> = ({ workout, onFinish, onCancel, submitText, cancelText }) => {
    const [form] = Form.useForm<Workout>();

    useEffect(() => {
        form.setFieldsValue(workout);
    }, [form, workout]);

    // onFieldsChange={(changedFields, allFields) => console.log("changed", changedFields, allFields)}
    return <>
        <Form
            form={form}
            layout="vertical"
            onFinish={(values) => onFinish(values)}
        >
            <Form.Item label="Name" name="name">
                <Input></Input>
            </Form.Item>

            <Divider type="horizontal">Plan</Divider>

            <EditPlan></EditPlan>

            <Form.Item wrapperCol={{ span: 24 }}>
                <Button.Group style={{ width: "100%" }}>
                    <Button block={true} danger={true} onClick={onCancel}>{cancelText || "Cancel"}</Button>
                    <Button block={true} type="primary" htmlType="submit">{submitText || "Submit"}</Button>
                </Button.Group>
            </Form.Item>
        </Form>
    </>;
};