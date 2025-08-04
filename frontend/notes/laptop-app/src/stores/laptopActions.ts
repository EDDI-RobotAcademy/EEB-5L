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

    async requestLaptopToSpring(laptopId: number): Promise<void> {
        try {
            const res = await axiosInstance.springAxiosInst.get(`/laptop/read/${laptopId}`)
            const response = res.data

            this.laptop = {
                laptopId: response.id,
                title: response.title,
                description: response.description,
                price: response.price,
                cpu: response.cpuType,
                ram: response.ramSize,
                storage: response.storageType,
                thumbnailImageUrl: response.thumbnailImageUrl,
                detailImageUrlList: response.detailImageUrlList
            }
        } catch (error) {
            alert('requestLaptopToSpring() 문제 발생!')
            throw error
        }
    },

    async requestCreateLaptopToSpring(payload: FormData): Promise<any> {
        try {
            const token = localStorage.getItem('userToken') || ''
            if (!token) {
                alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.')
                return
                // router.push('/authentication')
            }

            console.log('FormData entries:')
            for (const pair of payload.entries()) {
                console.log(pair[0], pair[1])
            }

            const response = await axiosInstance.springAxiosInst.post('/laptop/register', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,  // 헤더에 토큰 포함
                },
            })
            alert('등록 성공!')

            const data = response.data
            console.log('response data:', data)

            this.laptop = {
                laptopId: data.id,
                title: data.title,
                description: data.description,
                price: data.price,
                cpu: data.cpuType,
                ram: data.ramSize,
                storage: data.storageType,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
                thumbnailImageUrl: data.thumbnailImageUrl,
                detailImageUrlList: data.detailImageUrlList,
            }

            this.loadedFromRegister = true

            return data.id
        } catch (error) {
            alert('requestCreateLaptopToSpring() 문제 발생')
            throw error
        }
    },

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
