import { Check } from "lucide-react";
import Image from "next/image";

export function HomeBenefits() {
  const benefits = [
    "Understand your strengths and weaknesses",
    "Stay motivated with visual progress tracking",
    "Organize your academic records in one place",
    "Identify trends in your semester performance",
    "Improve your study habits with actionable insights",
    "Set and achieve measurable GPA goals",
  ];

  return (
    <section className="py-24 bg-slate-50 sm:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div>
              <h2 className="text-base font-semibold leading-7 text-blue-600">Why Use This App</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
                Take control of your academic journey
              </p>
              <p className="text-lg leading-8 text-slate-600 mb-8">
                Traditional grading systems only tell you what happened, not why or how to improve. Our platform gives you the context you need to turn standard grades into an actionable plan for success.
              </p>
              
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                        <Check className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                    <span className="ml-4 text-base text-slate-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Right Content / Abstract Illustration */}
            <div className="relative isolate">
              <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-blue-100 to-emerald-50 rounded-3xl transform rotate-3 scale-105 blur-lg opacity-50"></div>
              <div className="bg-white rounded-3xl p-8 shadow-xl ring-1 ring-slate-100 relative">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Current Semester</h3>
                    <p className="text-sm text-slate-500">Fall 2024</p>
                  </div>
                  <div className="bg-emerald-50 text-emerald-700 font-semibold px-3 py-1 rounded-full text-sm flex items-center">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
                    On Track
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Mock Progress Bars */}
                  {[
                    { subject: "Computer Science 101", grade: "A-", percent: 92, color: "bg-emerald-500" },
                    { subject: "Calculus II", grade: "B+", percent: 88, color: "bg-blue-500" },
                    { subject: "Physics", grade: "B", percent: 84, color: "bg-indigo-500" },
                    { subject: "Literature", grade: "A", percent: 96, color: "bg-purple-500" },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-slate-700">{item.subject}</span>
                        <span className="font-semibold text-slate-900">{item.grade}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5">
                        <div className={`${item.color} h-2.5 rounded-full`} style={{ width: `${item.percent}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Estimated GPA</p>
                      <p className="text-3xl font-bold text-slate-900 mt-1">3.68</p>
                    </div>
                    <div className="h-16 w-16 rounded-full border-4 border-emerald-500 border-r-emerald-100 flex items-center justify-center transform -rotate-45">
                      <span className="transform rotate-45 text-sm font-semibold text-slate-700">+0.2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
