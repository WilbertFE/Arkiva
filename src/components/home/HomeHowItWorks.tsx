"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function HomeHowItWorks() {
  const steps = [
    {
      id: "01",
      title: "Add your semester grades",
      description: "Quickly input your courses, credits, and grades for the current or past semesters into our secure platform.",
    },
    {
      id: "02",
      title: "Analyze subject performance",
      description: "Our system automatically calculates your GPA and generates visual reports of your strongest and weakest subjects.",
    },
    {
      id: "03",
      title: "Improve your study strategy",
      description: "Use personalized insights and focus tools to dedicate more time to challenging subjects and boost your overall performance.",
    },
  ];

  return (
    <section className="py-24 bg-white sm:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <h2 className="text-base font-semibold leading-7 text-blue-600">Simple Process</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How it works in 3 easy steps
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Getting started is completely free and only takes a few minutes. Start mastering your academic life today.
          </p>
        </motion.div>

        <div className="mx-auto max-w-5xl mt-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 md:gap-8 relative">
            {/* Background Connector Line (Desktop only) */}
            <div className="hidden lg:block absolute top-8 left-[15%] w-[70%] h-[2px] bg-slate-100 -z-10" />
            
            {steps.map((step, index) => (
              <motion.div 
                key={step.id} 
                className="relative flex flex-col items-center text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 border-4 border-white shadow-sm ring-1 ring-slate-100 mb-6 transition-all duration-300 group-hover:bg-blue-100 group-hover:scale-110">
                  <span className="text-xl font-bold text-blue-600">{step.id}</span>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-slate-900">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
                
                <div className="mt-6 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 opacity-0 lg:opacity-100 lg:group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
