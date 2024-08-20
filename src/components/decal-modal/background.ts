export type Backgrounds = "gray" | "white" | "black";
export const nextBackground: Record<Backgrounds, Backgrounds> = {
    "gray": "white",
    "white": "black",
    "black": "gray"
};
export type BackgroundProperties = {
    borderColor: string,
    backgroundClasses: string,
    contrastColor: "white" | "black"
};

export const backgrounds: { [key in Backgrounds]: BackgroundProperties } = {
    "gray": {
        borderColor: "black",
        backgroundClasses: "bg-light-gray",
        contrastColor: "black"
    },
    "white": {
        borderColor: "black",
        backgroundClasses: "bg-white",
        contrastColor: "black"
    },
    "black": {
        borderColor: "white",
        backgroundClasses: "bg-black",
        contrastColor: "white"
    },
}
