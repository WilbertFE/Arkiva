"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, BookOpen, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';

const Highlight = ({ children, delay }: { children: React.ReactNode, delay: number }) => (
  <span className="relative inline-block whitespace-nowrap">
    <motion.span
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      style={{ transformOrigin: "left" }}
      className="absolute bottom-1 left-0 right-0 h-3 bg-amber-300/80 rounded-sm"
    />
    <span className="relative z-10 font-medium text-slate-800">{children}</span>
  </span>
);

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-32 sm:pt-32 sm:pb-40">
      {/* Decorative background shapes */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" 
        aria-hidden="true"
      >
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </motion.div>

      <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 hover:bg-blue-100 transition-colors cursor-default">
              <motion.span 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"
              ></motion.span>
              Smarter Grade Tracking
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-6 min-h-[120px] sm:min-h-0 drop-shadow-md"
          >
            Track Your Academic Progress with{" "}
            <span className="text-blue-600">
              <Typewriter
                words={['Clarity', 'Confidence', 'Precision', 'Focus']}
                loop={0}
                cursor
                cursorStyle='|'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg leading-8 text-slate-600 mb-10 max-w-2xl mx-auto"
          >
            Input your <Highlight delay={0.6}>semester grades</Highlight>, analyze <Highlight delay={0.8}>subject performance</Highlight>, and stay on top of your <Highlight delay={1.0}>academic goals</Highlight> with our <Highlight delay={1.2}>intuitive dashboard</Highlight> designed specifically for students.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8 group" asChild>
              <Link href="/register">
                Get Started 
                <motion.div
                  className="inline-block ml-2"
                  whileHover={{ x: 5 }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-12 px-8" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </motion.div>
        </div>

        {/* Dashboard Preview / Illustration Placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="mt-16 sm:mt-24 relative mx-auto max-w-5xl"
        >
          <div className="rounded-xl bg-slate-50/50 p-2 ring-1 ring-inset ring-slate-200/50 lg:-m-4 lg:rounded-2xl lg:p-4 shadow-2xl overflow-hidden backdrop-blur-sm">
            <div className="rounded-md ring-1 ring-slate-200 bg-white p-4 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  icon: BarChart3, 
                  label: "Performance Metrics", 
                  description: "Track your GPA instantly",
                  gradient: "from-blue-500/10 to-indigo-500/10",
                  iconGrad: "from-blue-500 to-indigo-500",
                  shadow: "shadow-blue-500/5",
                  delay: 0.6 
                },
                { 
                  icon: BookOpen, 
                  label: "Subject Analysis", 
                  description: "Find your strengths",
                  gradient: "from-emerald-500/10 to-teal-500/10",
                  iconGrad: "from-emerald-500 to-teal-500",
                  shadow: "shadow-emerald-500/5",
                  delay: 0.7 
                },
                { 
                  icon: GraduationCap, 
                  label: "GPA Tracking", 
                  description: "Monitor your progress",
                  gradient: "from-purple-500/10 to-pink-500/10",
                  iconGrad: "from-purple-500 to-pink-500",
                  shadow: "shadow-purple-500/5",
                  delay: 0.8 
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: item.delay, duration: 0.6, type: "spring", stiffness: 100 }}
                  whileHover={{ 
                    y: -8, 
                    transition: { duration: 0.3 } 
                  }}
                  className={`relative group h-48 rounded-xl bg-gradient-to-br ${item.gradient} border border-slate-100/50 flex flex-col items-center justify-center p-6 text-slate-700 shadow-lg ${item.shadow} ${i === 2 ? 'md:col-span-1 col-span-1' : ''}`}
                >
                  <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 4, delay: i * 0.5, ease: "easeInOut" }}
                    className="flex flex-col items-center"
                  >
                    <div className={`relative mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.iconGrad} shadow-inner`}>
                      <div className="absolute inset-0 rounded-2xl bg-white/20 backdrop-blur-sm group-hover:bg-white/10 transition-colors" />
                      <item.icon className="relative z-10 h-6 w-6 text-slate-800 drop-shadow-sm group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    
                    <div className="font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{item.label}</div>
                    <div className="text-xs text-slate-500 tracking-wide">{item.description}</div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
