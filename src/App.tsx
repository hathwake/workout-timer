import React from 'react';
import './App.css';
import {Layout, Menu} from "antd";
import {Home, HomeLoaderData} from "./pages/home";
import {
    createBrowserRouter,
    RouterProvider,
    Navigate
} from "react-router-dom";
import {useWorkoutStorage} from "./data/workout.storage";

const {Header, Content} = Layout;

const routes = createBrowserRouter([
    {
        path: "/home",
        element: <Home></Home>,
        loader: async (routes): Promise<HomeLoaderData> => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const workoutStorage = useWorkoutStorage();

            return {
                workouts: await workoutStorage.list()
            }
        }
    },
    {
        path: "/*",
        element: <Navigate to={"/home"}></Navigate>
    }
])

function App() {
    return (
        <Layout style={{height: "100%"}}>
            <Header>
                <Menu mode={"horizontal"} theme={"dark"}>
                    <Menu.Item>Home</Menu.Item>
                </Menu>
            </Header>

            <Content>
                <RouterProvider router={routes}></RouterProvider>
            </Content>
        </Layout>
    );
}

export default App;
