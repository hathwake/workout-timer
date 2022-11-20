import { LocalStorage } from "./local.storage";
import { ExerciseId } from "../workout.type";



export class ExerciseStorage extends LocalStorage<ExerciseId> {
    constructor() {
        super("v1:exercise");
    }
}

export const useExerciseStorage = () => {
    return new ExerciseStorage();
};
