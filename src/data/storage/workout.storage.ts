import { LocalStorage } from "./local.storage";
import {WorkoutId} from "../workout.type";

export class WorkoutStorage extends LocalStorage<WorkoutId> {
    constructor() {
        super("v1:workout");
    }
}
