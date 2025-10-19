export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full h-full overflow-hidden flex flex-col items-center justify-center">
        {children}
      </body>
    </html>
  );
}
