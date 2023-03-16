import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import LandingSection from "@/components/LandingSection";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Works from "@/components/Works";
import Contact from "@/components/Contact";
import PoweredBy from "@/components/PoweredBy";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
        <LandingSection/>
        <About/>
        <Skills/>
        <Works/>
        <Contact/>
        <PoweredBy/>
        <Footer/>

    </>
  )
}
