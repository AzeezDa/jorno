import autosize from "autosize";
import type { Action } from "svelte/action";

export const auto_resize: Action = (node) => {
    autosize(node);

    return {
        destroy() {
            autosize.destroy(node);
        },
    };
};