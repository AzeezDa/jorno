import { goto } from "$app/navigation";
import { open, save } from "@tauri-apps/api/dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import moment from "moment";

const DATETIME_LOCAL_FORMATTING = "YYYY-MM-DD[T]HH:mm";
export const JORNO_FILE_FILTERS = [
    {
        name: "Jorno File",
        extensions: ["jorno"],
        multiple: false
    }
]

export interface Section {
    id: number
    type: string
    data: any
}

export type Jorno = {
    name: string
    date: string
    sections: Array<Section>
}

export function new_jorno(name: string): Jorno {
    let date = moment().format(DATETIME_LOCAL_FORMATTING);

    return {
        name: name,
        date: date,
        sections: [],
    }
}

export async function save_jorno(jorno: Jorno): Promise<string | null> {
    const filePath = await save({ filters: JORNO_FILE_FILTERS });

    if (filePath != null) {
        await writeTextFile(filePath, JSON.stringify(jorno));
    }
    return filePath;
}

export async function open_jorno(filePath: string): Promise<Jorno | null> {
    const read = await readTextFile(filePath)
    try {
        return JSON.parse(read);
    } catch (error) {
        return null;
    }
}