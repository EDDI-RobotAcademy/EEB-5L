export const StringExample = () => {
    let text="javascript(Typescript) is awesome!"
    let words=text.split(' ');
    let steps=words.map((word,index)=>`단어${index+1}:${word}`)

    return (
        <div className="bg-gray-100 p-5 my-4 rounded-md border-2 border-blue-500 font-bold text-left">
            <h3>String 예제</h3>
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
                    let words=text.split(" ")
                `}
            </pre>
        </div>
    )
}