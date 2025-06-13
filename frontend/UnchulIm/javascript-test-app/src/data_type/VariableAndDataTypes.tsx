export const VariableAndDataTypes = () => {
    let a = 10;
    const b = "Hello";
    var c = true;
    let d = null;
    let e = undefined;
    let f = { key: "value" }
    let g = [1, 2, 3];

    return (
        <div className="bg-gray-100 p-5 my-4 rounded-md border-2 border-blue-500 font-bold text-left">
            <h3>변수와 데이터 타입</h3>
            <pre>{
                `
                let a = ${a};                   // Number 타입
                const b = "${b}";               // String 타입
                var c = ${c};                   // Boolean 타입
                let d = ${d};                   // Null 타입
                let e = ${e};                   // Undefined 타입
                let f = ${JSON.stringify(f)};   // Object 타입
                let g = ${JSON.stringify(g)};   // Array 타입
                `
            }</pre>
        </div>
    )
}