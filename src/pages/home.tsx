import React, {useState} from "react";
import {Button, Card, Col, Row} from "antd";
import {WorkoutList} from "../components/workout-list";
import {useLoaderData} from "react-router-dom";
import {Workout} from "../data/workout.type";
import {PlusCircleOutlined, PlusOutlined} from "@ant-design/icons";

export interface HomeLoaderData {
    workouts: Workout[];
}

export const Home: React.FC = () => {
    const routeData = useLoaderData() as HomeLoaderData;

    const [markedIds, setMarkedIds] = useState<string[]>([])

    const workoutListActions = [
        <Button icon={<PlusCircleOutlined style={{color: "green"}}/>}>
            Add
        </Button>
    ]

    return <Row>
        <Col md={{span: 12, offset: 6}} xs={{span: 24, offset: 0}}>
            <Card title={"Workouts"} actions={workoutListActions}>
                <WorkoutList workouts={routeData.workouts}></WorkoutList>
            </Card>
        </Col>
    </Row>
}
