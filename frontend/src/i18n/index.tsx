import { createContext, useContext, useState, ReactNode } from 'react'
import { fr } from './locales/fr'
import { en } from './locales/en'
import { de } from './locales/de'
import type { Translations } from './locales/fr'

export type LangCode = 'fr' | 'en' | 'de'

const LOCALES: Record<LangCode, Translations> = { fr, en, de }

export const LANG_META: Record<LangCode, { flag: string; label: string }> = {
  fr: { flag: '🇫🇷', label: 'Français' },
  en: { flag: '🇬🇧', label: 'English' },
  de: { flag: '🇩🇪', label: 'Deutsch' },
}

function detectLang(): LangCode {
  const stored = localStorage.getItem('ospp_lang') as LangCode | null
  if (stored && stored in LOCALES) return stored
  const nav = navigator.language.split('-')[0] as LangCode
  return nav in LOCALES ? nav : 'en'
}

interface LangCtx {
  lang: LangCode
  t: Translations
  setLang: (l: LangCode) => void
}

const Ctx = createContext<LangCtx>({
  lang: 'en',
  t: en,
  setLang: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(detectLang)

  function setLang(l: LangCode) {
    setLangState(l)
    localStorage.setItem('ospp_lang', l)
  }

  return (
    <Ctx.Provider value={{ lang, t: LOCALES[lang], setLang }}>
      {children}
    </Ctx.Provider>
  )
}

export function useLanguage() {
  return useContext(Ctx)
}
