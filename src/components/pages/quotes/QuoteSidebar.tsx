import React from "react";

interface QuoteSidebarProps {
  t: any;
  Calculator: any;
  ListChecks: any;
  Send: any;
  ArrowRight: any;
}

export function QuoteSidebar({
  t,
  Calculator,
  ListChecks,
  Send,
  ArrowRight,
}: QuoteSidebarProps) {
  return (
    <div className="lg:col-span-1 space-y-6">
      <div className="bg-white/[0.02] backdrop-blur-3xl p-10 rounded-[3rem] border border-white/5 sticky top-32">
        <div className="w-16 h-16 bg-cedra-500/10 rounded-2xl flex items-center justify-center text-cedra-500 mb-8 border border-cedra-500/20">
          <Calculator size={32} />
        </div>
        <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-4 text-white">
          {t.quotes.sidebarTitle}
        </h2>
        <p className="text-zinc-400 text-sm leading-relaxed mb-10 font-medium">
          {t.quotes.sidebarDesc}
        </p>

        <div className="space-y-6">
          <QuoteStep
            icon={<ListChecks size={20} />}
            title={t.quotes.step1Title}
            text={t.quotes.step1Desc}
          />
          <QuoteStep
            icon={<Send size={20} />}
            title={t.quotes.step2Title}
            text={t.quotes.step2Desc}
          />
          <QuoteStep
            icon={<ArrowRight size={20} />}
            title={t.quotes.step3Title}
            text={t.quotes.step3Desc}
          />
        </div>
      </div>
    </div>
  );
}

function QuoteStep({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="text-cedra-500 mt-1">{icon}</div>
      <div>
        <h4 className="text-white font-black uppercase italic text-[10px] tracking-widest">
          {title}
        </h4>
        <p className="text-zinc-500 text-[11px] font-medium leading-tight mt-1">
          {text}
        </p>
      </div>
    </div>
  );
}
