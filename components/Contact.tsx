'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Copy, Check, Send } from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Custom validation states to track individual field errors
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  // General error state to handle API route/network delivery failures
  const [submitError, setSubmitError] = useState('');

  const emailAddress = 'ishmamihi777@gmail.com';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const [submittedName, setSubmittedName] = useState('');

  /**
   * Client-side validation runner.
   * Ensures fields are filled and tests email format against a standard pattern.
   */
  const validateForm = () => {
    const newErrors = { name: '', email: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
        isValid = false;
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  /**
   * Helper that updates local form values.
   * Proactively clears validation errors once the user has fixed their entry.
   */
  const handleInputChange = (field: 'name' | 'email' | 'message', value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear validation error when field is corrected
    if (errors[field]) {
      setErrors((prev) => {
        const nextErrors = { ...prev };
        if (field === 'name' && value.trim()) nextErrors.name = '';
        if (field === 'message' && value.trim()) nextErrors.message = '';
        if (field === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (value.trim() && emailRegex.test(value)) nextErrors.email = '';
        }
        return nextErrors;
      });
    }
  };

  /**
   * Custom submit handler. Runs validations, halts on error,
   * and dispatches a JSON POST payload to our server API route.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    // Stop execution if front-end validations are not passed
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmittedName(formData.name);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message.');
      }

      // Finalize submission state
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setErrors({ name: '', email: '', message: '' });
    } catch (err: unknown) {
      console.error('Form submission exception:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
      setSubmitError(errorMessage);
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitSuccess(false);
    setSubmittedName('');
    setSubmitError('');
    setErrors({ name: '', email: '', message: '' });
  };

  return (
    <section 
      id="contact" 
      className="py-28 md:py-36 relative px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Side: Contact Information & Callouts */}
        <div className="lg:col-span-5">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-accent mb-4 block"
          >
            Get In Touch
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-8"
          >
            Let&apos;s <span className="text-glow text-accent">collaborate</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 font-light text-base md:text-lg mb-10 leading-relaxed"
          >
            Have a project in mind, want to discuss a script, edit footage, or capture beautiful frames? Let&apos;s build something unforgettable together.
          </motion.p>

          {/* Email Copy Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="p-6 bg-zinc-950/50 border border-white/10 glass-panel flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-zinc-900 border border-white/10 text-accent">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-1">
                  Direct Email
                </p>
                <a 
                  href={`mailto:${emailAddress}`}
                  className="text-white hover:text-accent font-medium transition-colors duration-300"
                >
                  {emailAddress}
                </a>
              </div>
            </div>
            
            <button
              onClick={copyToClipboard}
              className="flex items-center justify-center space-x-2 px-4 py-2 border border-white/10 hover:border-accent/50 text-gray-300 hover:text-accent text-xs uppercase tracking-wider transition-all duration-300 active:scale-95"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-500" />
                  <span className="text-emerald-500 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </motion.div>
        </div>

        {/* Right Side: Message Form or Success Feedback */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7 bg-zinc-950/30 border border-white/5 p-8 md:p-10 glass-panel min-h-[420px] flex flex-col justify-center"
        >
          <AnimatePresence mode="wait">
            {!submitSuccess ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="name" className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Your Name"
                      className={`bg-zinc-900/40 border px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 transition-all duration-300 text-sm ${
                        errors.name 
                          ? 'border-rose-500/50 focus:border-rose-500/80 focus:ring-rose-500/20' 
                          : 'border-white/10 focus:border-accent/40 focus:ring-accent/20'
                      }`}
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, height: 0, y: -5 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                          className="text-rose-400 text-xs font-light mt-1 pl-1"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="email" className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
                      Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Your Email Address"
                      className={`bg-zinc-900/40 border px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 transition-all duration-300 text-sm ${
                        errors.email 
                          ? 'border-rose-500/50 focus:border-rose-500/80 focus:ring-rose-500/20' 
                          : 'border-white/10 focus:border-accent/40 focus:ring-accent/20'
                      }`}
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, height: 0, y: -5 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                          className="text-rose-400 text-xs font-light mt-1 pl-1"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <label htmlFor="message" className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Describe your vision, project goals, or ideas..."
                    className={`bg-zinc-900/40 border px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 transition-all duration-300 text-sm resize-none ${
                      errors.message 
                        ? 'border-rose-500/50 focus:border-rose-500/80 focus:ring-rose-500/20' 
                        : 'border-white/10 focus:border-accent/40 focus:ring-accent/20'
                    }`}
                  />
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, height: 0, y: -5 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="text-rose-400 text-xs font-light mt-1 pl-1"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence>
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-3 bg-rose-950/35 border border-rose-900/40 rounded text-rose-300 text-xs text-center"
                    >
                      {submitError}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-accent hover:bg-accent/90 disabled:bg-accent/50 text-[#08080a] font-semibold tracking-widest uppercase text-xs transition-all duration-300 flex items-center justify-center space-x-2 active:scale-99"
                >
                  {isSubmitting ? (
                    <span>Sending Vision...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success-message"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center py-6 flex flex-col items-center space-y-6"
              >
                <div className="w-20 h-20 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center text-accent relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  >
                    <Check size={36} className="stroke-[2]" />
                  </motion.div>
                  <div className="absolute inset-0 rounded-full border border-accent/10 animate-ping opacity-30 pointer-events-none" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-white tracking-wide">
                    Message Sent
                  </h3>
                  <p className="text-gray-400 font-light text-sm md:text-base max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-accent font-normal">{submittedName}</span>! Your details have been submitted successfully. Ishmam will review and contact you shortly.
                  </p>
                </div>
                
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 border border-white/10 hover:border-accent/40 hover:text-accent text-white font-medium tracking-wider uppercase text-xs transition-all duration-300 active:scale-95"
                >
                  Send Another Message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
