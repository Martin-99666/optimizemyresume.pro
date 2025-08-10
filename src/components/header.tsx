interface HeaderProps {
  title: string
  subtitle: string
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        {title}
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  )
}