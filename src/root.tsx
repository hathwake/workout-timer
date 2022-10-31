import React from 'react';
import './root.css';
import { RouterProvider } from "react-router-dom";
import { routes } from './routes';

const Root: React.FC<{}> = () => {
    return <RouterProvider router={routes}></RouterProvider>
}

export default Root;
