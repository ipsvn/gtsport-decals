'use client'

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function InfiniteScrollHelper(
    { onceInView }: { onceInView: () => void }
) {
    const [ref, inView] = useInView();
    useEffect(() => {
        if (inView) {
            onceInView();
        }
    }, [inView]);
    return <div ref={ref} />;
}