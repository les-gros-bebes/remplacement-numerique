// src/utils/useImagePreload.ts
import { useEffect, useState } from "react";

export default function useImagePreload(urls: string[]): boolean {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!urls || urls.length === 0) {
            setLoaded(true);
            return;
        }

        let isCancelled = false;
        let loadedCount = 0;

        urls.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = img.onerror = () => {
                loadedCount++;
                if (!isCancelled && loadedCount === urls.length) {
                    setLoaded(true);
                }
            };
        });

        return () => {
            isCancelled = true;
        };
    }, [JSON.stringify(urls)]);

    return loaded;
}
