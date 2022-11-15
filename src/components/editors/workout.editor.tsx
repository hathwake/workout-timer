import { Button, Divider, Form, FormInstance, Input } from "antd";
import React, { useEffect } from "react";
import { Workout } from "../../data/workout.type";
import { EditPlan } from "./plan.editor";

export interface EditWorkoutProps<W extends Workout> {
    form: FormInstance<W>
    onCancel: () => void;
    onFinish: (workout: W) => void;

    submitText?: string;
    cancelText?: string;
}

export class EditWorkout<W extends Workout> extends React.Component<EditWorkoutProps<W>>{
    render(): React.ReactNode {
        return <>
            <Form
                form={this.props.form}
                layout="vertical"
                onFinish={(values) => this.props.onFinish(values)}
            >
                <Divider type="horizontal">Info</Divider>

                <Form.Item label="Name" name="name">
                    <Input></Input>
                </Form.Item>

                <Divider type="horizontal">Plan</Divider>

                <EditPlan></EditPlan>

                <Form.Item wrapperCol={{ span: 24 }}>
                    <Button.Group style={{ width: "100%" }}>
                        <Button block={true} danger={true} onClick={this.props.onCancel}>{this.props.cancelText || "Cancel"}</Button>
                        <Button block={true} type="primary" htmlType="submit">{this.props.submitText || "Submit"}</Button>
                    </Button.Group>
                </Form.Item>
            </Form>
        </>;
    }
}