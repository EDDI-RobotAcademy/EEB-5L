import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, increment, decrement }  from '../state/store'

const ReduxCounterTest = () => {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-2xl shadow-md text-center space-y-4">
                <h1 className="text-2xl font-bold">Redux Based Counter</h1>
                <p className="text-4xl font-mono">{ count }</p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={ () => dispatch(increment()) }
                        className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white text-2xl font-bold rounded-lg shadow transition">
                        +
                    </button>
                    <button
                        onClick={ () => dispatch(decrement()) }
                        className="w-12 h-12 bg-red-500 hover:bg-red-600 text-white text-2xl font-bold rounded-lg shadow transition">
                        -
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ReduxCounterTest