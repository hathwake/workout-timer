import React from "react";
import { HomePage, HomeLoaderData } from "./pages/home.page";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { useWorkoutStorage } from "./data/workout.storage";
import { NotFoundPage } from "./pages/not-found.page";
import { AddWorkoutPage } from "./pages/add-workout.page";
import { AppMainLayout } from "./pages/main-layout.page";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <AppMainLayout />,
        children: [
            {
                path: "/home",
                element: <HomePage />,
                loader: async (routes): Promise<HomeLoaderData> => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const workoutStorage = useWorkoutStorage();

                    return {
                        workouts: await workoutStorage.list()
                    };
                }
            },
            {
                path: "/workouts/new",
                element: <AddWorkoutPage />,
            },
            {
                path: "/",
                element: <Navigate to={"/home"}></Navigate>
            },
            {
                path: "/*",
                element: <NotFoundPage />
            }
        ]
    }
]);
