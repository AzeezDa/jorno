import autosize from "autosize";

export function auto_resize(event: Event) {
    autosize(event.target as Element)
}