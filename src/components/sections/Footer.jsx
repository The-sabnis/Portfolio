import { ArrowUp } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 70;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - topOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="py-12 px-6 bg-[#000000] border-t border-white/[0.06] relative z-10 text-center sm:text-left">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-xs font-mono tracking-wider text-[#86868b] uppercase">
          © {new Date().getFullYear()} {personalInfo.name} · SQL & Database Engineer
        </p>

        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-4 text-xs font-medium text-[#86868b]">
            {[
              { label: 'About', id: 'about' },
              { label: 'Skills', id: 'skills' },
              { label: 'Projects', id: 'projects' },
              { label: 'Experience', id: 'experience' },
              { label: 'Contact', id: 'contact' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-white/20 text-[#86868b] hover:text-white transition-all cursor-pointer"
            title="Back to top"
            aria-label="Back to top"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
