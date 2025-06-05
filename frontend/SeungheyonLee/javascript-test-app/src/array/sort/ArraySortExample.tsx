export const ArraySortExample = () => {
    let numbers: number[]=[3,1,4,1,5,9,7]
    // ✅ [...numbers] : 전개 연산자를 통해 원본 배열을 복사 (원본 유지)
    // ✅ .sort((a, b) => a - b) : 오름차순 정렬
    // → a - b가 음수면 a가 b보다 앞에 온다 → 즉, 작은 수부터 정렬됨
    let sorted = [...numbers].sort((a, b) => a - b);// 결과: [1, 1, 3, 4, 5, 7, 9]

    // ✅ [...numbers] : 다시 원본 배열을 복사 (위에서 sorted가 배열을 바꿨기 때문에 새로 복사해야 함)
    // ✅ .sort((a, b) => b - a) : 내림차순 정렬
    // → b - a가 음수면 b가 a보다 앞에 온다 → 즉, 큰 수부터 정렬됨
    let sortedReversed = [...numbers].sort((a, b) => b - a);// 결과: [9, 7, 5, 4, 3, 1, 1]
    let steps=[
        `초개 배열: [${numbers.join(", ")}]`,
        `sort((a,b)=> a-b): [${sorted.join(", ")}]`,
        `sort((a,b)=> b-a) [${sortedReversed.join(", ")}]`
    ]
    return (
        <div className="bg-gray-100 p-5 my-4 rounded-md border-2 border-blue-500 font-bold text-left">
            <h3>배열 sort((a,b)=&gt; 정렬 순서)사용법</h3>
            <p>a - b = 작은 수 =&gt; 큰 수</p>
            <p>b - a = 큰 수 =&gt; 작은 수</p>
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
                    let sorted=[...numbers].sort((a,b)=> a-b)
                    let sortedReversed=[...numbers].sort((a,b)=> b-a)
                `}
            </pre>
        </div>
    )
}