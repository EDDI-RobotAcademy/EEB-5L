export const ArrayIndexOfExample = () => {
    let numbers: number[]=[10,20,30]
    let strings: string[]=['hello','world','good','bye'];
    let hasValue=numbers.indexOf(20)
    let hasValue2=strings.indexOf('world')
    let steps=[
        `초개 배열: [${numbers.join(", ")}]`,
        `includes(20): [${hasValue}]`,
        `includes(word) [${hasValue2}]`
    ]
    return (
        <div className="bg-gray-100 p-5 my-4 rounded-md border-2 border-blue-500 font-bold text-left">
            <h3>배열 indexOf(값) 사용법</h3>
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
                    let numbers: number[]=[10,20,30]
                    let strings: string[]=['hello','world','good','bye'];
                    let hasValue=numbers.includes(20)
                    let hasValue2=strings.includes('world')
                `}
            </pre>
        </div>
    )
}