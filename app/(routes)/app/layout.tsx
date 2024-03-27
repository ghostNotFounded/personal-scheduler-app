import Sidebar from "@/components/sidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className={`flex bg-neutral-950 text-white h-screen w-screen overflow-hidden`}
    >
      <Sidebar />

      {children}
    </main>
  );
}
