import {useState,useEffect,useRef} from 'react';

export function useToneEffect(effect,deps){

    const ref = useRef();

    useEffect(() => {
        ref.current = effect();
        return () => {
            ref.current.dispose();
        }
    }, deps);

    return ref.current;
}