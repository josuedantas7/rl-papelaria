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
    star?: boolean | null;
}

export interface CartProps{
    id?: string;
    qtd: number;
    cartId?: string;
    productId?: string;
    product: ProductProps;
}

export interface CategoryProps{
    id: string;
    name: string;
    image: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CartContextProps{
    cart: CartProps[]
    addCart: (product: ProductProps) => void
    addQtdCart: (product: CartProps) => void
    removeQtdCart: (product: CartProps) => void
    qtdTotal: number
    setCart: (cart: CartProps[]) => void
}