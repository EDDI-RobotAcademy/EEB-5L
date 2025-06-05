export const Number3 = () => {
    const randomList = new Array(20)
    const resultList = new Array(5).fill(0)
    for (let i = 0; i < 20; i++) {
        randomList.push(Math.floor(Math.random() * (5 - 1 + 1)) + 1)
    }
    for(let random of randomList){
        for(let i=0;i<5;i++){
            if(random==(i+1)){
                resultList[i]+=1
            }
        }
    }
    const randomList2 = new Array(20)
    for (let i = 0; i < 20; i++) {
        randomList2.push(Math.floor(Math.random() * (5 - 1 + 1)) + 1)
    }
    // acc는 누적값인 resultList 역할
    // num은 현재 순회 중인 randomList의 값
    let resultList2 =randomList2.reduce((acc,num)=> {
        if(num>=1&&num<=5){// num이 1~5 범위에 있을 때만 처리
            acc[num-1]++
        }
        return acc;// 다음 순회로 누적 결과를 넘겨줌
    },[0,0,0,0,0]);// 초기값: 0으로 채워진 배열

    let steps = [
        `random값 reduce결과: [${resultList.join(", ")}]`
    ]
    let steps2 = [
        `random값 reduce결과2: [${resultList2.join(", ")}]`
    ]
    return (
        <div className="bg-gray-100 p-5 my-4 rounded-md border-2 border-blue-500 font-bold text-left">
            <h3>Queue 예제</h3>
            <p>결과:</p>
            <ul>
                {steps.map((step, index) => (
                    <li key={index}>
                        {step}
                    </li>
                ))}
            </ul>
            <pre>
                {`
                    const randomList = new Array(20)
                    const resultList = new Array(5).fill(0)
                    for (let i = 0; i < 20; i++) {
                        randomList.push(Math.floor(Math.random() * (5 - 1 + 1)) + 1)
                    }
                    for(let random of randomList){
                        for(let i=0;i<5;i++){
                            if(random==(i+1)){
                                resultList[i]+=1
                            }
                        }
                    }
                `}
            </pre>
            <ul>
                {steps2.map((step, index) => (
                    <li key={index}>
                        {step}
                    </li>
                ))}
            </ul>
            <pre>
                {`
                    let resultList2=[0,0,0,0,0]
                    resultList2 =randomList2.reduce((acc,num)=> {
                        // acc는 누적값인 resultList 역할
                        // num은 현재 순회 중인 randomList의 값
                        if(num>=1&&num<=5){
                            // num이 1~5 범위에 있을 때만 처리
                            acc[num-1]++
                        }
                        return acc;
                    },[0,0,0,0,0]);
                `}
            </pre>
        </div>
    )
}
