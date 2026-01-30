import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddressFormProps {
  formData: any;
  setFormData: (data: any) => void;
  handleCreate: (e: React.FormEvent) => void;
  isCreating: boolean;
  error: string | null;
  setShowCreateForm: (val: boolean) => void;
}

export function AddressForm({
  formData,
  setFormData,
  handleCreate,
  isCreating,
  error,
  setShowCreateForm,
}: AddressFormProps) {
  return (
    <div className="bg-zinc-950 border border-white/10 p-8 rounded-[2rem] relative">
      <h3 className="text-xl font-bold text-white mb-6">New Delivery Point</h3>
      <form onSubmit={handleCreate} className="space-y-6">
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-3"
            >
              <AlertCircle className="text-red-500" size={16} />
              <p className="text-red-500 text-xs font-bold">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Location Label (e.g. Home)</Label>
            <Input
              placeholder="Home"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-white/5 border-white/10"
              required
            />
          </div>
          <div>
            <Label>Recipient Name</Label>
            <Input
              placeholder="John Doe"
              value={formData.recipient_name}
              onChange={(e) =>
                setFormData({ ...formData, recipient_name: e.target.value })
              }
              className="bg-white/5 border-white/10"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <Label>Street</Label>
            <Input
              placeholder="Rue de la Loi"
              value={formData.street}
              onChange={(e) =>
                setFormData({ ...formData, street: e.target.value })
              }
              className="bg-white/5 border-white/10"
              required
            />
          </div>
          <div>
            <Label>No.</Label>
            <Input
              placeholder="16"
              value={formData.number}
              onChange={(e) =>
                setFormData({ ...formData, number: e.target.value })
              }
              className="bg-white/5 border-white/10"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Label>Box</Label>
            <Input
              placeholder="B"
              value={formData.box}
              onChange={(e) => setFormData({ ...formData, box: e.target.value })}
              className="bg-white/5 border-white/10"
            />
          </div>
          <div>
            <Label>Zip</Label>
            <Input
              placeholder="1000"
              value={formData.postal_code}
              onChange={(e) =>
                setFormData({ ...formData, postal_code: e.target.value })
              }
              className="bg-white/5 border-white/10"
              required
            />
          </div>
          <div className="col-span-2">
            <Label>City</Label>
            <Input
              placeholder="Brussels"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="bg-white/5 border-white/10"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Contact Email</Label>
            <Input
              type="email"
              placeholder="contact@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-white/5 border-white/10"
            />
          </div>
          <div>
            <Label>Contact Phone</Label>
            <Input
              type="tel"
              placeholder="+32..."
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-white/5 border-white/10"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setShowCreateForm(false)}
            className="text-white/40 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isCreating}
            className="bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest text-[10px] w-32"
          >
            {isCreating ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}
