export const ArrayReduceExample = () => {
    let numbers: number[]=[1,2,3,4]
    let sum=numbers.reduce((acc,num)=>acc+num,0)

    let steps=[
        `초개 배열: [${numbers.join(", ")}]`,
        `reduce 이후 배열: [${numbers.join(", ")}]`,
    ]
    return (
        <div className="bg-gray-100 p-5 my-4 rounded-md border-2 border-blue-500 font-bold text-left">
            <h3>배열 reduce() 사용법</h3>
            <p>sum: {sum}</p>
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
                        let numbers: number[]=[1,2,3,4]
                        let sum=numbers.reduce((acc,num)=>acc+num,0)
                        
                        Intellij 기준 reduce()에 커서를 가져다 놓고
                        ctrl+B를 누르면 reduce()의 상세정보로 갈 수 있습니다.
                        사실상 구조가 아래와 같은 구조를 가지고 있습니다.
                        
                        array.reudce((accmulator,currentValue,currentIndex,array)=>{
                            //여기에서 뭔가 더 해도 됨
                        },initialValue)
    
                        1. acc=0, num=1,    acc= acc+num=1
                        2. acc=1, num=2,    acc= acc+num=3
                        3. acc=3, num=3,    acc= acc+num=6
                        4. acc=6, num=4,    acc= acc+num=10
                `}
            </pre>
        </div>
    )
}