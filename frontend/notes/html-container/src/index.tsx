import("./App")

const observerErrHandler = (e: ErrorEvent) => {
    if (e.message.includes('ResizeObserver loop completed with undelivered notifications')) {
        e.stopImmediatePropagation();
    }
};

window.addEventListener('error', observerErrHandler, true);