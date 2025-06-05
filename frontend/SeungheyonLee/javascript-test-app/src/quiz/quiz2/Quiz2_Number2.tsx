export const Quiz2_Number2 = () => {
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
    const abuseCountReduce=abuseReportList.reduce((acc:{[key:string]:number},report)=>{
        if(report.type==='profanity'){
            const user=report.userId
            acc[user]=(acc[user] ||0)+1
        }
        return acc;
    },{});
    const steps2: string[] = [];

// abuseCountMap에 있는 모든 사용자에 대해 반복
    //in은 객체의 "속성 이름(key)"만 가져옴
    //of는 배열 안의 **"실제 값"**을 가져옴
    for (const user in abuseCountReduce) {
        const count = abuseCountReduce[user]; // 해당 사용자의 욕설 횟수
        let penalty = ""; // 초기에는 아무 제재도 없는 상태

        // 욕설 횟수에 따라 정지 수준을 결정
        if (count >= 7) {
            penalty = "영구 정지입니다";
        } else if (count >= 5) {
            penalty = "한달 정지입니다";
        } else if (count >= 3) {
            penalty = "1주 정지입니다";
        }

        // 3회 이상인 사용자만 정지 문구를 steps에 추가
        if (penalty !== "") {
            // 예: user1: 욕설3회로 1주 정지입니다
            steps2.push(`${user}: 욕설${count}회로 ${penalty}`);
        }
    }
// 사용자별 욕설 횟수를 저장할 객체. 예: { user1: 3, user2: 5, ... }
    const abuseCountMap: { [key: string]: number } = {};

// abuseReportList 배열을 하나씩 순회하면서 욕설 타입만 카운트
    abuseReportList.forEach((report) => {
        // 신고 유형이 'profanity'(욕설)인 경우에만 처리
        if (report.type === 'profanity') {
            const user = report.userId; // 신고당한 사용자 ID

            // 처음 신고된 유저라면 1로 시작
            if (abuseCountMap[user] === undefined) {
                abuseCountMap[user] = 1;
            } else {
                // 이미 기록이 있다면 +1 증가
                abuseCountMap[user] += 1;
            }
        }
    });

// 사용자별 결과 메시지를 담을 배열
    const steps: string[] = [];

// abuseCountMap에 있는 모든 사용자에 대해 반복
    //in은 객체의 "속성 이름(key)"만 가져옴
    //of는 배열 안의 **"실제 값"**을 가져옴
    for (const user in abuseCountMap) {
        const count = abuseCountMap[user]; // 해당 사용자의 욕설 횟수
        let penalty = ""; // 초기에는 아무 제재도 없는 상태

        // 욕설 횟수에 따라 정지 수준을 결정
        if (count >= 7) {
            penalty = "영구 정지입니다";
        } else if (count >= 5) {
            penalty = "한달 정지입니다";
        } else if (count >= 3) {
            penalty = "1주 정지입니다";
        }

        // 3회 이상인 사용자만 정지 문구를 steps에 추가
        if (penalty !== "") {
            // 예: user1: 욕설3회로 1주 정지입니다
            steps.push(`${user}: 욕설${count}회로 ${penalty}`);
        }
        console.log(user);             // 👉 'user1', 'user2', 'user3' 출력됨
        console.log(abuseCountMap[user]); // 👉 각각 3, 5, 7 출력됨
    }
    return (
        <div className="bg-gray-100 p-5 my-4 rounded-md border-2 border-blue-500 font-bold text-left">
            <h3>Quiz 2</h3>
            <p>Number2 결과:</p>
            <ul>
                {steps.map((step, index) => (
                    <li key={index}>
                        {step}
                    </li>
                ))}
            </ul>
            <pre>
                {`
                    치맥
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
                    치맥
                `}
            </pre>
        </div>
    )
}