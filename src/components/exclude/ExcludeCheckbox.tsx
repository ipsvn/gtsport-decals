import { Checkbox } from "@mui/material";

export type ExcludeCheckboxState = "neutral" | "required" | "excluded";
export const nextCheckboxState: Record<ExcludeCheckboxState, ExcludeCheckboxState> = {
    neutral: "required",
    required: "excluded",
    excluded: "neutral",
};

export interface ExcludeCheckboxProps {
    className?: string;
    state: ExcludeCheckboxState;
}

export function ExcludeCheckbox(
    {
        className,
        state
    }: ExcludeCheckboxProps
) {

    return (
        <Checkbox
            className={className}
            checked={state == "required"}
            indeterminate={state == "excluded"}
        />
    );

}
