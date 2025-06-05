export const ArrayFlatExample = () => {
    let nestedArray=[[1,2],[3,4]]
    let flattened=nestedArray.flat()
    let steps=[
        `초개 배열: [${nestedArray.map(
            arr=>`[${arr.join(", ")}]`).join(", ")}]`,
        `flat 결과: [${flattened.join(", ")}]`

    ]
    return (
        <div className="bg-gray-100 p-5 my-4 rounded-md border-2 border-blue-500 font-bold text-left">
            <h3>다중 배열(행렬,텐서) flat() 사용법</h3>

            <ul>
                {steps.map((step,index)=>(
                    <li key={index}>
                        {step}
                    </li>
                ))}
            </ul>
            <pre>
                {`
                    let numbers: number[]=[11,22,33,44,55]
                    let isItEven=numbers.every(number=>number%2==0)
                
                    let numbers2:number[]=[10,20,30,40,50]
                    let isItEven2=numbers2.every(number=>number%2==0)
                
                    let strings:string[]=['hello', 'world','good','bye']
                    let isItEven3=strings.every(str=>str.includes('world'))
                `}
            </pre>
        </div>
    )
}