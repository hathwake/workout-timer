import { Button, Form, FormListFieldData, FormListOperation } from "antd";
import Operation from "antd/lib/transfer/operation";
import { Exercise } from "../../data/workout.type";
import { EditExercise } from "./exercise.editor";

export const EditPlan: React.FC<{}> = () => {
    const form = Form.useFormInstance();

    const getDefaultExercise = (): Exercise => {
        return {
            type: "ex",
            name: "Exercise",
            duration: 30,
        };
    };

    return <Form.List name="plan">
        {
            (fields: FormListFieldData[], operation: FormListOperation, meta: {
                errors: React.ReactNode[];
                warnings: React.ReactNode[];
            }) => {
                return <>
                    {fields.map((field) => {
                        const type = form.getFieldValue(["plan", field.name, "type"]);

                        if (type === "ex") {
                            return <Form.Item {...field}>
                                <EditExercise></EditExercise>
                            </Form.Item>;
                        } else {
                            throw new Error("Unsupported item");
                        }
                    }).map((item, index) => {
                        return <div>
                            {item}
                            <Button key={index} onClick={() => operation.remove(index)}>
                                Remove
                            </Button>
                        </div>;
                    })}


                    <Form.Item>
                        <Button onClick={() => operation.add(getDefaultExercise())}>Add</Button>
                    </Form.Item>
                </>;
            }
        }
    </Form.List>;
};