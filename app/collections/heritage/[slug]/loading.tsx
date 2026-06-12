export default function WatchDetailLoading() {
  return (
    <main className="min-h-screen bg-surface-vault flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <div className="w-12 h-12 rounded-full border border-gold-400 opacity-20 flex items-center justify-center">
          <div className="w-1 h-1 bg-gold-raw rounded-full"></div>
        </div>
        <span className="type-caption text-gold-parchment uppercase tracking-widest opacity-60">
          Retrieving Archives...
        </span>
      </div>
    </main>
  );
}
