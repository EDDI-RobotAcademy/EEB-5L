import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const VTestWrapper = ({ eventBus }) => {
    const vueModuleRef = useRef<HTMLDivElement>(null);
    const isMountedRef = useRef(false);
    const unmountRef = useRef<(() => void) | null>(null);

    const location = useLocation()

    useEffect(() => {
        console.log('preparing mount vuetify test remotes app')

        if (!isMountedRef.current) {
            const loadRemoteComponent = async () => {
                const { vtestAppMount  } = await import("vtestApp/bootstrap");
                vtestAppMount(vueModuleRef.current, eventBus);
                isMountedRef.current = true;
            }

            loadRemoteComponent()
            console.log("Vuetify Test Remotes App ready: " + vueModuleRef)
        }

        return () => {
            eventBus.off('routing-event')
        };
    }, [])

    useEffect(() => {
        console.log('Vuetify Test 라우터 위치 바꿨어: ' + location.pathname)
        const handleNavigation = () => {
            console.log('handleNavigation()')
            if (location.pathname === "/vtest/list") {
                console.log('라우터 변경')
                eventBus.emit('vue-test-routing-event', '/')
            }
        };

        // 컴포넌트가 마운트될 때 호출되는 이벤트 핸들러 등록
        handleNavigation();
    }, [location]);

    return (
        <div>
            <div>
                <div style={{ position: 'relative' }} ref={vueModuleRef}/>
            </div>
        </div>
    )
};

export default VTestWrapper;
