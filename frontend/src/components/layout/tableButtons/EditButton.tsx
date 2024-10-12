import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from '@/components/ui/tooltip'

interface EditButtonProps {
  id?: number
  ruta: string
}

const EditButton = ({ id, ruta }: EditButtonProps) => {
  const router = useRouter()

  const handleEdit = () => {
    router.push(`${ruta}?id=${id}&type=update`)
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='ghost' size='sm' onClick={handleEdit}>
            <Pencil className='h-4 w-4 text-green-500' />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Editar</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default EditButton
