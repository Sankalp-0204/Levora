import Link from "next/link";
import Button from "@/components/ui/Button";

export default function WatchDetailNotFound() {
  return (
    <main className="min-h-screen bg-surface-vault flex items-center justify-center p-6 text-center">
      <div className="max-w-[50ch] flex flex-col items-center gap-6">
        <span className="type-caption text-gold-parchment uppercase tracking-widest">
          Archive Not Found
        </span>
        <h1 className="type-h2 text-ink-white m-0">
          This Edition Does Not Exist
        </h1>
        <p className="type-body text-ink-200">
          The requested watch is not part of the current Heritage Collection
          archives. It may have been a private commission or an incorrect entry.
        </p>
        <Link href="/collections/heritage" className="mt-4">
          <Button variant="ghost">Return to Collection</Button>
        </Link>
      </div>
    </main>
  );
}
