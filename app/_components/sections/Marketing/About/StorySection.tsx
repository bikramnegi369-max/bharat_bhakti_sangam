import { cinzel } from "@/_lib/fonts";
import clsx from "clsx";

export default function StorySection() {
  return (
    <section className="relative text-center -mt-30 lg:-mt-40 z-10 py-[clamp(2.5rem,calc(1.786rem+3.571vw),5rem)]">
      <div className="max-w-7xl mx-auto px-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)]">
        <div className="border-3 border-primary rounded-md p-[clamp(1.25rem,calc(0.893rem+1.786vw),2.5rem)] bg-primary_light">
          <div>
            <h2
              className={clsx(
                "text-[clamp(1.25rem,calc(1.071rem+0.893vw),1.875rem)] font-bold mb-6",
                cinzel.className,
              )}
            >
              Our <span className="text-primary">story</span>
            </h2>
            <p className="text-para/80 text-[clamp(0.875rem,calc(0.804rem+0.357vw),1.125rem)] font-medium leading-relaxed">
              Bharat Bhakti Sangam was created with a simple vision—to transform
              devotion into a vibrant collective experience. We organize
              immersive Bhajan Clubbing events where spirituality, music, and
              celebration come together, creating unforgettable moments for
              devotees across India.
            </p>
          </div>
          <div className="my-8 h-px w-full bg-para/30" />
          <div>
            <h2
              className={clsx(
                "text-[clamp(1.25rem,calc(1.071rem+0.893vw),1.875rem)] font-bold mb-6",
                cinzel.className,
              )}
            >
              What we <span className="text-primary">do</span>
            </h2>
            <p className="text-para/80 text-[clamp(0.875rem,calc(0.804rem+0.357vw),1.125rem)] font-medium leading-relaxed">
              From soulful kirtans to large-scale devotional gatherings, we
              curate events that blend traditional bhajans with contemporary
              energy. Every experience is thoughtfully designed to inspire
              connection, joy, and inner peace.
            </p>
          </div>
          <div className="my-8 h-px w-full bg-para/30" />
          <div>
            <h2
              className={clsx(
                "text-[clamp(1.25rem,calc(1.071rem+0.893vw),1.875rem)] font-bold mb-6",
                cinzel.className,
              )}
            >
              Why we <span className="text-primary">exist</span>
            </h2>
            <p className="text-para/80 text-[clamp(0.875rem,calc(0.804rem+0.357vw),1.125rem)] font-medium leading-relaxed">
              In today&rsquo;s fast-paced world, we aim to reconnect people with
              their spiritual roots through music, community, and shared
              devotion. Our events offer a refreshing escape where faith becomes
              celebration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
