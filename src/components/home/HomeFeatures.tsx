"use client";

import { BookOpen, LineChart, Target, Timer } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const features = [
  {
    name: "Track Semester Grades",
    description: "Easily input and organize your grades by semester and subject to keep a clean academic record.",
    icon: BookOpen,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    name: "Subject Performance Analysis",
    description: "Understand your strengths and weaknesses with detailed breakdowns of your performance per subject.",
    icon: Target,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    name: "Visual Progress Charts",
    description: "Watch your GPA grow over time with beautiful, easy-to-understand charts and visual insights.",
    icon: LineChart,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
  {
    name: "Study Tools & Focus Timer",
    description: "Boost your productivity with built-in tools like a focus timer to help you study more effectively.",
    icon: Timer,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
];

export function HomeFeatures() {
  return (
    <section id="features" className="py-24 bg-slate-50 sm:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center mb-16"
        >
          <h2 className="text-base font-semibold leading-7 text-blue-600">Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need for academic success
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Our platform provides powerful tools designed to help students analyze performance and stay focused on their educational journey.
          </p>
        </motion.div>

        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="border-none shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                  <CardHeader>
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.bgColor} transform transition-transform duration-300 hover:scale-110`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} aria-hidden="true" />
                    </div>
                    <CardTitle className="text-xl">{feature.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-7 text-slate-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
