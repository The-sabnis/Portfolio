import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Copy, Check, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { contactDetails, personalInfo } from '../../data/portfolioData';
import { LinkedInIcon, GitHubIcon } from '../ui/SocialIcons';

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactDetails.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = form.subject.trim() || `Portfolio Inquiry from ${form.name.trim()}`;
    const body = `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\nMessage:\n${form.message.trim()}`;
    const mailtoLink = `mailto:${contactDetails.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setForm({ name: '', email: '', subject: '', message: '' });
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 bg-[#000000] relative z-10 border-t border-white/[0.06] overflow-hidden">
      {/* Dynamic Ambient Background Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(41,151,255,0.08),transparent_70%)]" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase mb-5 text-[#2997ff] bg-[#2997ff]/10 border border-[#2997ff]/20">
          Get In Touch
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f5f5f7] mb-4">
          {contactDetails.heading}
        </h2>

        <p className="text-base sm:text-lg text-[#86868b] max-w-xl mx-auto mb-10 font-normal">
          {contactDetails.subheading}
        </p>

        {/* Primary Contact Action Hub */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
          {/* Email button with direct mailto & quick copy */}
          <div className="flex items-center rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md p-1 shadow-sm hover:border-white/20 transition-all">
            <a
              href={`mailto:${contactDetails.email}`}
              className="flex items-center gap-2.5 px-4 py-2 text-xs sm:text-sm font-medium text-white hover:text-[#2997ff] transition-colors"
            >
              <Mail size={15} className="text-[#2997ff]" />
              <span>{contactDetails.email}</span>
            </a>
            <button
              onClick={handleCopyEmail}
              className="p-2 rounded-full hover:bg-white/10 text-[#86868b] hover:text-white transition-colors cursor-pointer"
              title="Copy email to clipboard"
              aria-label="Copy email"
            >
              {copiedEmail ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            </button>
          </div>

          {/* Phone */}
          <a
            href={`tel:${contactDetails.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium text-[#f5f5f7] bg-white/[0.04] border border-white/[0.08] backdrop-blur-md hover:bg-white/[0.08] transition-all shadow-sm"
          >
            <Phone size={14} className="text-[#2997ff]" />
            <span>{contactDetails.phone}</span>
          </a>

          {/* Location */}
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium text-[#a1a1a6] bg-white/[0.04] border border-white/[0.08] backdrop-blur-md shadow-sm">
            <MapPin size={14} className="text-[#30d158]" />
            <span>{contactDetails.location}</span>
          </div>
        </div>

        {/* Interactive Direct Message Form Card */}
        <div className="w-full max-w-2xl mx-auto mb-12">
          <div className="rounded-3xl bg-[#0c0d12] border border-white/[0.08] backdrop-blur-xl p-6 sm:p-9 text-left shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2997ff]/40 to-transparent" />

            <div className="mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-[#f5f5f7] mb-1 flex items-center gap-2.5">
                <MessageSquare size={18} className="text-[#2997ff]" />
                <span>Send a Direct Message</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#86868b]">
                Have an opportunity, technical inquiry, or database challenge? Send a direct note.
              </p>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3.5 shadow-sm">
                  <CheckCircle2 size={26} />
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">Message Draft Ready</h4>
                <p className="text-xs sm:text-sm text-[#a1a1a6] max-w-md mb-5 leading-relaxed">
                  Your email client has been opened with your message pre-filled to{' '}
                  <span className="text-[#2997ff] font-medium">{contactDetails.email}</span>.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-slate-200 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono uppercase tracking-wider text-[#86868b] mb-1.5"
                    >
                      Your Name <span className="text-[#2997ff]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-[#6e6e73] text-xs sm:text-sm focus:outline-none focus:border-[#2997ff] focus:ring-1 focus:ring-[#2997ff] transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono uppercase tracking-wider text-[#86868b] mb-1.5"
                    >
                      Your Email <span className="text-[#2997ff]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g. sarah@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-[#6e6e73] text-xs sm:text-sm focus:outline-none focus:border-[#2997ff] focus:ring-1 focus:ring-[#2997ff] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-mono uppercase tracking-wider text-[#86868b] mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="e.g. SQL Developer Role / Data Pipeline Architecture"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-[#6e6e73] text-xs sm:text-sm focus:outline-none focus:border-[#2997ff] focus:ring-1 focus:ring-[#2997ff] transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono uppercase tracking-wider text-[#86868b] mb-1.5"
                  >
                    Message <span className="text-[#2997ff]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Hi Sarvesh, I reviewed your portfolio and would like to discuss..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-[#6e6e73] text-xs sm:text-sm focus:outline-none focus:border-[#2997ff] focus:ring-1 focus:ring-[#2997ff] transition-all resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-[11px] font-mono text-[#86868b] order-2 sm:order-1">
                    Delivered directly to{' '}
                    <span className="text-slate-300">{contactDetails.email}</span>
                  </span>
                  <button
                    type="submit"
                    className="w-full sm:w-auto order-1 sm:order-2 px-7 py-2.5 rounded-full font-semibold text-xs sm:text-sm text-white bg-[#0071e3] hover:bg-[#0077ed] transition-all duration-200 shadow-[0_2px_14px_rgba(0,113,227,0.35)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Send Message</span>
                    <Send size={13} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Social Profile Connectors */}
        <div className="flex items-center justify-center gap-3">
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group w-12 h-12 rounded-2xl flex items-center justify-center bg-white/[0.04] border border-white/[0.08] hover:border-[#2997ff] text-[#86868b] hover:text-[#2997ff] transition-all shadow-sm"
            aria-label="LinkedIn Profile"
          >
            <LinkedInIcon size={18} className="group-hover:scale-105 transition-transform" />
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="group w-12 h-12 rounded-2xl flex items-center justify-center bg-white/[0.04] border border-white/[0.08] hover:border-white/20 text-[#86868b] hover:text-white transition-all shadow-sm"
            aria-label="GitHub Profile"
          >
            <GitHubIcon size={18} className="group-hover:scale-105 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
