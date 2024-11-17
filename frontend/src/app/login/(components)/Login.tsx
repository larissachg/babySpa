"use client";

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
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/actions/auth";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

export const Login = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);

  const t = useTranslations("login");

  useEffect(() => {
    if (state === "Success") {
      window.location.replace("/calendar");
    }
  }, [state]);

  return (
    <form
      action={dispatch}
      className="flex min-h-screen items-center justify-center"
    >
      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-col items-center justify-center gap-5">
          <Image src={logoBabySpa} alt="logo" priority className="w-[200px]" />
          <CardTitle className="text-2xl">{t("title")}</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="font-bold">
              Usuario
            </Label>
            <Input
              id="user"
              type="text"
              name="usuario"
              placeholder="Ingrese su nombre de usuario"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="font-bold">
              Contraseña
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>

          {state !== "Success" && (
            <p className="text-sm text-red-500 text-center">{state}</p>
          )}
        </CardContent>
        <CardFooter>
          <LoginButton />
        </CardFooter>
      </Card>
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      className={`w-full ${
        pending && "flex items-center justify-center gap-2"
      }`}
      type="submit"
      disabled={pending}
    >
      Ingresar
      {pending && (
        <div role="status">
          {/* Spinner para el boton si esta pendiente */}
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </div>
      )}
    </Button>
  );
}
