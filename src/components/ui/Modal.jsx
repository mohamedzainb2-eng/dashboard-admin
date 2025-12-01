import Button from "./Button";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ title, open, onClose, children, footer }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col"
            initial={{ y: 40, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-sm font-semibold">{title}</h2>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>
            <div className="px-4 py-4 flex-1 overflow-auto">{children}</div>
            <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              {footer || (
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
