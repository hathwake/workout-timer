import React from "react";
import { WorkoutId } from "../data/workout.type";
import { Button, Checkbox, Empty, List } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";


export interface WorkoutListProps {
    workouts: WorkoutId[];
    markedIds?: string[];
    onWorkoutMarked?: (id: string, checked: boolean) => void;
    onAddWorkout?: () => void;
}

export const WorkoutList: React.FC<WorkoutListProps> = ({ workouts, markedIds, onWorkoutMarked, onAddWorkout }) => {
    const addIcon = <PlusCircleOutlined style={{ color: "green" }} />;

    return <>
        <List>
            {
                workouts.map(w => {
                    return <List.Item>
                        <Checkbox checked={markedIds?.includes(w.id)} onChange={(e) => onWorkoutMarked?.(w.id, e.target.checked)}></Checkbox>
                        {w.id}
                    </List.Item>;
                })
            }

            <Empty></Empty>
        </List>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
            <Button icon={addIcon} onClick={onAddWorkout}>Add</Button>
        </div>
    </>;
};
