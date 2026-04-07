interface SectionHeadingProps {
  eyebrow: string
  title: string
  description: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="kicker">{eyebrow}</p>
      <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-[-0.03em] text-ink-950 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-ink-700 sm:text-lg">
        {description}
      </p>
    </div>
  )
}
