import React from 'react';
import { Col, Layout, Menu, Row } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import { ItemType } from 'antd/lib/menu/hooks/useItems';

const { Header, Content } = Layout;

export const AppMainLayout = () => {
    const navigate = useNavigate();

    const menuItems: ItemType[] = [
        {
            label: <>WorkoutTimer</>,
            key: "appName",
        },
        {
            label: <>Home</>,
            key: "home",
            onClick: () => {
                navigate("/home");
            }
        },
        {
            label: <>Test</>,
            key: "test",
            onClick: () => {
                navigate("/test");
            }
        }
    ];

    return (
        <Layout style={{ height: "100%" }}>
            <Header>
                <Menu mode={"horizontal"} theme={"dark"} items={menuItems} />
            </Header>

            <Content style={{padding: "10px"}}>
                <Row>
                    <Col md={{ span: 12, offset: 6 }} xs={{ span: 24, offset: 0 }}>
                        <Outlet></Outlet>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};
