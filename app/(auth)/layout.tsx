export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-cover bg-no-repeat bg-left bg-[url('/cowork.jpg')] ">
        {children}
      </div>
    );
  };