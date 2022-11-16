import { Exercise, Workout } from "./workout.type";

export type TimerStep = {
    name: string;
    begin: number;
    duration: number;
    isPause?: boolean;
}

const buildExerciseSteps = (begin: number, exercise: Exercise): TimerStep[] => {
    const steps: TimerStep[] = [
        {
            begin,
            duration: exercise.duration * 1000,
            name: exercise.name
        }
    ];
    
    if(exercise.pause) {
        steps.push({
            begin: begin + exercise.duration * 1000,
            duration: exercise.pause * 1000,
            name: "Rest",
            isPause: true,
        });
    }

    return steps;
};

const buildList = (begin: number, list: Workout["plan"]): TimerStep[] => {
    const steps: TimerStep[] = [];

    list.forEach((item, index) => {
        let itemSteps: TimerStep[] = [];

        if(item.type === "ex") {
            itemSteps = buildExerciseSteps(begin, item);
        }

        if(itemSteps.length > 0) {
            itemSteps.forEach(step => begin += step.duration);

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
    duration = 0;

    startTime = Date.now();

    currentElapsedTime = 0;
    currentStep: TimerStep | undefined;

    paused = true;
    finished = false;

    currentAnimationFrame: any = undefined;

    private updateListeners = new Set<VoidFunction>();

    constructor(workout: Workout) {
        this.steps = buildSteps(workout);
        this.currentStep = this.steps[0];
        this.duration = this.steps.reduce((prev, curr) => prev + curr.duration, 0);

        this.tick();
    }
    reset(): void {
        this.paused = true;
        this.setCurrentElapsedTime(0);

        this.pause();
    }

    private startTimer(): void {
        this.setCurrentElapsedTime(this.currentElapsedTime);
        this.paused = false;

        if(!this.currentAnimationFrame) {
            this.currentAnimationFrame = requestAnimationFrame(() => {
                this.currentAnimationFrame = undefined;
                this.tick();
                this.startTimer();
            });
        }
    }

    private stopTimer(): void {
        this.paused = true;

        cancelAnimationFrame(this.currentAnimationFrame);
        this.currentAnimationFrame = undefined;
    }

    togglePause(): void {
        if(!this.paused) {
            this.pause();
        } else {
            this.start();
        }
    }

    pause(): void {
        this.stopTimer();

        this.emitUpdate();
    }

    start(): void {
        this.startTimer();

        this.emitUpdate();
    }

    skipCurrentStep(): void {
        if(this.currentStep) {
            this.setCurrentElapsedTime(this.currentStep.begin + this.currentStep.duration);
        }
    }

    resetCurrentStep(): void {
        if(this.currentStep) {
            this.setCurrentElapsedTime(this.currentStep.begin);
        }
    }

    goBack(): void {
        if(this.currentStep) {
            const index = this.steps.indexOf(this.currentStep);
            if(index > 0) {
                this.currentStep = this.steps[index - 1];
                this.setCurrentElapsedTime(this.currentStep.begin);
            } else {
                this.resetCurrentStep();
            }
        }
    }

    private tick(currentTime: number = Date.now()) {
        try {
            if(!this.paused && this.currentElapsedTime < this.duration) {
                this.currentElapsedTime = currentTime - this.startTime;
            }
    
            const nextStep = this.steps.find(step => {
                return this.currentElapsedTime >= step.begin && this.currentElapsedTime < step.begin + step.duration;
            });
    
            if (nextStep === undefined) {
                this.finished = true;
            } else {
                this.finished = false;
                this.currentStep = nextStep;
            }
        } finally {
            this.emitUpdate();
        }
    }

    setCurrentElapsedTime(elapsed: number): void {
        this.currentElapsedTime = elapsed;
        this.startTime = Date.now() - elapsed;
        this.tick();
    }

    private emitUpdate(): void {
        for(const func of this.updateListeners) {
            func();
        }
    }

    onUpdate(func: VoidFunction): {unsubscribe: VoidFunction} {
        this.updateListeners.add(func);
        
        func();

        return {
            unsubscribe: () => this.updateListeners.delete(func)
        };
    }

    getNumberOfSteps(): number {
        return this.steps.length;
    }

    getNumberOfCurrentStep(): number {
        return this.currentStep ? this.steps.indexOf(this.currentStep) : -1;
    }
}
