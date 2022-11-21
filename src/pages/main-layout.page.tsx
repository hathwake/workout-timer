import { Col, Layout, Menu, notification, Row } from "antd";
import { useNavigate, Outlet } from "react-router-dom";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { ThemeState, ThemeSwitch } from "../components/ui/theme-switch";
import { useEffect, useMemo, useState } from "react";
import { SettingsStorage } from "../data/storage/settings.storage";

const { Header, Content } = Layout;

export const AppMainLayout = () => {
    const navigate = useNavigate();

    const [currentTheme, setCurrentTheme] = useState<ThemeState>("light");
    
    const settingsStorage = useMemo(() => new SettingsStorage(), []);
    useEffect(() => {
        try {
            settingsStorage.get(settingsStorage.keys.theme)
            .then(theme => theme.value).catch(() => "light")
            .then((val) => {
                changeTheme(val as ThemeState);
            });
        } catch(e) {}
    }, [settingsStorage]);

    const changeTheme = (theme: ThemeState) => {
        settingsStorage.store({id: settingsStorage.keys.theme, value: theme}).then(() => {
            console.log(theme, currentTheme);
            document.documentElement.classList.remove(currentTheme);
            document.documentElement.classList.add(theme);
    
            setCurrentTheme(theme);
        }).catch(e => console.error(e));
    };

    const menuItems: ItemType[] = [
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
                <a style={{lineHeight: "inherit", color: "white"}} href="#/home">
                WorkoutTimer
                </a>
                <Menu selectable={false} mode={"horizontal"} theme={"dark"} items={menuItems} />
                <div style={{flexGrow: 1}}></div>
                <ThemeSwitch state={currentTheme} onStateChange={changeTheme}>
                    {currentTheme === "dark" ? "Light" : "Dark"}
                </ThemeSwitch>
            </Header>

            <Content style={{padding: "10px"}}>
                <Row>
                    <Col style={{padding: "24px", borderRadius: "10px", background: "var(--body-background-secondary)"}} md={{ span: 12, offset: 6 }} xs={{ span: 24, offset: 0 }}>
                        <Outlet></Outlet>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};
