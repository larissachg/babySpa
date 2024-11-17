"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLocale } from "@/utils/locale";

const LanguageSelector = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>("es");
  const router = useRouter();

  // Cargar el idioma actual disponible
  useEffect(() => {
    const locale = getLocale();
    if (locale) {
      setCurrentLanguage(locale);
    }
  }, []);

  // Cambiar idioma y actualizar la cookie
  const handleChangeLanguage = (locale: string) => {
    document.cookie = `language=${locale}; path=/; max-age=${
      60 * 60 * 24 * 365 * 3
    }; secure; samesite=strict`;

    setCurrentLanguage(locale);
    router.refresh();
  };

  return (
    <div className="language-selector">
      <button
        onClick={() => handleChangeLanguage("es")}
        disabled={currentLanguage === "es"}
      >
        Español
      </button>
      <button
        onClick={() => handleChangeLanguage("pt")}
        disabled={currentLanguage === "pt"}
      >
        Português
      </button>
    </div>
  );
};

export default LanguageSelector;
