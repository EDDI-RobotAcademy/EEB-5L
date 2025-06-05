export const ArrayPushExample = () => {
    let numbers: number[]=[1,2,3]
    let updateNumbers=[...numbers]
    updateNumbers.push(4)

    let steps=[
        `초개 배열: [${numbers.join(", ")}]`,
        `4 추가 후: [${updateNumbers.join(", ")}]`
    ]
    return (
        <div className="bg-gray-100 p-5 my-4 rounded-md border-2 border-blue-500 font-bold text-left">
            <h3>배열 push() 사용법</h3>
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
                    numbers.push(4);
                `}
            </pre>
        </div>
    )
}