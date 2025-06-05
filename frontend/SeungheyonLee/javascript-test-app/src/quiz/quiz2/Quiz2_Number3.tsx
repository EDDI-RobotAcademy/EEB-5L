export const Quiz2_Number3=()=>{
    const abuseReportList = [
        { userId: "user1", type: "profanity", date: "2025-06-01" },
        { userId: "user1", type: "profanity", date: "2025-06-03" },
        { userId: "user1", type: "profanity", date: "2025-06-05" },

        { userId: "user2", type: "profanity", date: "2025-06-01" },
        { userId: "user2", type: "profanity", date: "2025-06-04" },
        { userId: "user2", type: "profanity", date: "2025-06-06" },
        { userId: "user2", type: "profanity", date: "2025-06-07" },
        { userId: "user2", type: "profanity", date: "2025-06-08" },

        { userId: "user3", type: "profanity", date: "2025-06-02" },
        { userId: "user3", type: "profanity", date: "2025-06-04" },
        { userId: "user3", type: "profanity", date: "2025-06-06" },
        { userId: "user3", type: "profanity", date: "2025-06-07" },
        { userId: "user3", type: "profanity", date: "2025-06-08" },
        { userId: "user3", type: "profanity", date: "2025-06-09" },
        { userId: "user3", type: "profanity", date: "2025-06-10" },

        { userId: "user4", type: "profanity", date: "2025-06-06" },
    ];
    //const abuseCountReduce=abuseReportList.reduce((acc:{[key:string]:number},report)=>{
    const abuseReportDate=abuseReportList.reduce((acc:{[key:string]:number},report)=>{
        if(report.type==="profanity"){
            const date=report.date;
            acc[date]=(acc[date]||0)+1
        }
        return acc
    },{});
    const steps:string[]=[]
    for(let abuse in abuseReportDate){
        const count=abuseReportDate[abuse]
        steps.push(`${abuse}일 신고 사례는 ${count}회 입니다`)
    }
    const steps2=Object.keys(abuseReportDate).sort().reduce((acc:string[],date)=>{
        const count=abuseReportDate[date]
        acc.push(`${date}일 신고건수는 ${count}건 입니다`)
        return acc
    },[])

    const steps3=Object.keys(abuseReportDate).sort().map(date=>`${date}일 신고건수는 ${abuseReportDate[date]}건 입니다`)

    const dailyProfanityCountsHashMap=abuseReportList.reduce((localMap,abuseReport)=>{
        localMap[abuseReport.date]=(localMap[abuseReport.date]||0)+1
      return localMap
    },{}as Record<string, number>)
    const sortedDate=Object.keys(dailyProfanityCountsHashMap).sort()
    return (
        <div className="bg-gray-100 p-5 my-4 rounded-md border-2 border-blue-500 font-bold text-left">
            <h3>Quiz 2</h3>
            <p>Number3 결과:</p>
            <ul>
                {steps.map((step, index) => (
                    <li key={index}>
                        {step}
                    </li>
                ))}
            </ul>
            <pre>
                {`
                    날짜별 신고건수 종합
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
                    날짜별 신고건수 종합2
                `}
            </pre>
            <ul>
                {steps3.map((step, index) => (
                    <li key={index}>
                        {step}
                    </li>
                ))}
            </ul>
            <pre>
                {`
                    날짜별 신고건수 종합3
                `}
            </pre>
            <ul>
                {sortedDate.map((step, index) => (
                    <li key={index}>
                        {step}일에 {index}신고건수 발생
                    </li>
                ))}
            </ul>
            <pre>
                {`
                    날짜별 신고건수 종합4
                `}
            </pre>

        </div>
    )
}