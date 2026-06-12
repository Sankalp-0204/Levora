import Button from "@/components/ui/Button";

interface PrivateSalonCTAProps {
  invitationCopy: string;
  watchName: string;
}

export function PrivateSalonCTA({
  invitationCopy,
  watchName,
}: PrivateSalonCTAProps) {
  return (
    <section className="container-bleed section-pad-xl relative overflow-hidden bg-surface-vault border-t border-rule-warm">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-gold-900)_0%,_transparent_70%)] opacity-20 pointer-events-none" />

      <div className="container-content relative z-10 flex flex-col items-center text-center">
        <span className="type-caption text-gold-parchment uppercase tracking-widest mb-6">
          The Private Salon
        </span>
        
        <h2 className="type-h2 text-ink-white mb-6">Request Consultation</h2>
        
        <p className="type-body text-ink-200 max-w-[50ch] mb-10">
          {invitationCopy}
        </p>

        <div className="flex flex-col gap-4 items-center">
          <Button variant="ghost" className="min-w-[240px]">
            Inquire About {watchName}
          </Button>
          <span className="type-caption text-ink-400">
            Available in New Delhi & Geneva
          </span>
        </div>
      </div>
    </section>
  );
}
