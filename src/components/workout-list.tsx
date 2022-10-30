import React, {useState} from "react";
import {Workout} from "../data/workout.type";
import {Checkbox, Empty, List} from "antd";


export interface WorkoutListProps {
    workouts: Workout[];
    markedIds?: string[];
    onWorkoutMarked?: (id: string, checked: boolean) => void;
}

export const WorkoutList: React.FC<WorkoutListProps> = ({workouts, markedIds, onWorkoutMarked}) => {
    if(workouts.length > 0) {
        return <List>
            {
                workouts.map(w => {
                    return <List.Item>
                        <Checkbox checked={markedIds?.includes(w.id)} onChange={(e) => onWorkoutMarked?.(w.id, e.target.checked)}></Checkbox>
                        {w.id}
                    </List.Item>
                })
            }
        </List>
    } else {
        return <Empty></Empty>
    }
}
