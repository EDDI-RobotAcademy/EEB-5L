import { atom } from "recoil";

export const screenModState = atom<boolean>({
    key: "screenModState",
    default: false,
    effects_UNSTABLE: [
        ({ setSelf, onSet }) => {
            const savedValue = localStorage.getItem("dark-mode");
            if (savedValue !== null) {
                setSelf(savedValue === "true"); // 문자열이므로 변환 필요
            }

            onSet((newValue) => {
                localStorage.setItem("dark-mode", String(newValue));
            });
        },
    ],
    });