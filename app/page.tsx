import Image from "next/image";
import Link from "next/link";

const cards = [
  {
    id: "cafe",
    title: "Street Cafe",
    description:
      "Experience real-time smart ordering personalized customer flows.",
    href: "/cafe",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
    active: true,
  },
  {
    id: "classroom",
    title: "Classroom",
    description:
      "Experience real-time smart ordering personalized customer flows.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "construction",
    title: "Construction Site",
    description:
      "Experience real-time smart ordering personalized customer flows.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#e8ebf5] to-white text-[#1c1c1c]">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),rgba(255,255,255,0.2)_60%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,120,120,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,120,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center px-6 pb-24 pt-20">
        <header className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <h1 className="whitespace-nowrap text-4xl font-semibold leading-tight md:text-6xl">
            Discover the{" "}
            <span className="bg-gradient-to-br from-[#3d4e81] via-[#5753c9] to-[#6e7ff3] bg-clip-text text-transparent">
              Impact of AI
            </span>
          </h1>
          <p className="text-lg text-[#666]">
            Explore how artificial intelligence is transforming businesses and
            enhancing efficiency in real-world environments.
          </p>
        </header>

        <section className="mt-16 grid w-full gap-10 md:grid-cols-3">
          {cards.map((card) => {
            const cardBody = (
              <>
                <div className="h-[250px] w-full overflow-hidden rounded-xl bg-[#f3f4f6] shadow-[0px_1.7px_5.3px_rgba(0,0,0,0.1)]">
                  <div className="relative h-full w-full">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {card.active && (
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <span className="rounded-full bg-black px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0px_12px_24px_rgba(0,0,0,0.2)]">
                          Enter Experience
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex w-full flex-col items-center gap-2 text-center">
                  <p className="text-lg font-medium">{card.title}</p>
                  <p className="text-sm text-black/60">{card.description}</p>
                </div>
              </>
            );

            return card.active ? (
              <Link
                key={card.id}
                href={card.href}
                className="group flex flex-col items-center gap-4 rounded-2xl bg-white p-4 shadow-[0px_2px_8px_rgba(0,0,0,0.15)] transition hover:-translate-y-1"
              >
                {cardBody}
              </Link>
            ) : (
              <div
                key={card.id}
                className="flex flex-col items-center gap-4 rounded-2xl bg-white p-4 shadow-[0px_2px_8px_rgba(0,0,0,0.12)]"
              >
                {cardBody}
              </div>
            );
          })}
        </section>

      </div>
    </div>
  );
}
