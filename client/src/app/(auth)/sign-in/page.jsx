"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignInOptionsPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax effect
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const MotionButton = motion.create(Button);
  const MotionCard = motion.create(Card);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Parallax Background */}
      <motion.div 
        className="fixed inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 z-0"
        style={{ y: backgroundY }}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl"></div>
        </div>
      </motion.div>

      {/* Header */}
      <header className="relative z-10 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-2 mr-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
                  </div>
                  <span className="text-xl font-bold text-white">SecurePortal</span>
                </div>
              </div>
            </div>
            <nav className="hidden md:block">
              <div className="flex items-center space-x-4">
                <a href="#" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">Home</a>
                <a href="#" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">Features</a>
                <a href="#" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">About</a>
                <a href="#" className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">Contact</a>
              </div>
            </nav>
            <div className="hidden md:block">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                Help Center
              </Button>
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="sm" className="text-gray-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="w-full max-w-2xl mx-auto space-y-6"
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          variants={containerVariants}
          style={{ opacity }}
        >
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
            className="text-center mb-8"
          >
            <div className="inline-block p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-5 shadow-lg shadow-blue-500/30">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Welcome to SecurePortal</h1>
            <p className="text-gray-300 max-w-md mx-auto">Access your secure account and manage your resources efficiently.</p>
          </motion.div>
          
          {/* Information Card */}
          <MotionCard 
            variants={itemVariants} 
            className="overflow-hidden shadow-2xl border border-gray-700 rounded-xl bg-gray-800/90 backdrop-blur-sm"
          >
            <CardHeader className="pb-2 pt-6 bg-gradient-to-b from-gray-800 to-gray-800">
              <CardTitle className="text-2xl sm:text-3xl font-bold text-white text-center">
                Portal Information
              </CardTitle>
              <motion.p 
                className="text-gray-300 text-center mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Learn about our secure access system
              </motion.p>
            </CardHeader>
            <CardContent className="pt-4 pb-6 px-6 sm:px-8 bg-gray-800 border-t border-gray-700">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="rounded-lg bg-gray-900/70 p-4 border border-gray-700"
              >
                <h3 className="text-lg font-semibold text-blue-400 mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9, 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Government Portal Information
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  Access the secure government portal for managing:
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <motion.li 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 }}
                  >
                    <span className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    Document submission and approval workflows
                  </motion.li>
                  <motion.li 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 }}
                  >
                    <span className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    Contract tracking and procurement administration
                  </motion.li>
                  <motion.li 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    <span className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    Budget allocation and financial reporting tools
                  </motion.li>
                  <motion.li 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 }}
                  >
                    <span className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    Compliance monitoring and regulatory oversight
                  </motion.li>
                </ul>
                <motion.div 
                  className="mt-4 flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <Link href="/government-features">
                    <span className="text-xs text-blue-400 hover:text-blue-300 flex items-center group cursor-pointer">
                      Learn more about government features
                      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            </CardContent>
          </MotionCard>

          {/* Sign In Buttons Card */}
          <MotionCard 
            variants={itemVariants} 
            className="overflow-hidden shadow-2xl border border-gray-700 rounded-xl bg-gray-800/90 backdrop-blur-sm"
          >
            <CardHeader className="pb-2 pt-6 bg-gradient-to-b from-gray-800 to-gray-800">
              <CardTitle className="text-2xl sm:text-3xl font-bold text-white text-center">
                Sign In Options
              </CardTitle>
              <motion.p 
                className="text-gray-300 text-center mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Choose your role to access the system
              </motion.p>
            </CardHeader>
            <CardContent className="pt-6 pb-8 px-6 sm:px-8 bg-gray-800">
              <div className="space-y-5 sm:space-y-6">
                <motion.div 
                  variants={itemVariants}
                  custom={1}
                  whileHover={{ scale: 1.03 }}
                >
                  <Link href="/sign-in/government" className="block w-full">
                    <MotionButton
                      variant="default"
                      className="w-full p-4 sm:p-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-base sm:text-lg flex items-center justify-center rounded-lg shadow-lg shadow-blue-700/20"
                      whileHover={{ 
                        scale: 1.04, 
                        y: -4,
                        boxShadow: "0 15px 25px rgba(37, 99, 235, 0.25)",
                      }}
                      whileTap={{ scale: 0.97, boxShadow: "0 5px 15px rgba(37, 99, 235, 0.15)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>Sign in as Government</span>
                    </MotionButton>
                  </Link>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  custom={2}
                  whileHover={{ scale: 1.03 }}
                >
                  <Link href="/sign-in/supplier" className="block w-full">
                    <MotionButton
                      variant="default"
                      className="w-full p-4 sm:p-5 bg-gradient-to-r from-emerald-600 to-teal-700 text-base sm:text-lg flex items-center justify-center rounded-lg shadow-lg shadow-emerald-700/20"
                      whileHover={{ 
                        scale: 1.04, 
                        y: -4,
                        boxShadow: "0 15px 25px rgba(5, 150, 105, 0.25)",
                      }}
                      whileTap={{ scale: 0.97, boxShadow: "0 5px 15px rgba(5, 150, 105, 0.15)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span>Sign in as Supplier</span>
                    </MotionButton>
                  </Link>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  custom={3}
                  whileHover={{ scale: 1.03 }}
                >
                  <Link href="/sign-in/contractor/corporate-contractor" className="block w-full">
                    <MotionButton
                      variant="default"
                      className="w-full p-4 sm:p-5 bg-gradient-to-r from-amber-500 to-orange-600 text-base sm:text-lg flex items-center justify-center rounded-lg shadow-lg shadow-orange-600/20"
                      whileHover={{ 
                        scale: 1.04, 
                        y: -4,
                        boxShadow: "0 15px 25px rgba(234, 88, 12, 0.25)",
                      }}
                      whileTap={{ scale: 0.97, boxShadow: "0 5px 15px rgba(234, 88, 12, 0.15)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-3 sm:mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span>Sign in as Contractor</span>
                    </MotionButton>
                  </Link>
                </motion.div>
              </div>
              
              <motion.div 
                className="mt-8 text-center text-sm text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                Need help? <a href="#" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">Contact support</a>
              </motion.div>
            </CardContent>
          </MotionCard>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 md:py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-1">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-2 mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
                  </div>
                  <span className="text-lg font-bold text-white">SecurePortal</span>
                </div>
                <p className="text-sm text-gray-400">Secure access management for government, suppliers, and contractors.</p>
              </div>
              
              <div className="md:col-span-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Resources</h3>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                      <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
                      <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">FAQs</a></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Company</h3>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">About Us</a></li>
                      <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Careers</a></li>
                      <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</a></li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Legal</h3>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                      <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                      <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Security</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">&copy; 2025 SecurePortal. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}