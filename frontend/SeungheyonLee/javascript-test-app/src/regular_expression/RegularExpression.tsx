export const RegularExpression = () => {
    // 테스트할 문자열: 숫자와 문자가 섞여 있음
    let text = "Hello 123 World 456 maybe!"

    // 정규표현식: 최소 하나 이상(+)의 숫자(d)를 모두(global) 찾는다
    let findNumberRegex = /\d+/g

    // 정규표현식을 이용해 문자열에서 숫자들을 추출 (배열로 반환)
    // 만약 매칭되는 값이 없다면 빈 배열([])을 반환
    let matches = text.match(findNumberRegex) || []

    // 매칭된 결과를 보기 좋게 변환 (예: "매칭된 숫자 1: 123")
    let steps = matches.map((match, index) => `매칭된 숫자 ${index + 1}: ${match}`)

    // 결과를 화면에 렌더링
    return (
        <div className="bg-gray-100 p-5 my-4 rounded-md border-2 border-blue-500 font-bold text-left">
            <h3>Regular Expression Test</h3>
            <p>결과 :</p>
            <ul>
                {/* 매칭된 숫자들을 리스트로 출력 */}
                {steps.map((step, index) => (
                    <li key={index}>
                        {step}
                    </li>
                ))}
            </ul>
            <pre>
                {`
                    // 정규표현식 선언
                    let findNumberRegex = /\\d+/g;

                    // 정규표현식으로 숫자 찾기
                    let matches = text.match(findNumberRegex);
                `}
            </pre>
        </div>
    )
}