'use client'
import { useState, useEffect} from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { api } from "@/lib/api";


interface CategoryProps{
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

interface SelectFormProps{
    setCategoria: (value: string) => void
}

export default function SelectForm({setCategoria} : SelectFormProps) {

    const [categories, setCategories] = useState<CategoryProps[]>([])

    useEffect(() => {
        async function getCategories(){
            const response = await api.get('/api/category')
            setCategories(response.data)
        }
        getCategories()
    },[])

  return (
    <Select onValueChange={setCategoria}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione a categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categorias</SelectLabel>
          {categories.map((category: CategoryProps) => (
            <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
