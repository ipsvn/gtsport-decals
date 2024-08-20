export const GTSPORT_TAGS_MAP: { [key: string]: string } = {
    "131": "Shapes",
    "132": "Lines",
    "133": "Patterns",
    "134": "Logos",
    "135": "Illustrations",
    "136": "Characters",
    "137": "Decals",
    "138": "Others",
    "141": "Can be Modified",
    "142": "Cannot be Modified",
    "143": "Can be Coloured",
    "144": "Cannot be Coloured",
};

export function filterTagParam(param: string): string[] {
    return param.split(",").filter(it => GTSPORT_TAGS_MAP[it]);
}