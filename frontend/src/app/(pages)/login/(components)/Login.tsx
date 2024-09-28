import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { logoBabySpa } from "../assets/images";

export const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-col items-center justify-center gap-5">
          <Image src={logoBabySpa} alt="logo" width={200} height={200} />
          <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="font-bold">Usuario</Label>
            <Input id="user" type="text" placeholder="Ingrese su nombre de usuario" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="font-bold">Password</Label>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Sign in</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
