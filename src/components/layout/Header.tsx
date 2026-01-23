import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/vuka-logo.jpeg";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  {
    name: "Services",
    href: "#",
    children: [
      { name: "Flights", href: "/flights" },
      { name: "Holidays", href: "/holidays" },
    ],
  },
  { name: "FAQs", href: "/faqs" },
  { name: "Contact Us", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar */}
      <div className="bg-navy-dark">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="hidden md:flex items-center gap-6">
              <a href="tel:+442012345678" className="flex items-center gap-2 text-gold-light hover:text-gold transition-colors">
                <Phone className="h-4 w-4" />
                <span>+44 20 1234 5678</span>
              </a>
              <a href="mailto:info@vukatravels.co.uk" className="flex items-center gap-2 text-gold-light hover:text-gold transition-colors">
                <Mail className="h-4 w-4" />
                <span>info@vukatravels.co.uk</span>
              </a>
            </div>
            <div className="text-gold-light text-xs md:text-sm">
              <span className="hidden sm:inline">Your Trusted Travel Partner | </span>
              <span>ATOL Protected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-background/95 backdrop-blur-md shadow-premium">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="VUKA Travels" className="h-14 w-14 object-contain rounded-full" />
              <div className="hidden sm:block">
                <span className="text-xl font-display font-bold text-navy">VUKA</span>
                <span className="text-xl font-display font-bold text-gold"> Travels</span>
              </div>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  {item.children ? (
                    <button
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        item.children.some(child => isActive(child.href))
                          ? "text-gold"
                          : "text-foreground hover:text-gold"
                      }`}
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isActive(item.href)
                          ? "text-gold"
                          : "text-foreground hover:text-gold"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Dropdown */}
                  {item.children && (
                    <div
                      className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <div className="bg-card rounded-lg shadow-premium-lg border overflow-hidden min-w-[180px]">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className={`block px-4 py-3 text-sm font-medium transition-colors ${
                              isActive(child.href)
                                ? "bg-gold/10 text-gold"
                                : "text-foreground hover:bg-secondary hover:text-gold"
                            }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button variant="hero" size="lg" asChild>
                <Link to="/contact">Get a Quote</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-card border-t"
            >
              <div className="container mx-auto px-4 py-4 space-y-2">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.children ? (
                      <>
                        <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">
                          {item.name}
                        </div>
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className={`block px-6 py-2 text-sm font-medium rounded-lg ${
                              isActive(child.href)
                                ? "text-gold bg-gold/10"
                                : "text-foreground hover:bg-secondary"
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </>
                    ) : (
                      <Link
                        to={item.href}
                        className={`block px-4 py-2 text-sm font-medium rounded-lg ${
                          isActive(item.href)
                            ? "text-gold bg-gold/10"
                            : "text-foreground hover:bg-secondary"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="pt-4">
                  <Button variant="hero" className="w-full" asChild>
                    <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                      Get a Quote
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
