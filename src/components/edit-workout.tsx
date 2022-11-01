import { Button, Checkbox, Collapse, Form, FormListFieldData, FormListOperation, Input, InputNumber } from "antd";
import { FormInstance } from "rc-field-form";
import React, { PropsWithChildren, useEffect } from "react";
import { Workout, WorkoutId } from "../data/workout.type"
import { reactIf } from "../directives/if";

type NamePathPrefix = (string | number)[];

export interface EditWorkoutProps<W extends Workout> {
    workout: W;
    onCancel: () => void;
    onFinish: (workout: W) => void;

    submitText?: string;
    cancelText?: string;
}

const Collapsible: React.FC<PropsWithChildren<{ header: React.ReactNode }>> = ({ header, children }) => {
    return <Collapse>
        <Collapse.Panel key="0" header={header}>
            {children}
        </Collapse.Panel>
    </Collapse>
}

const EditExercise: React.FC<{value?: any}> = ({ value }) => {
    console.log("ex", value);
    const form = Form.useFormInstance();
    const nameWatch = Form.useWatch("name", form);

    return <>
        <Collapsible header={nameWatch}>
            <Form.Item name={"name"}>
                <Input></Input>
            </Form.Item>

            <Form.Item name={"length"}>
                <InputNumber min={0}></InputNumber>
            </Form.Item>

            <Form.Item name={"pause"}>
                <InputNumber addonBefore={
                    <Checkbox></Checkbox>
                }></InputNumber>
            </Form.Item>
        </Collapsible>
    </>
}

export const EditPlan: React.FC<{}> = ({ }) => {
    const form = Form.useFormInstance();
    const planValue: Workout["plan"] | undefined = Form.useWatch("plan", form);

    const items = planValue?.map((item, index) => {

    }) || [];


    return <Form.List name="plan">
        {
            (fields: FormListFieldData[], operation: FormListOperation, meta: {
                errors: React.ReactNode[];
                warnings: React.ReactNode[];
            }) => {
                return fields.map(field => {
                    const type = form.getFieldValue(["plan", field.name, "type"]);

                    if (type === "ex") {
                        return <Form.Item key={field.key} name={field.name}>
                            <EditExercise></EditExercise>
                        </Form.Item>
                    } else {
                        throw new Error("Unsupported item");
                    }
                })
            }
        }
    </Form.List>
}

export const EditWorkout: React.FC<EditWorkoutProps<Workout>> = ({ workout, onFinish, onCancel, submitText, cancelText }) => {
    const [form] = Form.useForm<Workout>();

    useEffect(() => {
        form.setFieldsValue(workout)
    }, [form, workout])

    return <>
        <Form form={form} onFinish={(values) => onFinish(workout)} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFieldsChange={(changedFields, allFields) => console.log("changed", changedFields, allFields   )}>
            <Form.Item label="Name" name="name">
                <Input></Input>
            </Form.Item>

            <EditPlan></EditPlan>

            <Form.Item wrapperCol={{ span: 24 }}>
                <Button.Group style={{ width: "100%" }}>
                    <Button block={true} danger={true} onClick={onCancel}>{cancelText || "Cancel"}</Button>
                    <Button block={true} type="primary" htmlType="submit">{submitText || "Submit"}</Button>
                </Button.Group>
            </Form.Item>
        </Form>
    </>
}