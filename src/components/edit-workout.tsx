import { Button, Checkbox, Form, FormListFieldData, FormListOperation, Input, InputNumber } from "antd";
import React, { useEffect } from "react";
import { Workout } from "../data/workout.type";

export interface EditWorkoutProps<W extends Workout> {
    workout: W;
    onCancel: () => void;
    onFinish: (workout: W) => void;

    submitText?: string;
    cancelText?: string;
}

// const Collapsible: React.FC<PropsWithChildren<{ header: React.ReactNode }>> = ({ header, children }) => {
//     return <Collapse>
//         <Collapse.Panel key="0" header={header}>
//             {children}
//         </Collapse.Panel>
//     </Collapse>;
// };

const EditExercise: React.FC<{ fieldName: any }> = ({ fieldName }) => {
    return <>
        <Form.Item label="Name" name={[fieldName, "name"]}>
            <Input></Input>
        </Form.Item>

        <Form.Item label="Duration" name={[fieldName, "length"]}>
            <InputNumber min={0}></InputNumber>
        </Form.Item>

        <Form.Item label="Pause" name={[fieldName, "pause"]}>
            <InputNumber addonBefore={
                <Checkbox></Checkbox>
            }></InputNumber>
        </Form.Item>
    </>;
};

export const EditPlan: React.FC<{}> = () => {
    const form = Form.useFormInstance();
    // const planValue: Workout["plan"] | undefined = Form.useWatch("plan", form);

    return <Form.List name="plan">
        {
            (fields: FormListFieldData[], operation: FormListOperation, meta: {
                errors: React.ReactNode[];
                warnings: React.ReactNode[];
            }) => {
                return fields.map(field => {
                    const type = form.getFieldValue(["plan", field.name, "type"]);

                    if (type === "ex") {
                        return <Form.Item key={field.key}>
                            <EditExercise fieldName={field.name}></EditExercise>
                        </Form.Item>;
                    } else {
                        throw new Error("Unsupported item");
                    }
                });
            }
        }
    </Form.List>;
};

export const EditWorkout: React.FC<EditWorkoutProps<Workout>> = ({ workout, onFinish, onCancel, submitText, cancelText }) => {
    const [form] = Form.useForm<Workout>();

    useEffect(() => {
        form.setFieldsValue(workout);
    }, [form, workout]);

    return <>
        <Form form={form} onFinish={(values) => onFinish(form.getFieldsValue(true))} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFieldsChange={(changedFields, allFields) => console.log("changed", changedFields, allFields)}>
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
    </>;
};