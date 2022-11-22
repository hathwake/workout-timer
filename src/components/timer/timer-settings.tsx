import { Checkbox, Form, Slider, Switch } from "antd";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { Modal } from "../ui/modal";

import "./timer-settings.css";

export interface TimerSettings {
    volume: number;
    soundEnabled: boolean;
}

export interface TimerSettingsProps {
    settings: TimerSettings;
    open: boolean;
    width?: string;

    onCancel: () => void;
    onOk: (settings: TimerSettings) => void;
}

export const TimerSettingsModal: React.FC<TimerSettingsProps> = (props) => {
    const {
        open,
        settings,
        onCancel,
        onOk,
        width
    } = props;

    const [form] = Form.useForm();

    const soundEnabledValue = Form.useWatch("soundEnabled", form);

    useEffect(() => {
        form.setFieldsValue(settings);
    }, [form, settings]);

    return <Modal open={open} onClose={() => onCancel()} title={"Settings"}>
        <Form form={form} onFinish={() => onOk(form.getFieldsValue(true))}>
            <Form.Item name={"soundEnabled"} label="Play Sound">
                {/* <Checkbox>Play Sound</Checkbox> */}
                <Switch></Switch>
            </Form.Item>
            <Form.Item name={"volume"} label="Volume">
                <Slider disabled={!soundEnabledValue} min={0} max={1} step={0.01}></Slider>
            </Form.Item>
            <Form.Item>
                <ButtonGroup>
                    <Button block htmlType="button" onClick={() => onCancel()}>Cancel</Button>
                    <Button block type="primary" htmlType="button" onClick={() => form.submit()}>Ok</Button>
                </ButtonGroup>
            </Form.Item>
        </Form>
    </Modal>;
};
