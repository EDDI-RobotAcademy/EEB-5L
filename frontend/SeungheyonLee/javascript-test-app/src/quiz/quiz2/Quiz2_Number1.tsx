export const Quiz2_Number1 = () => {
    const cartInfo = [
        { id: 1, name: "사과", price: 1500, quantity: 4 },
        { id: 2, name: "바나나", price: 1000, quantity: 6 },
        { id: 3, name: "오렌지", price: 2000, quantity: 3 },
        { id: 4, name: "수박", price: 10000, quantity: 1 },
        { id: 5, name: "망고", price: 3500, quantity: 2 }
    ];
    const total_price2=cartInfo.reduce((total,cartitem)=>{
        return total+=cartitem.price*cartitem.quantity;
    },0);
    let total_price = cartInfo.reduce((acc, item, index) => {
        //acc로 0을 입력하고 순회처리
        //item으로 cartInfo의 n번째 값을 호출
        //index로 초기값을 선언하는데 이건 0이다
        if (item.id === index + 1) {//index+1의 값에 맞는 id값이면
            return acc + item.price;//acc(초기값0)에 item.price를 더해서 return해라
        }
        return acc;
    }, 0);//초기값 0
    return (
        <div className="bg-gray-100 p-5 my-4 rounded-md border-2 border-blue-500 font-bold text-left">
            <h3>Quiz 2</h3>
            <p>Number1 결과:</p>
            <p>{total_price}</p>
            <p>{total_price2}</p>
            <pre>
                {`
                    let total_price = cartInfo.reduce((acc, item, index) => {
                            //acc로 0을 입력하고 순회처리
                            //item으로 cartInfo의 n번째 값을 호출
                            //index로 초기값을 선언하는데 이건 0이다
                            if (item.id === index + 1) {//index+1의 값에 맞는 id값이면
                                return acc + item.price;//acc(초기값0)에 item.price를 더해서 return해라
                            }
                            return acc;
                        }, 0);//초기값 0
                `}
            </pre>
        </div>
    )
}