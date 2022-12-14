import React from "react";
import { HomePage, HomeLoaderData } from "./pages/home.page";
import { createHashRouter, Navigate } from "react-router-dom";
import { WorkoutStorage } from "./data/storage/workout.storage";
import { NotFoundPage } from "./pages/not-found.page";
import { AddWorkoutPage } from "./pages/add-workout.page";
import { AppMainLayout } from "./pages/main-layout.page";
import { TimerPageData, TimerPage } from "./pages/timer.page";
import { EditWorkoutPage, EditWorkoutPageData } from "./pages/edit-workout.page";

export const routes = createHashRouter([
    {
        path: "/",
        element: <AppMainLayout />,
        children: [
            {
                path: "/home",
                element: <HomePage />,
                loader: async (routes): Promise<HomeLoaderData> => {
                    const workoutStorage = new WorkoutStorage();

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
                path: "/workouts/edit/:id",
                element: <EditWorkoutPage />,
                loader: async ({params}): Promise<EditWorkoutPageData> => {
                    const workoutStorage = new WorkoutStorage();

                    const id = params.id;

                    if(!id) {
                        throw new Error("Need workout id");
                    } else {
                        return {
                            workout: await workoutStorage.get(id),
                        };
                    }
                }
            },
            {
                path: "/timer/:id",
                element: <TimerPage />,
                loader: async ({params}): Promise<TimerPageData> => {
                    const workoutStorage = new WorkoutStorage();

                    const id = params.id;

                    if(!id) {
                        throw new Error("Need workout id");
                    } else {
                        let workout = await workoutStorage.get(id);
                        workout.lastOpened = Date.now();

                        await workoutStorage.store(workout);

                        const countdown_step = await (await fetch("assets/countdown_step.mp3")).arrayBuffer();
                        const countdown_finished = await (await fetch("assets/countdown_finished.mp3")).arrayBuffer();
                        
                        return {
                            workout,
                            sounds: {
                                countdown_step,
                                countdown_finished,
                            }
                        };
                    }
                }
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
], {
    // basename: "/workout-timer/"
});
