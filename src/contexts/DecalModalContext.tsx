"use client";

import { DecalExcludingTags, FullDecal } from '@/utils/data-utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';

export type DecalType = FullDecal | DecalExcludingTags | undefined;

export type DecalModalContextValue = {
    decal: DecalType,
    setDecal: Dispatch<SetStateAction<DecalType>>
};

export const DecalModalContext = createContext<DecalModalContextValue | undefined>(undefined);

export const DecalModalProvider = ({ decal, children }: { decal: DecalType, children: ReactNode }) => {

    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [decalState, setDecalState] = useState(decal);

    useEffect(() => {

        const params = new URLSearchParams(searchParams);
        if (decalState) {
            params.set('decal', decalState.id.toString());
        } else {
            params.delete('decal');
        }
        history.pushState(null, '', `${pathname}?${params.toString()}`);

    }, [decalState, pathname, searchParams]);

    return (
        <DecalModalContext.Provider value={{ decal: decalState, setDecal: setDecalState }}>
            {children}
        </DecalModalContext.Provider>
    );
};

export const useDecalModal = () => useContext(DecalModalContext);