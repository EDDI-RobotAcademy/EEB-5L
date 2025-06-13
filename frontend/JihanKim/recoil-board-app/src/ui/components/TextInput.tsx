import React from "react";
import { useRecoilState } from 'recoil'
import { textState } from "../../atoms/textState.ts";

const TextInput = () => {
    const [text, setText] = useRecoilState(textState)

    return (
        <div className="mb-4">
            <input
                type="text"
                value={ text }
                onChange={ (event) => setText(event.target.value) }
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
                            focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="텍스트를 입력하세요"
            />
        </div>
    )
}

export default TextInput