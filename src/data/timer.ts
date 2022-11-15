import { Exercise, Workout } from "./workout.type";

export type TimerStep = {
    name: string;
    begin: number;
    length: number;
}

const buildExerciseSteps = (begin: number, exercise: Exercise): TimerStep[] => {
    const steps = [
        {
            begin,
            length: exercise.duration,
            name: exercise.name
        }
    ];
    console.log();
    if(exercise.pause) {
        steps.push({
            begin: begin + exercise.duration * 1000,
            length: exercise.pause,
            name: "Pause"
        });
    }

    return steps;
};

const buildList = (begin: number, list: Workout["plan"]): TimerStep[] => {
    const steps: TimerStep[] = [];

    list.forEach((item, index) => {
        console.log(begin);
        let itemSteps: TimerStep[] = [];

        if(item.type === "ex") {
            itemSteps = buildExerciseSteps(begin, item);
        }

        if(itemSteps.length > 0) {
            itemSteps.forEach(step => begin += step.length);

            steps.push(...itemSteps);
        }
    });

    return steps;
};

const buildSteps = (workout: Workout): TimerStep[] => {
    const steps: TimerStep[] = buildList(0, workout.plan);

    return steps;
};


export class Timer {
    steps: TimerStep[] = [];
    length = 0;

    startTime = Date.now();

    currentElapsedTime = 0;
    currentStep: TimerStep | undefined;

    paused = false;
    finished = false;

    constructor(workout: Workout) {
        this.steps = buildSteps(workout);

        console.log(this.steps);

        this.tick(Date.now());
    }
    reset(): void {
        this.startTime = Date.now();
        this.currentElapsedTime = 0;
        this.paused = false;
        this.finished = false;

        this.tick(Date.now());
    }

    pause(): void {
        this.paused = true;
    }

    unpause(): void {
        this.startTime = Date.now() - this.currentElapsedTime;
        this.paused = false;
        this.tick(Date.now());
    }

    tick(currentTime: number) {
        if (this.paused || this.finished) {
            return;
        }

        this.currentElapsedTime = currentTime - this.startTime;

        this.currentStep = this.steps.find(step => {
            return this.currentElapsedTime >= step.begin && this.currentElapsedTime < step.begin + step.length;
        });

        if (this.currentStep === undefined) {
            this.finished = true;
        } else {
            this.finished = false;
        }
    }
}
