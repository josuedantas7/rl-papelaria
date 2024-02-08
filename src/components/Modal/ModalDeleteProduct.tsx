'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"


import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import Notification from "../Notifier/Notification"
import { useRouter } from "next/navigation"
   
  export function ModalDeleteProduct({id} : { id : string}) {

    const router = useRouter()

    async function deleteProduct(){
        try {
            await api.delete(`/api/product`, {
                params: {
                    id: id
                }
            })
            router.replace('/cadastrar-produto')
            router.refresh()
            Notification("success", "Produto deletado com sucesso")
        } catch{
            Notification("error", "Erro ao deletar produto")
        }
    } 

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Excluir</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja deletar esse produto?</AlertDialogTitle>
            <AlertDialogDescription>
              Ao deletar o produto ele será excluido do banco de dados e não poderá ser recuperado.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteProduct()}>Sim, excluir produto</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }