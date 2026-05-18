import { motion } from 'framer-motion';
import { Gamepad2, ExternalLink } from 'lucide-react';

const games = [
  {
    name: 'Minecraft',
    category: 'Sandbox',
    players: '50K+',
    color: 'from-green-500 to-emerald-600',
  },
  {
    name: 'Roblox',
    category: 'Platform',
    players: '30K+',
    color: 'from-red-500 to-rose-600',
  },
  {
    name: 'Fortnite',
    category: 'Battle Royale',
    players: '25K+',
    color: 'from-purple-500 to-violet-600',
  },
  {
    name: 'Valorant',
    category: 'FPS',
    players: '20K+',
    color: 'from-red-600 to-orange-600',
  },
  {
    name: 'Rocket League',
    category: 'Sports',
    players: '15K+',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    name: 'Apex Legends',
    category: 'Battle Royale',
    players: '18K+',
    color: 'from-orange-500 to-red-600',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
};

export default function GamesSection() {
  return (
    <section id="games" className="py-20 lg:py-32 relative">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Gamepad2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Supported Games</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Play Your Favorites
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Breeze Client supports all your favorite games with enhanced features and optimizations.
          </motion.p>
        </div>

        {/* Games Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {games.map((game) => (
            <motion.div
              key={game.name}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer"
            >
              {/* Game Card Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center text-white font-bold text-xl`}>
                    {game.name.charAt(0)}
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-1">
                  {game.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {game.category}
                </p>
                
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-primary font-medium">{game.players}</span>
                  <span className="text-muted-foreground">active players</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl border border-border bg-card/50 text-foreground font-medium hover:bg-card transition-colors">
            <span>View All Games</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
