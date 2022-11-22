import { Checkbox, Col, Divider, Form, Modal, Row, Slider } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { PlaySoundCallback, TimerDisplay, TimerSound } from "../components/timer/timer-display";
import { Button } from "../components/ui/button";
import { SoundBoard } from "../data/sound-board";
import { Timer } from "../data/timer";
import { WorkoutId } from "../data/workout.type";
import { SettingOutlined } from "@ant-design/icons";
import { TimerSettings, TimerSettingsModal } from "../components/timer/timer-settings";
import { reactIf } from "../directives/if";

export interface TimerPageData {
    workout: WorkoutId;
    sounds: Record<TimerSound, ArrayBuffer>
}

export const TimerPage: React.FC<{}> = () => {
    const {
        workout,
        sounds
    } = useLoaderData() as TimerPageData;

    const [settings, setSettings] = useState<TimerSettings>({
        soundEnabled: true,
        volume: 1.0
    });
    const [settingsOpen, setSettingsOpen] = useState(false);

    const soundBoard = useMemo(() => {
        return new SoundBoard<TimerSound>(sounds);
    }, [sounds]);

    const timer = useMemo(() => {
        return new Timer(workout);
    }, [workout]);

    useEffect(() => {
        const subscription = timer.onPausedChange((paused) => {
            if(paused === false && soundBoard.state === undefined) {
                soundBoard.initialize();
            }

            return () => subscription.unsubscribe();
        });
    }, [timer, soundBoard]);

    const onPlaySound: PlaySoundCallback = async (sound: TimerSound) => {
        if(settings.soundEnabled && settings.volume > 0) {
            soundBoard.playSound(sound, settings.volume);
        }
    };

    const saveSettings = (settings: TimerSettings) => {
        // TODO : save to storage

        setSettings(settings);
        setSettingsOpen(false);
    };

    return <>
        <Row>
            <Col flex={"1 0 auto"}>
                <h1>{workout.name}</h1>
            </Col>
            <Col>
                {reactIf(!settings.soundEnabled, <span>muted </span>)}
                <Button onClick={() => setSettingsOpen(true)}>
                    <SettingOutlined />
                </Button>
            </Col>
        </Row>

        <TimerSettingsModal
            settings={settings}
            open={settingsOpen}
            onOk={(settings) => saveSettings(settings)} 
            onCancel={() => setSettingsOpen(false)}
        />

        <Divider type="horizontal" style={{ margin: "12px 0px" }}></Divider>

        <TimerDisplay
            timer={timer}
            onPlaySound={onPlaySound}
        />
    </>;
};