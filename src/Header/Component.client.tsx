'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  const navItems = data?.navItems || []

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState)
  }

  const closeMenuOnNav = () => {
    setIsMenuOpen(() => false)
  }

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className="fixed top-0 lg:top-5 w-full flex lg:px-10 min-h-[70px] z-50"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="relative mx-auto lg:max-w-4xl px-4 sm:px-6 flex flex-wrap items-center justify-between gap-5 w-full lg:rounded-2xl backdrop-blur-[10px] bg-[#0a0d1fcc] border border-[#232d6b]">
        <Link href="/">
          <Logo />
        </Link>

        <div
          id="collapseMenu"
          className={`bg-[#0a0d1fcc] lg:bg-transparent h-[calc(100vh-70px)] duration-500 absolute lg:static lg:w-auto w-full lg:h-auto flex lg:items-center gap-[1.5vw] top-[100%] ${
            isMenuOpen ? 'left-[0%]' : 'left-[-100%]'
          } px-5 md:py-0 py-5`}
        >
          <ul className="lg:flex gap-x-10 w-full">
            {navItems.map(({ link }, i) => {
              return (
                <li className="max-lg:py-3 px-3" key={i}>
                  <Link
                    href={link.url || '/'}
                    className="hover:text-[#60a5fa] text-blue-100 block font-semibold text-[15px]"
                    onClick={closeMenuOnNav}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}

            <li className="group max-lg:py-3 px-3 relative">
              <a
                href="javascript:void(0)"
                className="hover:text-[#60a5fa] text-blue-100 block font-semibold text-[15px]"
              >
                Profile
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16px"
                  height="16px"
                  className="ml-1 inline-block"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                    fill="#bfdbfe"
                  />
                </svg>
              </a>
              <ul className="absolute top-10 rounded-md max-lg:top-8 left-0 z-50 block shadow-lg bg-[#0a0d1fcc] max-h-0 overflow-hidden min-w-[230px] group-hover:opacity-100 group-hover:max-h-[700px] px-6 group-hover:pb-4 group-hover:pt-6 transition-all duration-[400ms]">
                <li className="pb-3">
                  <a
                    target="_blank"
                    href="https://woztell-files.s3.eu-north-1.amazonaws.com/62679a29a2502ebcb4d38d1f/MINASTIK-COMPANY-PROFILE-2024-hCgFLNOb.pdf"
                    className="hover:text-[#60a5fa] text-blue-100 block font-semibold text-[15px]"
                  >
                    Company Profile
                  </a>
                </li>
                <li className="py-3">
                  <a
                    target="_blank"
                    href="https://woztell-files.s3.eu-north-1.amazonaws.com/62679a29a2502ebcb4d38d1f/Core-Team_PORTFOLIOS_MINASTIK_2024-0TkfLXHV.pdf"
                    className="hover:text-[#60a5fa] text-blue-100 block font-semibold text-[15px]"
                  >
                    Core Team
                  </a>
                </li>
                <li className="py-3">
                  <a
                    target="_blank"
                    href="https://woztell-files.s3.eu-north-1.amazonaws.com/62679a29a2502ebcb4d38d1f/AI_PORTFOLIOS-tgbqbWbQ.pdf"
                    className="hover:text-[#60a5fa] text-blue-100 block font-semibold text-[15px]"
                  >
                    AI Team
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="flex max-lg:ml-auto space-x-4">
          <button className="px-4 py-2 rounded-lg md:rounded-lg text-sm bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]">
            <Link href="/contact">Contact Us</Link>
          </button>

          <button id="toggleOpen" className="lg:hidden" onClick={handleMenuToggle}>
            <svg
              className="w-7 h-7"
              fill="#fff"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        {/* <HeaderNav data={data} /> */}
      </div>
    </header>
  )
}
