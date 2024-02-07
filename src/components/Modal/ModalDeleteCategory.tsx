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
   
  export function ModalDeleteCategory({id} : { id : string}) {

    const router = useRouter()

    async function deleteProduct(){
        try {
            await api.delete(`/category`, {
                params: {
                    id: id
                }
            })
            router.replace('/cadastrar-categoria')
            router.refresh()
            Notification("success", "Categoria deletada com sucesso")
        } catch{
            Notification("error", "Erro ao deletar categoria")
        }
    } 

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Excluir</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja deletar essa categoria</AlertDialogTitle>
            <AlertDialogDescription>
              Ao deletar essa categoria ela será excluida do banco de dados e não poderá ser recuperada.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteProduct()}>Sim, excluir categoria</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }