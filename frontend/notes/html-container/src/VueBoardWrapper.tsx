import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const VueBoardAppWrapper = ({ eventBus }: { eventBus: any }) => {
    const vueModuleRef = useRef<HTMLDivElement>(null);
    const isMountedRef = useRef(false);
    const unmountRef = useRef<(() => void) | null>(null);

    const location = useLocation();

    useEffect(() => {
        const mountVueApp = async () => {
            const { vueBoardAppMount, vueBoardAppUnmount } = await import("vueBoardApp/bootstrap");

            if (vueModuleRef.current && !isMountedRef.current) {
                // Mount Vue app
                vueBoardAppMount(vueModuleRef.current, eventBus);
                isMountedRef.current = true;

                // Save unmount
                unmountRef.current = () => {
                    vueBoardAppUnmount?.(vueModuleRef.current!);
                    isMountedRef.current = false;
                };

                // 💡 강제로 body, html overflow 제거
                const iframeDoc = document;
                iframeDoc.body.style.overflow = "hidden";
                iframeDoc.documentElement.style.overflow = "hidden";
                iframeDoc.body.style.margin = "0";
                iframeDoc.body.style.padding = "0";
            }
        };

        mountVueApp();

        return () => {
            if (unmountRef.current) {
                unmountRef.current();
                unmountRef.current = null;
            }
            eventBus.off("routing-event");
        };
    }, []);

    useEffect(() => {
        if (location.pathname === "/vue-board/list") {
            eventBus.emit("vue-board-routing-event", "/");
        }
    }, [location]);

    return (
        <div
            id="vue-wrapper"
            ref={vueModuleRef}
            style={{
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
                margin: 0,
                padding: 0,
            }}
        />
    );
};

export default VueBoardAppWrapper;
