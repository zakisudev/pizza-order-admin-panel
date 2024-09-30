import Hero from '../components/common/Hero';
import Featured from '../components/common/Featured';
import TopRestaurants from '../components/common/TopRestaurants';
import PopularPizzas from '../components/common/PopularPizzas';
import FastingPizza from '../components/common/FastingPizza';
import Footer from '../components/common/Footer';
import Header from '@/components/ui/Header';

export default function App() {
  return (
    <div className="relative flex flex-col min-h-screen overflow-y-auto w-full max-w-hxl mx-auto">
      <Header />
      <Hero />
      <Featured />
      <TopRestaurants />
      <PopularPizzas />
      <FastingPizza />
      <Footer />
    </div>
  );
}
