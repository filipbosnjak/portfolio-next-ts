import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.scss'
import LandingSection from "@/components/LandingSection";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Works from "@/components/Works";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <LandingSection/>
        <About/>
        <Skills/>
      <Works/>
    </>
  )
}
