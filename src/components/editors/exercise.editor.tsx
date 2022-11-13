import { Input, InputNumber, Checkbox, Form } from "antd";

export const EditExercise: React.FC<{ fieldName: any }> = ({ fieldName }) => {
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