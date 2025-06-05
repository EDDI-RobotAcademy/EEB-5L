export const Number1 = () => {
    let queue: number[] = new Array(10)
    const LoopMax=10
    const LoopMin=1
    const LoopNum=Math.floor(Math.random()*LoopMax-LoopMin+1)+LoopMin
    for(let i=0;i<LoopNum;i++){
        const randomNum=Math.floor(Math.random()*LoopMax-LoopMin+1)+LoopMin
        queue.push(randomNum)
    }
    for(let j=0;j<LoopNum;j++){
        queue.shift()
    }
    let steps = [
        `queue random push,shift result: [${queue.join((", "))}]`
    ]
    return (
        <div className="bg-gray-100 p-5 my-4 rounded-md border-2 border-blue-500 font-bold text-left">
            <h3>Queue 예제</h3>
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
                    let queue: number[] = new Array(10)
                    const LoopMax=10
                    const LoopMin=1
                    const LoopNum=Math.floor(Math.random()*LoopMax-LoopMin+1)+LoopMin
                    for(let i=0;i<LoopNum;i++){
                        const randomNum=Math.floor(Math.random()*LoopMax-LoopMin+1)+LoopMin
                        queue.push(randomNum)
                    }
                    for(let j=0;j<LoopNum;j++){
                        queue.shift()
                    }
                `}
            </pre>
        </div>
    )
}
