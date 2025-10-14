export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="w-full h-screen overflow-hidden">{children}</div>;
}
