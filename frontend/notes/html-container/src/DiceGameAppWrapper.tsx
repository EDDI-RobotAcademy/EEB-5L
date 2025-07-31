import React, { useEffect, useRef } from "react";

const DiceGameAppWrapper: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let app: any;

        import("diceGameApp/App") // ✅ MFE로 불러온 Svelte 앱
            .then((mod) => {
                const SvelteApp = mod.default;

                if (containerRef.current) {
                    app = new SvelteApp({
                        target: containerRef.current,
                    });
                }
            })
            .catch((err) => {
                console.error("❌ Failed to mount diceGameApp via Module Federation:", err);
            });

        return () => {
            if (app) app.$destroy();
        };
    }, []);

    // return <div ref={containerRef} />;

    return (
        <div style={{ height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
            <div ref={containerRef} style={{ height: '100%' }} />
        </div>
    )
};

export default DiceGameAppWrapper;
