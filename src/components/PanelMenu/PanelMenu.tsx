
'use client'
import React from 'react'; 
import { PanelMenu } from 'primereact/panelmenu';
import 'primeicons/primeicons.css';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function BasicDemo() {
    const router = useRouter();
    const items = [     
        {
            label: 'Perfil',
            items: [
                {
                    label: 'Meu perfil',
                    icon: 'pi pi-fw pi-user',
                    command: () => {
                        router.push('/profile')
                    }
                },
            ]
        },
        {
            label: 'Gerenciar Loja',
            items: [
                {
                    label: 'Gerenciar Produtos',
                    icon: 'pi pi-fw pi-file',
                    command: () => {
                        router.push('/cadastrar-produto')
                    }
                },
                {
                    label: 'Gerenciar Categorias',
                    icon: 'pi pi-fw pi-tags',
                    command: () => {
                        router.push('/cadastrar-categoria')
                    }
                },
                {
                    label: 'Gerenciar Admin',
                    icon: 'pi pi-fw pi-user',
                    command: () => {
                        router.push('/cadastrar-admin')
                    
                    }
                },
                {
                    label: 'Gerenciar Carrinhos',
                    icon: 'pi pi-fw pi-shopping-cart',
                    command: () => {
                        router.push('/gerenciar-carrinho')
                    }
                }
            ]
        },
        {
            label: 'Sair',
            items: [
                {
                    label: 'Sair da conta',
                    icon: 'pi pi-fw pi-power-off',
                    command: () => {
                        signOut({callbackUrl: '/'})
                    }
                },
            ]
        }
    ];
    return (
        <div className="card flex justify-content-center">
            <PanelMenu model={items} className="w-full md:w-20rem" />
        </div>
    )
}