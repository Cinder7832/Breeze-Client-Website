import { motion } from 'framer-motion';
import { History, Download, Calendar, Tag, ChevronRight } from 'lucide-react';

const versions = [
  {
    version: 'v3.0.2',
    date: '2024-01-15',
    isLatest: true,
    changes: [
      'Performance optimizations for lower-end systems',
      'New customizable HUD options',
      'Bug fixes for multiplayer connectivity',
      'Improved memory management',
    ],
  },
  {
    version: 'v3.0.1',
    date: '2024-01-01',
    isLatest: false,
    changes: [
      'Hotfix for crash on startup issue',
      'Updated game compatibility list',
      'Minor UI improvements',
    ],
  },
  {
    version: 'v3.0.0',
    date: '2023-12-20',
    isLatest: false,
    changes: [
      'Major UI redesign with dark theme',
      'New plugin system for extensions',
      'Enhanced security features',
      'Support for 10+ new games',
      'Improved loading times',
    ],
  },
  {
    version: 'v2.5.3',
    date: '2023-11-15',
    isLatest: false,
    changes: [
      'Bug fixes and stability improvements',
      'Updated dependencies',
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function VersionHistory() {
  return (
    <section id="versions" className="py-20 lg:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <History className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Changelog</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Version History
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Stay up to date with the latest improvements and new features.
          </motion.p>
        </div>

        {/* Latest Version CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-primary/20 to-purple-600/20 border border-primary/30"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Latest Version</span>
              </div>
              <h3 className="text-2xl font-bold text-white">v3.0.2</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Released on January 15, 2024
              </p>
            </div>
            <button className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
              <Download className="w-5 h-5" />
              <span>Download Latest</span>
            </button>
          </div>
        </motion.div>

        {/* Version Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {versions.map((version) => (
            <motion.div
              key={version.version}
              variants={itemVariants}
              className="group relative p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold text-white">
                      {version.version}
                    </h3>
                    {version.isLatest && (
                      <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                        Latest
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(version.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>

                  <ul className="space-y-2">
                    {version.changes.map((change, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="inline-flex items-center justify-center p-3 rounded-xl border border-border bg-card/50 text-muted-foreground hover:text-white hover:border-primary/50 transition-colors shrink-0">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
