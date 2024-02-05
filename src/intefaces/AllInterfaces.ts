export interface UserProps{
    name?: string;
    email: string;
    password: string;
    image?: string;
    role?: string;
}

export interface ProductProps{
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    color?: string;
    category: CategoryProps;
    qtd: number;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    categoryId: string;
}

interface CategoryProps{
    id: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CartContextProps{
    cart: ProductProps[]
    addCart: (product: ProductProps) => void
    addQtdCart: (product: ProductProps) => void
    removeQtdCart: (product: ProductProps) => void
    qtdTotal: number
    totalValue: number
}