import axiosInstance from "../utility/axiosInstance.ts";

export const laptopActions = {
    async requestLaptopListToSpring(page: number, perPage: number): Promise<void> {
        try {
            const res = await axiosInstance.springAxiosInst.get('/laptop/list', {
                params: { page, perPage }
            })
            this.laptopList = res.data.laptopList
            this.totalPages = res.data.totalPages

            console.log('res.data:', res.data)
        } catch (error) {
            console.error('requestLaptopListToSpring():', error)
            throw error
        }
    },

    // async requestLaptopToSpring(laptopId: number): Promise<void> {
    //     try {
    //         const res = await axiosInstance.springAxiosInst.get(`/laptop/read/${laptopId}`)
    //         this.laptop = res.data
    //     } catch (error) {
    //         alert('requestLaptopToSpring() 문제 발생!')
    //         throw error
    //     }
    // },
    //
    // async requestCreateLaptopToSpring(payload: {
    //     title: string
    //     content: string
    // }): Promise<any> {
    //     try {
    //         const res = await axiosInstance.springAxiosInst.post('/laptop/register', payload)
    //         alert('등록 성공!')
    //         return res.data
    //     } catch (error) {
    //         alert('requestCreateLaptopToSpring() 문제 발생')
    //         throw error
    //     }
    // },
    //
    // async requestDeleteLaptopToSpring(boardId: number): Promise<void> {
    //     try {
    //         await axiosInstance.springAxiosInst.delete(`/laptop/delete/${boardId}`)
    //         alert('삭제 성공!')
    //     } catch (error) {
    //         alert('requestDeleteLaptopToSpring() 문제 발생')
    //         throw error
    //     }
    // },
    //
    // async requestUpdateLaptopToSpring(payload: {
    //     laptopId: number
    //     title: string
    //     content: string
    //     writer: string
    // }): Promise<void> {
    //     try {
    //         await axiosInstance.springAxiosInst.put(`/laptop/update/${payload.laptopId}`, payload)
    //         alert('수정 성공!')
    //     } catch (error) {
    //         alert('requestUpdateLaptopToSpring() 문제 발생')
    //         throw error
    //     }
    // },
}
