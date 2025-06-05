export const ArrayReverseExample = () => {
    let numbers: number[]=[3,1,4,1,5,9,7]
    let sortedReversed=[...numbers].reverse()
    let steps=[
        `초개 배열: [${numbers.join(", ")}]`,
        `reverse() 결과: [${sortedReversed.join(", ")}]`
    ]
    return (
        <div className="bg-gray-100 p-5 my-4 rounded-md border-2 border-blue-500 font-bold text-left">
            <h3>배열 reverse() 사용법</h3>

            <ul>
                {steps.map((step,index)=>(
                    <li key={index}>
                        {step}
                    </li>
                ))}
            </ul>
            <pre>
                {`
                    let numbers: number[]=[3,1,4,1,5,9,7]
                    let sortedReversed=[...numbers].reverse()
                `}
            </pre>
        </div>
    )
}