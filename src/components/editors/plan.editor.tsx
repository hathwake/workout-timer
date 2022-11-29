import { Collapse, Form, FormListFieldData, FormListOperation, Popconfirm, Space } from "antd";
import React from "react";
import { Exercise } from "../../data/workout.type";
import { Sortable, SortableContentFunc } from "../dnd/sortable";
import { Button } from "../ui/button";
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


                const genCollapseExtra = (index: number, itemName: string) => {
                    const confirmRemove = () => {
                        operation.remove(index);
                    };

                    const duplicate = () => {
                       console.log(itemName, form.getFieldValue([itemName]));
                    };

                    return <span onClick={e => e.stopPropagation()}>
                        <Button type="link" onClick={duplicate}>Duplicate</Button>
                        <Popconfirm
                            title="are you sure?"
                            onConfirm={confirmRemove}
                        >
                            <Button type="link">
                                Remove
                            </Button>
                        </Popconfirm>
                    </span>;
                };

                const genPanel = (index: number, item: React.ReactNode, itemName: any, extra: React.ReactNode) => {
                    const header = <FormValue name={[itemName, "name"]}></FormValue>;

                    const extraNode = <span style={{whiteSpace: "nowrap"}}>{genCollapseExtra(index, itemName)}{extra}</span>;
                    const headerNode = <span style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }}>{header}</span>;

                    return <Collapse>
                        <Collapse.Panel key={0} header={headerNode} extra={extraNode}>
                            {item}
                        </Collapse.Panel>
                    </Collapse>;
                };

                const genItemPanel: SortableContentFunc = ({ item, index, dragHandle }) => {
                    const type = form.getFieldValue(["plan", item.name, "type"]);

                    let itemNode: React.ReactNode = undefined;

                    if (type === "ex") {
                        itemNode = <Form.Item {...item}>
                            <EditExercise></EditExercise>
                        </Form.Item>;
                    } else {
                        throw new Error("Unsupported item");
                    }

                    return genPanel(index, itemNode, item.name, dragHandle);
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