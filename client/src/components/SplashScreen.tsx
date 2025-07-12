// components/SplashScreen.tsx
export default function SplashScreen() {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-900 text-white text-center px-6">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-sm text-gray-400">Loading...</p>
      </div>
    );

}
