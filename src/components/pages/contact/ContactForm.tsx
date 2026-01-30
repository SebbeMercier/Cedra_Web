import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

interface ContactFormProps {
  t: any;
}

export function ContactForm({ t }: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
      {success ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-2">
            {t.contact.success}
          </h3>
          <p className="text-zinc-500 mb-8">
            Nous vous recontacterons très prochainement.
          </p>
          <Button
            onClick={() => setSuccess(false)}
            variant="outline"
            className="border-white/10 rounded-xl px-8 uppercase font-black tracking-widest text-[10px]"
          >
            Nouveau Message
          </Button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                {t.contact.name}
              </Label>
              <Input
                required
                className="bg-white/5 border-white/10 h-14 rounded-2xl focus:border-cedra-500"
                placeholder="Jean Dupont"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                {t.contact.email}
              </Label>
              <Input
                type="email"
                required
                className="bg-white/5 border-white/10 h-14 rounded-2xl focus:border-cedra-500"
                placeholder="jean@entreprise.be"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
              {t.contact.subject}
            </Label>
            <Input
              required
              className="bg-white/5 border-white/10 h-14 rounded-2xl focus:border-cedra-500"
              placeholder="Devis pour projet industriel"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
              {t.contact.message}
            </Label>
            <Textarea
              required
              className="bg-white/5 border-white/10 min-h-[160px] rounded-3xl focus:border-cedra-500 p-4"
              placeholder="Comment pouvons-nous vous aider ?"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-16 bg-white text-black hover:bg-cedra-500 hover:text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-xl transition-all flex items-center justify-center gap-3"
          >
            {loading ? (
              "..."
            ) : (
              <>
                <MessageSquare size={18} />
                {t.contact.send}
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
