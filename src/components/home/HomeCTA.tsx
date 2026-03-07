import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HomeCTA() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-slate-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Start tracking your academic progress today.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Join thousands of students who have already improved their study habits and gained clarity on their academic performance.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 h-12 px-8 text-base font-semibold" asChild>
              <Link href="/register">Sign Up Free</Link>
            </Button>
            <Button size="lg" variant="link" className="text-white hover:text-slate-200 text-base font-semibold" asChild>
              <Link href="/demo">
                Try Demo <span aria-hidden="true">→</span>
              </Link>
            </Button>
          </div>
          
          {/* Decorative Background gradient */}
          <div className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
            <div
              className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
              style={{
                clipPath:
                  "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
