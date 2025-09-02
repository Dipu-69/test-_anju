import { useState } from "react";
import { Button } from "../ui/button";

const moods = [
    { key: "calm", label: "Calm", gradient: "from-teal-400 to-emerald-500", emoji: "🫶" },
    { key: "stressed", label: "Stressed", gradient: "from-amber-400 to-orange-500", emoji: "😮‍💨" },
    { key: "anxious", label: "Anxious", gradient: "from-indigo-400 to-blue-600", emoji: "😟" },
    { key: "sad", label: "Sad", gradient: "from-sky-400 to-cyan-500", emoji: "😔" },
    { key: "angry", label: "Angry", gradient: "from-rose-400 to-pink-500", emoji: "😤" },
    { key: "grateful", label: "Grateful", gradient: "from-violet-400 to-fuchsia-500", emoji: "🌸" },
    { key: "tired", label: "Tired", gradient: "from-slate-400 to-zinc-600", emoji: "🥱" }
];

const tips = {
    calm: "Nice. Consider a gratitude prompt to reinforce the calm.",
    stressed: "Try 1 minute of Box Breathing: inhale 4 • hold 4 • exhale 4 • hold 4.",
    anxious: "Ground yourself with 5-4-3-2-1: see 5, touch 4, hear 3, smell 2, taste 1.",
    sad: "A short “name the feeling” journaling note can help soften the weight.",
    angry: "Pause for 10 slow breaths, then plan one small next step.",
    grateful: "Write one thing you’re thankful for and why it matters today.",
    tired: "A mini body scan can help you rest: notice toes → legs → belly → shoulders."
};

export default function MoodStrip() {
    const [selected, setSelected] = useState(null);

    return (
        <section className="space-y-4">
            <header className="flex items-center justify-between">
                <h2 className="text-xl md:text-2xl font-bold">How are you feeling today?</h2>
                <Button variant="secondary" size="sm" onClick={() => setSelected(null)}>Reset</Button>
            </header>

            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
                {moods.map((m) => (
                    <button
                        key={m.key}
                        onClick={() => setSelected(m.key)}
                        className={`shrink-0 rounded-full px-4 py-2 text-sm text-white shadow transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 bg-gradient-to-r ${m.gradient} ${selected === m.key ? "scale-[1.03]" : "hover:scale-[1.03]"}`}
                        aria-pressed={selected === m.key}
                    >
                        <span className="mr-1">{m.emoji}</span> {m.label}
                    </button>
                ))}
            </div>

            <div className="min-h-[52px]" aria-live="polite" aria-atomic="true">
                {selected && (
                    <div className="rounded-xl border bg-gradient-to-r from-primary/10 via-accent/10 to-transparent p-4 text-sm">
                        <span className="font-medium mr-1">Tip:</span>
                        {tips[selected]}
                    </div>
                )}
            </div>
        </section>
    );
}