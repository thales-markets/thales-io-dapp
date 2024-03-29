import { useState, useEffect, DependencyList, useCallback } from 'react';
import debounce from 'lodash/debounce';

// source: https://github.com/SevenOutman/use-debounced-memo
function useDebouncedMemo<T>(factory: () => T, deps: DependencyList | undefined, debounceMs: number): T {
    const [state, setState] = useState(factory());

    // eslint-disable-next-line
    const debouncedSetState = useCallback(debounce(setState, debounceMs), []);

    useEffect(() => {
        debouncedSetState(factory());
        // eslint-disable-next-line
    }, deps);

    return state;
}

export default useDebouncedMemo;
