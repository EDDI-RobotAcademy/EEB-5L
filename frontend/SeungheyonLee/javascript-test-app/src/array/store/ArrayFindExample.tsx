export const ArrayFindExample = () => {
    let numbers: number[]=[10,20,30,40]
    let foundNumber=numbers.find(num=>num>25)

    let steps=[
        `초개 배열: [${numbers.join(", ")}]`,
        `found 요소: [${foundNumber}]`
    ]
    return (
        <div className="bg-gray-100 p-5 my-4 rounded-md border-2 border-blue-500 font-bold text-left">
            <h3>배열 find 조건 사용법</h3>
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
                     let numbers: number[]=[10,20,30,40]
                     let foundNumber=numbers.find(num=>num>25)

                `}
            </pre>
        </div>
    )
}