export const Number2 = () => {
// String[] 가 아닌 string 타입으로 선언
    let text: string = "Stocks surged on Monday after the U.S. and China agreed to roll back tariffs for a 90-day period.\n" +
        "\n" +
        "The Dow Jones Industrial Average rose 1,160.72 points, or 2.81%, exiting correction territory. The S&P 500 climbed 3.26% and the Nasdaq Composite rose 4.35%, exiting bear market territory.\n" +
        "\n" +
        "The tariffs President Donald Trump announced against China on April 2 are being cut by 24 percentage points for this temporary period while retaining the remaining ad valorem rate of 10% from that announcement, according to a joint statement.\n" +
        "\n" +
        "China agreed to the same stipulations, adding that it will \"adopt all necessary administrative measures to suspend or remove the non-tariff countermeasures taken against the United States since April 2,\" the announcement stated.\n" +
        "\n" +
        "Under the deal, reciprocal tariffs for both countries would be reduced by 115%. The U.S. will temporarily lower its tariffs on Chinese goods from 145% to 30%, and China will reduce its levies on American products from 125% to 10%.\n" +
        "\n" +
        "FOX Business Landon Mion contributed to this report"

// 키워드 리스트를 배열로 올바르게 선언
    let keywordList: string[] = ['percent', 'tariff', 'rose', 'climbed']

// 텍스트를 단어로 분리 (여러 구분자 사용)
    let words: string[] = text.split(/[,.\s\n]+/)

    let matchedWords:string[]=[]

    for(let word of words){
        for(let keyword of keywordList){
            if(word.toLowerCase().includes(keyword.toLowerCase())){
                matchedWords.push(word)
                break
            }
        }
    }
    let resultWord2:string[]=[]
    const matchingWords2=words.reduce((acc,word)=>{
        //words의 값이 keyword와 같은지 비교하기위한 for문
        for(let keyword of keywordList){
            if(word.toLowerCase().includes(keyword.toLowerCase())){
                acc.push(word)
            }
        }
        return acc; //반복 순회처리
    }, resultWord2);
    // steps 구현
    const steps: string[] = matchedWords.map((word: string, index: number) =>
        `키워드 매칭 ${index + 1}: ${word}`
    )
    let steps2: string[] =matchingWords2.map((word:string,index:number)=>
        `키워드 매칭 ${index + 1}: ${word}`
    )
    

    return (
        <div className="bg-gray-100 p-5 my-4 rounded-md border-2 border-blue-500 font-bold text-left">
            <h3>number 2 퀴즈</h3>
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
                    // 키워드 리스트를 배열로 올바르게 선언
                    let keywordList: string[] = ['percent', 'tariff', 'rose', 'climbed']
                
                    // 텍스트를 단어로 분리 (여러 구분자 사용)
                        let words: string[] = text.split(/[,.\\s\\n]+/).filter(word => word.length > 0)
                    
                    // 키워드 매칭 처리
                        let matchedWords = words.reduce((acc: string[], word: string) => {
                            if (keywordList.some(keyword => word.toLowerCase().includes(keyword.toLowerCase()))) {
                                acc.push(word)
                            }
                            return acc
                        }, [])
                `}
            </pre>
            <ul>
                {steps2.map((step,index)=>(
                    <li key={index}>
                        {step}
                    </li>
                ))}
            </ul>
            <pre>
                {`
                    const matchingWords2=words.reduce((acc,word)=>{
                        //words의 값이 keyword와 같은지 비교하기위한 for문
                        for(let keyword of keywordList){
                            if(word.toLowerCase().includes(keyword.toLowerCase())){
                                acc.push(word)
                            }
                        }
                        return acc; //반복 순회처리
                    }, []);
                `}
            </pre>
        </div>
    )
}
