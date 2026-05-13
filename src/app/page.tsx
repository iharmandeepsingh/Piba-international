import Hero from '@/components/sections/hero'
import About from '@/components/sections/about'
import Services from '@/components/sections/services'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        {/* Additional sections will be added here */}
      </main>
      <Footer />
    </div>
  );
}
