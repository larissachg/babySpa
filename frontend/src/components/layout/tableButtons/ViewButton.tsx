import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from '@/components/ui/tooltip'

interface ViewButtonProps {
  id?: number
  ruta: string // Ruta de destino al hacer clic
}

const ViewButton = ({ id, ruta }: ViewButtonProps) => {
  const router = useRouter()

  const handleView = () => {
    router.push(`${ruta}?id=${id}&type=view`)
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant='ghost' size='sm' onClick={handleView}>
            <Eye className='h-4 w-4 text-gray-400' />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Ver</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ViewButton
