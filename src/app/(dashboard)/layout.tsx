import DashboardHeader from "@/components/Dahsboard/Layout/DashboardHeader/main";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full h-full flex flex-col items-start overflow-hidden">
      <DashboardHeader />
      <div className="flex-1 h-full w-full">{children}</div>
      <div>nav</div>
    </div>
  );
}
