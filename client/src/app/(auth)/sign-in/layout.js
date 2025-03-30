
export default function AuthLayout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Left side - Government template */}
      <div className="w-1/2 bg-gray-100">

      </div>
      
      {/* Right side - Auth content */}
      <div className="w-1/2">
        {children}
      </div>
    </div>
  );
}