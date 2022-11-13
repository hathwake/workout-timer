import { Form, FormListFieldData, FormListOperation } from "antd";
import { EditExercise } from "./exercise.editor";

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