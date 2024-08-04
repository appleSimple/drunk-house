export default function HomeLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <h1>🍷 Drunk House</h1>
      {children}
    </section>
  )
}