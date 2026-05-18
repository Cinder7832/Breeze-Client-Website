import { Link } from 'react-router-dom';
import { Wind, Github, Twitter, Discord, Heart } from 'lucide-react';

const footerLinks = {
  product: [
    { name: 'Download', href: '#' },
    { name: 'Features', href: '#features' },
    { name: 'Changelog', href: '#versions' },
    { name: 'Roadmap', href: '#' },
  ],
  support: [
    { name: 'Documentation', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Report Bug', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'License', href: '#' },
  ],
  social: [
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Discord', icon: Discord, href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Wind className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-white">Breeze Client</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              The ultimate gaming companion. Enhanced performance, stunning visuals, and seamless multiplayer experience.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-3">
              {footerLinks.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="p-2 rounded-lg bg-card/50 border border-border/50 text-muted-foreground hover:text-white hover:border-primary/50 transition-colors"
                  aria-label={item.name}
                >
                  <item.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by the Breeze Team
            </p>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Breeze Client. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
