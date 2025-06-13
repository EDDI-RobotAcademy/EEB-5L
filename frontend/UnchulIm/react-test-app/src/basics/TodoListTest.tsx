import React, {useState} from "react"

type Task = {
    id: number,
    text: string
}

const TodoListTest = () => {
    const [taskList, setTaskList] = useState<Task[]>([])
    const [userInput, setUserInput] = useState("")

    const handleAddTask = () => {
        if (userInput.trim() === "") return

        const newTask: Task = { id: Date.now(), text: userInput.trim() }
        setTaskList([...taskList, newTask])
        setUserInput("")
    }

    const handleDeleteTask = (id: number) => {
        setTaskList(
            taskList.filter((task) => task.id !== id)
        )
    }

    return (
        // Background 배경
        <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-purple-100 items-center justify-center px-4">
            {/* 배경에 박혀 있는 카드 */}
            <div className="bg-white shadow-2xl rounded-3xl w-full max-w-xl p-8">
                <h1 className="text-2xl font-extrabold mb-6 text-gray-700">📝 Todo List</h1>

                <div className="flex items-center gap-3 mb-6">
                    <input
                        type="text"
                        value={ userInput }
                        onChange={(event) => setUserInput(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                handleAddTask();
                            }
                        }}
                        placeholder="할 일을 입력하세요."
                        className="flex-grow px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 fcous:ring-blue-500"
                    />
                    <button
                        onClick={ handleAddTask }
                        className="shrink-0 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition"
                    >
                        추가
                    </button>
                </div>

                <ul className="space-y-2">
                    { taskList.map((task) => (
                        <li
                            key={ task.id }
                            className="flex justify-between items-center bg-gray-50 border rounded-lg px-4 py-2 shadow-sm"
                        >
                            <span>{ task.text }</span>
                            <button
                                onClick={ () => handleDeleteTask(task.id) }
                                className="text-red-500 hover:text-red-700 transition"
                            >
                                삭제
                            </button>
                        </li>
                    )) }
                </ul>

                { taskList.length === 0 && (
                    <p className="text-center text-gray-400 mt-4">
                        할 일이 없습니다.
                    </p>
                ) }
            </div>
        </div>
    )
}

export default TodoListTest