import { LocalStorage } from "./local.storage";



export class SettingsStorage extends LocalStorage<{id: string, value: string}> {
    keys = {
        theme: "THEME",
    };
    
    constructor() {
        super("v1:settings");
    }
}