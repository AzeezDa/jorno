import { Store } from "tauri-plugin-store-api";

const CONFIGURATION_FILE_NAME: string = "configuration.dat"

export const configuration = new Store(CONFIGURATION_FILE_NAME);
