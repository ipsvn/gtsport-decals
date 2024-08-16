"use client";

import { FullDecal } from '@/utils/data-utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';

export type DecalModalContextValue = {
    decal: FullDecal | undefined,
    setDecal: Dispatch<SetStateAction<FullDecal | undefined>>
};

export const DecalModalContext = createContext<DecalModalContextValue | undefined>(undefined);

export const DecalModalProvider = ({ decal, children }: { decal: FullDecal | undefined, children: ReactNode }) => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [decalState, setDecalState] = useState(decal);

    useEffect(() => {

        const params = new URLSearchParams(searchParams);
        if (decalState) {
            params.set('decal', decalState.id.toString());
        } else {
            params.delete('decal');
        }
        // replace(`${pathname}?${params.toString()}`);
        history.pushState(null, '', `${pathname}?${params.toString()}`);

    }, [decalState]);

    return (
        <DecalModalContext.Provider value={{ decal: decalState, setDecal: setDecalState }}>
            {children}
        </DecalModalContext.Provider>
    );
};

export const useDecalModal = () => useContext(DecalModalContext);