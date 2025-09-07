import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// --- TERIMA PROPS BARU: 'maxWidth' dengan nilai default 'max-w-md' ---
const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }) => {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const modalVariants = {
    hidden: { y: "-50%", x: "-50%", opacity: 0, scale: 0.9 },
    visible: { y: "-50%", x: "-50%", opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } },
    exit: { y: "-40%", x: "-50%", opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/70 z-40"
          />
          <motion.div
            key="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            // --- GUNAKAN PROPS 'maxWidth' DI SINI ---
            className={`fixed top-1/2 left-1/2 bg-gray-800/80 backdrop-blur-lg border border-white/10 rounded-xl p-6 z-50 w-full ${maxWidth} shadow-2xl`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">{title}</h3>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors">
                <X size={24} />
              </button>
            </div>
            <div>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;