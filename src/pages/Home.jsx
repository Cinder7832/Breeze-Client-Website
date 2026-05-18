import AnimatedBackground from '../components/AnimatedBackground';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import GamesSection from '../components/GamesSection';
import VersionHistory from '../components/VersionHistory';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      <AnimatedBackground />
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <GamesSection />
        <VersionHistory />
      </main>
      <Footer />
    </div>
  );
}
