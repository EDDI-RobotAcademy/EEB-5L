export interface Board {
    boardId: number
    title: string
    nickname: string
    content: string
    createDate: string
    updateDate: string
}

export interface BoardState {
    boardList: Board[]
    totalPages: number
    board: Board | null
}

export const boardState = (): BoardState => ({
    boardList: [],
    totalPages: 1,
    board: null
})