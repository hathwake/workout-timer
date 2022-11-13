import { Storage } from "./storage.interface";

export class LocalStorage<T extends {id: string}> implements Storage<T> {
    constructor(private prefix: string) { }
    
    public async list(): Promise<T[]> {
        const ids: string[] = [];

        for(let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if(key && key.startsWith(`${this.prefix}:`)) {
                ids.push(key);
            }
        }

        return await Promise.all(ids.map(id => this.get(id)));
    }
    public async store(workout: T): Promise<void> {
        localStorage.setItem(`${this.prefix}:${workout.id}`, JSON.stringify(workout));
    }
    public async delete(id: string): Promise<void> {
        localStorage.removeItem(`${this.prefix}:${id}`);
    }
    public async get(id: string): Promise<T> {
        const item = localStorage.getItem(`${this.prefix}:${id}`);
        if(item) {
            return JSON.parse(item);
        } else {
            throw new Error("Workout not found");
        }
    }
}
