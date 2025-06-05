export const ArrayUnShiftExample = () => {
    let numbers: number[]=[2,3,4]
    let updateNumbers=[...numbers]
    updateNumbers.unshift(1)

    let steps=[
        `초개 배열: [${numbers.join(", ")}]`,
        `1 추가 후 배열: [${updateNumbers.join(", ")}]`,
    ]
    return (
        <div className="bg-gray-100 p-5 my-4 rounded-md border-2 border-blue-500 font-bold text-left">
            <h3>배열 unshift() 사용법</h3>
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
                    numbers.unshift();
                `}
            </pre>
        </div>
    )
}