export const ArrayShiftExample = () => {
    let numbers: number[]=[1,2,3]
    let updateNumbers=[...numbers]
    let removeNumbers=updateNumbers.shift()

    let steps=[
        `초개 배열: [${numbers.join(", ")}]`,
        `마지막 요소 제거: [${updateNumbers.join(", ")}]`,
        `제거된 요소: [${removeNumbers}]`
    ]
    return (
        <div className="bg-gray-100 p-5 my-4 rounded-md border-2 border-blue-500 font-bold text-left">
            <h3>배열 shift() 사용법</h3>
            <p>shift()를 사용하면 선입선출하는 Queue와 유사해짐.</p>
            <p>결과:</p>
            <ul>
                {steps.map((step,index)=>(
                    <li key={index}>
                        {step}
                    </li>
                ))}
            </ul>
            <pre>
                {`
                    numbers.shift();
                `}
            </pre>
        </div>
    )
}