import {WorkoutId} from "./workout.type";

export class WorkoutStorage {
    public async list(): Promise<WorkoutId[]> {
        const ids: string[] = [];

        for(let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if(key && key.startsWith("workout:")) {
                ids.push(key);
            }
        }

        return await Promise.all(ids.map(id => this.get(id)));
    }
    public async store(workout: WorkoutId): Promise<void> {
        localStorage.setItem(`workout:${workout.id}`, JSON.stringify(workout));
    }
    public async delete(id: string): Promise<void> {
        localStorage.removeItem(`workout:${id}`);
    }
    public async get(id: string): Promise<WorkoutId> {
        const item = localStorage.getItem(`workout:${id}`);
        if(item) {
            return JSON.parse(item);
        } else {
            throw new Error("Workout not found");
        }
    }
}

export const useWorkoutStorage = () => {
    return new WorkoutStorage();
};
