import { Button, Collapse, Divider, Form, FormListFieldData, FormListOperation, Popconfirm, Space } from "antd";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";
import Operation from "antd/lib/transfer/operation";
import React from "react";
import { Exercise } from "../../data/workout.type";
import { Sortable, SortableContentFunc } from "../dnd/sortable";
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
                    const confirmRemove = () => {
                        operation.remove(index);
                    };

                    return <>
                        <span onClick={e => e.stopPropagation()}>
                            <Popconfirm
                                title="are you sure?"
                                onConfirm={confirmRemove}
                            >
                                <Button type="link" size="small">
                                    Remove
                                </Button>
                            </Popconfirm>
                        </span>
                    </>;
                };

                const genPanel = (index: number, key: any, item: React.ReactNode, headerName: any, extra: React.ReactNode) => {
                    const header = <FormValue name={[headerName, "name"]}></FormValue>;

                    return <Collapse>
                        <CollapsePanel key={key} header={header} extra={[genCollapsExtra(index), extra]}>
                            {item}
                        </CollapsePanel>
                    </Collapse>;
                };

                const genItemPanel: SortableContentFunc = ({ item: field, index, dragHandle }) => {
                    const type = form.getFieldValue(["plan", field.name, "type"]);

                    let item: React.ReactNode = undefined;

                    if (type === "ex") {
                        item = <Form.Item {...field}>
                            <EditExercise></EditExercise>
                        </Form.Item>;
                    } else {
                        throw new Error("Unsupported item");
                    }

                    return genPanel(index, field.key, item, field.name, [dragHandle]);
                };

                return <>
                    <Space size={20} direction="vertical" style={{ width: "100%" }}>
                        <Sortable items={fields} genContent={genItemPanel} onMove={operation.move}></Sortable>

                        <Form.Item>
                            <Button onClick={() => operation.add(getDefaultExercise())} block>Add</Button>
                        </Form.Item>
                    </Space>
                </>;
            }
        }
    </Form.List>;
};