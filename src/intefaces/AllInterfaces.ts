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
    description: string | null;
    price: number;
    image: string;
    color?: string | null;
    category?: CategoryProps;
    qtd: number | null;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    categoryId: string;
}

export interface CategoryProps{
    id: string;
    name: string;
    image: string;
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