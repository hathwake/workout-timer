

export interface Exercise {
    type: "ex"
    length: number;
    pause?: number;
}

export interface Repetition {
    type: "rep"
    exercises: Exercise[];
    pause?: number;
}

export interface Workout {
    id: string;
    plan: (Exercise | Repetition)[]
}
