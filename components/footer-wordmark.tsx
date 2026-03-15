export function FooterWordmark({ text }: { text: string }) {
  return (
    <div className="relative overflow-hidden py-7 text-center sm:py-9 md:py-10">
      <p
        className="inline-block select-none whitespace-nowrap text-[clamp(2rem,11vw,11.25rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-zinc-900 dark:text-zinc-100"
      >
        {text}
      </p>
    </div>
  );
}
