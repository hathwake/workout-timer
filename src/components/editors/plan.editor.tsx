import { Button, Collapse, Divider, Form, FormListFieldData, FormListOperation } from "antd";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";
import Operation from "antd/lib/transfer/operation";
import React from "react";
import { Exercise } from "../../data/workout.type";
import { Sortable } from "../dnd/sortable";
import { EditExercise } from "./exercise.editor";

export const FormValueChild: React.FC<{ value?: any }> = ({ value }) => {
    return <>
        {value}
    </>;
};

export const FormValue: React.FC<{ name: any[] }> = ({ name }) => {
    return <Form.Item name={name} noStyle={true}>
        <FormValueChild></FormValueChild>
    </Form.Item>;
};

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


                const genCollapsExtra = (index: number) => {
                    return <Button type="link" size="small" onClick={() => operation.remove(index)}>
                        Remove
                    </Button>;
                };

                const genPanel = (index: number, key: any, item: React.ReactNode, headerName: any) => {
                    const header = <FormValue name={[headerName, "name"]}></FormValue>;

                    return <Collapse>
                        <CollapsePanel key={key} header={header} extra={genCollapsExtra(index)}>
                            {item}
                        </CollapsePanel>
                    </Collapse>;
                };

                const genItemPanels = (field: FormListFieldData, index: number) => {
                    const type = form.getFieldValue(["plan", field.name, "type"]);

                    let item: React.ReactNode = undefined;

                    if (type === "ex") {
                        item = <Form.Item {...field}>
                            <EditExercise></EditExercise>
                        </Form.Item>;
                    } else {
                        throw new Error("Unsupported item");
                    }

                    return genPanel(index, field.key, item, field.name);
                };

                return <>
                    <Sortable items={fields} genContent={genItemPanels}></Sortable>

                    <Divider type="horizontal"></Divider>

                    <Form.Item>
                        <Button onClick={() => operation.add(getDefaultExercise())}>Add</Button>
                    </Form.Item>
                </>;
            }
        }
    </Form.List>;
};