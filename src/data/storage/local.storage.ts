import { Storage } from "./storage.interface";

export class LocalStorage<T extends {id: string}> implements Storage<T> {
    constructor(private prefix: string) { }
    
    public async listIds(): Promise<string[]> {
        const ids: string[] = [];

        const keyPrefix = `${this.prefix}:`;

        for(let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if(key && key.startsWith(keyPrefix)) {
                ids.push(key.substring(keyPrefix.length));
            }
        }

        return ids;

    }

    public async list(): Promise<T[]> {
        const ids = await this.listIds();

        return await Promise.all(ids.map(id => this.get(`${id}`)));
    }

    public async create(item: Omit<T, "id">): Promise<T> {
        const listOfIds = (await this.listIds());

        const currentDate = Date.now();
        let genId = (num: number) => `${currentDate}-${num}`;

        let currentNum = 0;
        let id: string | undefined;

        while(id === undefined || listOfIds.includes(id)) {
            id = genId(currentNum++);
        }

        const newItem: T = {
            ...item,
            id
        } as T;
        
        await this.store(newItem);

        return newItem;
    }

    public async store(item: T): Promise<void> {
        localStorage.setItem(`${this.prefix}:${item.id}`, JSON.stringify(item));
    }
    public async delete(id: string): Promise<void> {
        localStorage.removeItem(`${this.prefix}:${id}`);
    }
    public async get(id: string): Promise<T> {
        const item = localStorage.getItem(`${this.prefix}:${id}`);
        if(item) {
            return JSON.parse(item);
        } else {
            throw new Error("Item not found");
        }
    }
}
