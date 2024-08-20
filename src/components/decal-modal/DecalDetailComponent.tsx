import { ReactNode } from "react";

export interface DecalDetailComponentProps<T> extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    loading?: boolean;
    data: T | undefined;
    hasData?: boolean;
    loadingText?: string;
    noDataText?: string;
    renderChild: (arg0: T) => ReactNode;
}

export function DecalDetailComponent<T>(
    {
        title,
        loading,
        data,
        hasData,
        loadingText,
        noDataText,
        renderChild,

        className
    }: DecalDetailComponentProps<T>
) {

    hasData = hasData ?? true;
    loadingText = loadingText ?? "Loading...";

    const child =
        loading ?? false
            ? (<span className="text-neutral-500 text-sm">{loadingText}</span>)
            : !hasData || !data
                ? (<span className="text-neutral-500 text-sm">{noDataText}</span>)
                : renderChild(data);

    return (
        <div className={className}>
            <h1 className="text-white">
                {title}
            </h1>

            {child}
        </div>
    );

}