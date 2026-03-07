import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, BookOpen, GraduationCap } from "lucide-react";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-32 sm:pt-32 sm:pb-40">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex justify-center">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
              Smarter Grade Tracking
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-6">
            Track Your Academic Progress with <span className="text-blue-600">Clarity</span>
          </h1>
          <p className="text-lg leading-8 text-slate-600 mb-10 max-w-2xl mx-auto">
            Input your semester grades, analyze subject performance, and stay on top of your academic goals with our intuitive dashboard designed specifically for students.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8" asChild>
              <Link href="/register">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-12 px-8" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>

        {/* Dashboard Preview / Illustration Placeholder */}
        <div className="mt-16 sm:mt-24 relative mx-auto max-w-5xl">
          <div className="rounded-xl bg-slate-50/50 p-2 ring-1 ring-inset ring-slate-200/50 lg:-m-4 lg:rounded-2xl lg:p-4 shadow-2xl overflow-hidden backdrop-blur-sm">
            <div className="rounded-md ring-1 ring-slate-200 bg-white p-4 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-48 rounded-lg bg-blue-50 border border-blue-100 flex flex-col items-center justify-center p-6 text-blue-600">
                <BarChart3 className="h-12 w-12 mb-4 opacity-50" />
                <div className="font-medium">Performance Metrics</div>
              </div>
              <div className="h-48 rounded-lg bg-emerald-50 border border-emerald-100 flex flex-col items-center justify-center p-6 text-emerald-600">
                <BookOpen className="h-12 w-12 mb-4 opacity-50" />
                <div className="font-medium">Subject Analysis</div>
              </div>
              <div className="h-48 rounded-lg bg-indigo-50 border border-indigo-100 flex flex-col items-center justify-center p-6 text-indigo-600 md:col-span-1 col-span-1">
                <GraduationCap className="h-12 w-12 mb-4 opacity-50" />
                <div className="font-medium">GPA Tracking</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
