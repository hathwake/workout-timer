

export interface ExerciseId extends Exercise {
    id: string;
}

export interface Exercise {
    type: "ex"
    name: string;
    duration: number;
    pause?: number;
}

export interface Repetition {
    type: "rep"
    exercises: Exercise[];
    pause?: number;
}

export interface Workout {
    name: string;
    plan: (Exercise | Repetition)[]
}

export interface WorkoutId extends Workout {
    id: string;
}