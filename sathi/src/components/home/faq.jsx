export default function FAQ() {
    const qas = [
        { q: "Is Sathi a substitute for therapy?", a: "No. Sathi offers supportive guidance and tools, and can help you find trusted consultants." },
        { q: "Is my data private?", a: "We collect the minimum needed to help you, with clear controls. See our Privacy page for details." },
        { q: "Can I use Sathi on mobile?", a: "Yes. Everything is responsive and touch‑friendly." }
    ];
    return (
        <section className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold">Common questions</h2>
            <div className="space-y-3">
                {qas.map((x, i) => (
                    <details key={i} className="group rounded-xl border p-4 open:bg-muted/50">
                        <summary className="cursor-pointer list-none font-medium">
                            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                {x.q}
                            </span>
                        </summary>
                        <p className="mt-2 text-sm text-muted-foreground">{x.a}</p>
                    </details>
                ))}
            </div>
        </section>
    );
}