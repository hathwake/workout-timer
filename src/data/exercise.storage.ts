import { LocalStorage } from "./local.storage";
import { ExerciseId } from "./workout.type";



export class ExerciseStorage extends LocalStorage<ExerciseId> {
    constructor() {
        super("workout");
    }
}

export const useExerciseStorage = () => {
    return new ExerciseStorage();
};
