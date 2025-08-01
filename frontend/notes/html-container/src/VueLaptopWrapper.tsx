import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {vueLaptopAppMount} from "laptop-app/src/bootstrap.tsx";

const VueLaptopAppWrapper = ({ eventBus }: { eventBus: any }) => {
    const vueModuleRef = useRef<HTMLDivElement>(null);
    const isMountedRef = useRef(false);
    const unmountRef = useRef<(() => void) | null>(null);

    const location = useLocation();

    useEffect(() => {
        const mountVueApp = async () => {
            const { vueLaptopAppMount, vueLaptopAppUnmount } = await import("laptopApp/bootstrap");

            if (vueModuleRef.current && !isMountedRef.current) {
                vueLaptopAppMount(vueModuleRef.current, eventBus);
                isMountedRef.current = true;

                unmountRef.current = () => {
                    vueLaptopAppUnmount?.(vueModuleRef.current!);
                    isMountedRef.current = false;
                };

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
        if (location.pathname === "/laptop/list") {
            eventBus.emit("laptop-routing-event", "/");
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

export default VueLaptopAppWrapper;
