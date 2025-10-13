export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full h-full overflow-hidden flex flex-col items-center justify-center bg-[#1E253C] text-white">
        {children}
      </body>
    </html>
  );
}
