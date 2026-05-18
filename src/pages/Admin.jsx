import AnimatedBackground from '../components/AnimatedBackground';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Admin() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      <AnimatedBackground />
      <Navbar />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Admin Panel</h1>
          <p className="text-gray-400">Manage your Breeze Client settings and content here.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
