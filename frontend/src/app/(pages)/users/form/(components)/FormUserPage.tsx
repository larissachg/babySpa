'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UserInterface } from '@/interfaces'
import { Switch } from '@/components/ui/switch'
import { registerUser, updateUser } from '@/actions/users'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

const formSchema = z.object({
  Nombre: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
  Email: z.string().email({ message: 'Debe ser un email válido' }),
  Usuario: z.string().min(3, {
    message: 'El nombre de usuario debe tener al menos 3 caracteres'
  }),
  Password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
  Rol: z.enum(['Caja', 'Admin', 'Fisio'], {
    message: 'Debe seleccionar un rol válido'
  }),
  Estado: z.boolean().default(true)
})

const defaultValue: UserInterface = {
  Nombre: '',
  Email: '',
  Usuario: '',
  Password: '',
  Rol: 'Caja',
  Estado: true
}

interface FormUserPageProps {
  data?: UserInterface
  type?: 'view' | 'update'
}

const FormUserPage = ({ data, type }: FormUserPageProps) => {
  const form = useForm<UserInterface>({
    resolver: zodResolver(formSchema),
    defaultValues: data ?? defaultValue
  })

  const [formError, setFormError] = useState<string | undefined>(undefined)
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(values: UserInterface) {
    const response =
      type === 'update' && data?.IdUsuario
        ? await updateUser(values, data.IdUsuario.toString())
        : await registerUser(values)

    if (!response) return setFormError('Error al registrar el usuario')
    if (response.errors) return setFormError(`${response.errors[0].msg}`)
    toast({
      variant: 'success',
      description: `¡Usuario ${
        type === 'update' ? 'actualizado' : 'registrado'
      } exitosamente!`
    })
    return router.push('/users')
  }

  return (
    <div className='w-[70vw] md:w-[40vw] mx-auto border py-5 px-10 rounded-3xl shadow-sm mb-10  '>
      <h1 className='font-bold text-2xl my-4'>Formulario de Usuario</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-4'
        >
          <FormField
            control={form.control}
            name='Nombre'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder='Ingresa tu nombre' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='Email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='usuario@ejemplo.com'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='Usuario'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de Usuario</FormLabel>
                <FormControl>
                  <Input placeholder='Usuario' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='Password'
            disabled={type === 'view'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Contraseña' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Rol */}
          <FormField
            control={form.control}
            name='Rol'
            disabled={type === 'view'}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className='w-full border border-gray-300 rounded-md p-2'
                  >
                    <option value='Caja'>Caja</option>
                    <option value='Fisio'>Fisio</option>
                    <option value='Admin'>Admin</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='Estado'
            disabled={type === 'view'}
            render={({ field }) => (
              <FormItem className='flex items-center space-x-2'>
                <FormLabel>Activo</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {formError && (
            <p className='text-red-500 text-sm mt-2'>{formError}</p>
          )}

          {type !== 'view' && (
            <Button type='submit' className='w-[200px] mt-3'>
              Guardar
            </Button>
          )}
        </form>
      </Form>
    </div>
  )
}

export default FormUserPage
