export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 bg-white z-999 flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4" />
      <p className="text-slate-500 font-medium animate-pulse">Loading...</p>
    </div>
  );
}