export const ArraySliceExample = () => {
// numbers 배열 선언: 숫자 3개가 들어있는 배열
    let numbers: number[] = [10, 20, 30,40,50];

// ✅ slice(start, end): 원본 배열에서 [start]부터 [end - 1]까지 잘라냄 (원본 변경 ❌)
// => index 1 ~ 3 (3은 범위를 벗어나니까 결국 index 1~2까지)
    let sliced = numbers.slice(1, 4);
// 결과: [20, 30]  ← numbers[1], numbers[2]

// ✅ 원본 배열을 복사 (shallow copy)
// => ...numbers를 통해 [10, 20, 30]을 새 배열로 복사
    let spliced = [...numbers];

// ✅ splice(startIndex, deleteCount, itemToInsert): 원본을 직접 수정! (❗주의❗)
// => index 2 (세 번째 요소 = 30)를 1개 삭제하고, 그 자리에 99를 삽입
    spliced.splice(2, 1, 99);
// 결과: [10, 20, 99] ← 원래 30 자리에 99가 들어감

// ✅ 결과 흐름을 설명하는 steps 배열 생성
    let steps = [`초개 배열: [${numbers.join(", ")}]`,            // [10, 20, 30]
        `numbers.slice(1,4): [${sliced.join(", ")}]`,    // [20, 30]
        `spliced.splice(2,1,99) [${spliced.join(", ")}]` // [10, 20, 99]
    ];

    return (<div className="bg-gray-100 p-5 my-4 rounded-md border-2 border-blue-500 font-bold text-left">
            <h3>배열 indexOf(값) 사용법</h3>
            <p>결과:</p>
            <ul>
                {steps.map((step, index) => (<li key={index}>
                        {step}
                    </li>))}
            </ul>
            <pre>
                {`

                    let numbers: number[]=[10,20,30]
                    let sliced=numbers.slice(1,4)
                    let spliced=[...numbers]
                    spliced.splice(2,1,99)
                `}
            </pre>
        </div>)
}