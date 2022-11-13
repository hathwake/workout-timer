import { Col, Layout, Menu, Row } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import { ItemType } from "antd/lib/menu/hooks/useItems";

const { Header, Content } = Layout;

export const AppMainLayout = () => {
    const navigate = useNavigate();

    const menuItems: ItemType[] = [
        // {
        //     label: <>WorkoutTimer</>,
        //     key: "appName",
        // },
        {
            label: <>Home</>,
            key: "home",
            onClick: () => {
                navigate("/home");
            }
        },
    ];

    return (
        <Layout style={{ height: "100%" }}>
            <Header style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                <span style={{lineHeight: "inherit", color: "white"}}>
                WorkoutTimer
                </span>
                <Menu mode={"horizontal"} theme={"dark"} items={menuItems} />
            </Header>

            <Content style={{padding: "10px", overflow: "auto"}}>
                <Row>
                    <Col style={{padding: "24px", background: "white"}} md={{ span: 12, offset: 6 }} xs={{ span: 24, offset: 0 }}>
                        <Outlet></Outlet>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};
