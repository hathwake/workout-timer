import React from "react";
import { WorkoutId } from "../data/workout.type";
import { Button, Empty, List, Popconfirm } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { reactIf } from "../directives/if";
import { useNavigate } from "react-router-dom";


export interface WorkoutListProps {
    workouts: WorkoutId[];
    onAddWorkout?: () => void;
    onRemoveWorkout?: (id: string) => void;
}

export const WorkoutList: React.FC<WorkoutListProps> = ({ workouts, onAddWorkout, onRemoveWorkout }) => {
    const navigate = useNavigate();

    const sortedWorkouts = workouts.sort((a, b) => b.lastOpened - a.lastOpened);
    
    const addIcon = <PlusCircleOutlined style={{ color: "green" }} />;

    const handleOnItemClick = (w: WorkoutId) => {
        navigate(`/timer/${w.id}`);
    };

    const handleOnEditItem = (w: WorkoutId) => {
        navigate(`/workouts/edit/${w.id}`);
    };

    const handleOnRemoveItem = (w: WorkoutId) => {
        onRemoveWorkout?.(w.id);
    };

    return <>
        <List>
            {
                sortedWorkouts.map((w, index) => {
                    const actions: React.ReactNode[] = [
                        <div onClick={(e) => e.stopPropagation()}>
                            <Popconfirm title="are you sure?" onConfirm={(e) => handleOnRemoveItem(w)}>
                                <Button danger type="link" onClick={(e) => e.stopPropagation()}>Remove</Button>
                            </Popconfirm>
                            <Button type="link" onClick={(e) => handleOnEditItem(w)}>Edit</Button>
                        </div>
                    ];

                    return <List.Item key={index} actions={actions} style={{cursor: "pointer"}} onClick={() => handleOnItemClick(w)}>
                        {w.name}
                    </List.Item>;
                })
            }
            {
                reactIf(sortedWorkouts.length <= 0,
                    <Empty></Empty>
                )
            }
        </List>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
            <Button icon={addIcon} onClick={onAddWorkout}>Add</Button>
        </div>
    </>;
};
