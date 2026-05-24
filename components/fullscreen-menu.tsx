"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { MenuWave } from "@/components/menu-wave";
import { menuLinks } from "@/data/nav";
import { socialLinks } from "@/data/socials";

type FullscreenMenuProps = {
  open: boolean;
  onClose: () => void;
};

const contentEase = [0.22, 1, 0.36, 1] as const;

function MenuHexDot() {
  return (
    <svg viewBox="0 0 12 14" className="inline-block h-3 w-3 shrink-0" aria-hidden="true">
      <polygon points="6,1 11,4 11,10 6,13 1,10 1,4" fill="var(--accent)" />
    </svg>
  );
}

export function FullscreenMenu({ open, onClose }: FullscreenMenuProps) {
  return (
    <>
      {/* Wave layer — drops from top, exits upward */}
      <AnimatePresence>
        {open ? <MenuWave key="menu-wave" /> : null}
      </AnimatePresence>

      {/* Menu panel */}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="site-menu"
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-[80] overflow-hidden pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, delay: 0.08 }}
          >
            <div className="absolute inset-0 bg-[#EEEDEA]" />

            <div className="relative z-10 flex h-full flex-col">
              <div className="studio-container flex h-[4.5rem] shrink-0 items-center">
                <Link
                  href="/"
                  onClick={onClose}
                  className="flex items-center gap-3"
                  aria-label="Sajilo Studio home"
                >
                  <Image src="/logo.svg" alt="" width={36} height={36} className="size-9" />
                </Link>
              </div>

              <nav
                className="flex flex-1 flex-col items-center justify-center px-6 pb-[38vh] sm:pb-[34vh]"
                aria-label="Primary navigation"
              >
                <ul className="flex w-full max-w-5xl flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-8 lg:gap-14">
                  {menuLinks.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 28 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{
                        delay: 0.34 + index * 0.08,
                        duration: 0.55,
                        ease: contentEase,
                      }}
                    >
                      <a
                        href={link.href}
                        onClick={onClose}
                        className="font-tunnels group inline-flex items-baseline gap-3 text-[clamp(2.6rem,7.5vw,5.75rem)] leading-[0.92] text-[#1D2145] transition hover:opacity-75"
                      >
                        {link.label}
                        <MenuHexDot />
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <motion.ul
                  className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.64, duration: 0.4, ease: contentEase }}
                >
                  {socialLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#1D2145]/70 transition hover:text-[#1D2145]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </motion.ul>
              </nav>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
