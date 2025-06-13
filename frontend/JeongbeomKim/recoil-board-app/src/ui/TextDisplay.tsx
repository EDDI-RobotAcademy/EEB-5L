import React from "react";
import { useRecoilState } from 'recoil'
import { textState } from "../atoms/textState.ts";

const TextDisplay = () => {
    const [text, setText] = useRecoilState(textState)

    return (
        <p className="text-lg font-medium text-blue-700">
           입력한 텍스트: <span className="font-semibold">{
               text || '사용자 입력 없음'
           }</span>
        </p>
    )
}

export default TextDisplay