// stores/board/boardActions.ts
import axiosInstance from "../utility/axiosInstance.ts";

export const boardActions = {
    async requestBoardListToSpring(page: number, perPage: number): Promise<void> {
        try {
            const res = await axiosInstance.springAxiosInst.get('/board/list', {
                params: { page, perPage }
            })
            this.boardList = res.data.boardList
            this.totalPages = res.data.totalPages
            console.log('res.data.boardList:', res.data.boardList)
            console.log('res.data:', res.data)
        } catch (error) {
            console.error('requestBoardListToSpring():', error)
            throw error
        }
    },

    async requestBoardToSpring(boardId: number): Promise<void> {
        try {
            const res = await axiosInstance.springAxiosInst.get(`/board/read/${boardId}`)
            this.board = res.data
        } catch (error) {
            alert('requestBoardToSpring() 문제 발생!')
            throw error
        }
    },

    async requestCreateBoardToSpring(payload: {
        title: string
        content: string
    }): Promise<any> {  // 반환 타입은 보통 서버 응답에 따라 적절히 수정하세요
        try {
            const res = await axiosInstance.springAxiosInst.post('/board/register', payload)
            alert('등록 성공!')
            return res.data  // 보통 등록 후 생성된 게시물 정보를 반환하면 편리합니다.
        } catch (error) {
            alert('requestCreateBoardToSpring() 문제 발생')
            throw error
        }
    },

    async requestDeleteBoardToSpring(boardId: number): Promise<void> {
        try {
            await axiosInstance.springAxiosInst.delete(`/board/delete/${boardId}`)
            alert('삭제 성공!')
        } catch (error) {
            alert('requestDeleteBoardToSpring() 문제 발생')
            throw error
        }
    },

    async requestUpdateBoardToSpring(payload: {
        boardId: number
        title: string
        content: string
        writer: string
    }): Promise<void> {
        try {
            await axiosInstance.springAxiosInst.put(`/board/update/${payload.boardId}`, payload)
            alert('수정 성공!')
        } catch (error) {
            alert('requestUpdateBoardToSpring() 문제 발생')
            throw error
        }
    },
}
