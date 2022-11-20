
export interface Storage<T> {
    list(): Promise<T[]>;
    store(workout: T): Promise<void>;
    delete(id: string): Promise<void>;
    get(id: string): Promise<T>;
}
