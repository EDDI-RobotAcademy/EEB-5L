export interface Laptop {
    laptopId: number
    title: string
    description: string
    price: number
    cpu: string        // 'INTEL_I5' 등
    ram: string        // 'RAM_8GB' 등
    storage: string    // 'SSD_256GB' 등
    createdAt: string
    updatedAt: string

    thumbnailImageUrl?: string
    detailImageUrlList?: string[]
}

export interface LaptopState {
    laptopList: Laptop[]
    totalPages: number
    laptop: Laptop | null
    loadedFromRegister: boolean
}

export const laptopState = (): LaptopState => ({
    laptopList: [],
    totalPages: 1,
    laptop: null,
    loadedFromRegister: false
})