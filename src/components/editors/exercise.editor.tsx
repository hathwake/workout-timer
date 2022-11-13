import { Input, InputNumber, Checkbox, Form, Row, Col } from "antd";
import React, { useState } from "react";
import { Exercise } from "../../data/workout.type";

import "./exercise.editor.css";

export interface EditExerciseProps {
    value?: Exercise;
    onChange?: (value: Exercise) => void;
}

export const EditExercise: React.FC<EditExerciseProps> = ({ value, onChange }) => {
    const [name, setName] = useState<Exercise["name"]>("");
    const [duration, setDuration] = useState<Exercise["duration"]>(0);
    const [pause, setPause] = useState<Exercise["pause"]>(0);

    const triggerChange = (change: Partial<Exercise>) => {
        if (value) {
            onChange?.({
                ...value,
                ...change
            });
        }
    };

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!value) {
            return;
        }

        const newName = event.target.value;

        setName(newName);
        triggerChange({
            name: newName,
        });
    };

    const onDurationChange = (eventValue: string | number | null) => {
        if (!value) {
            return;
        }

        let newDuration = 0;
        if (typeof eventValue === "number") {
            newDuration = eventValue;
        } else if (typeof eventValue === "string") {
            newDuration = Number.parseFloat(eventValue);
        }

        setDuration(newDuration);
        triggerChange({
            duration: newDuration,
        });
    };

    const onPauseChange = (eventValue: string | number | null) => {
        if (!value) {
            return;
        }

        let newPause = 0;
        if (typeof eventValue === "number") {
            newPause = eventValue;
        } else if (typeof eventValue === "string") {
            newPause = Number.parseFloat(eventValue);
        }

        setPause(newPause);
        triggerChange({
            pause: newPause,
        });
    };

    return <div className="editor-exercise">
        <Form.Item label="Name">
            <Input value={value?.name || name} onChange={onNameChange}></Input>
        </Form.Item>

        <Row>
            <Col xs={12} sm={12}>
                <Form.Item label="Duration">
                    <InputNumber value={value?.duration || duration} onChange={onDurationChange}></InputNumber>
                </Form.Item>
            </Col>

            <Col xs={12} sm={12}>
                <Form.Item label="Pause">
                    <InputNumber value={value?.pause || pause} onChange={onPauseChange}></InputNumber>
                </Form.Item>
            </Col>
        </Row>
    </div >;
};