import React from 'react';
import { motion } from 'framer-motion';

const EmptyState = ({ icon, title, message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center p-10 bg-gray-800/50 backdrop-blur-md border border-white/10 rounded-xl"
    >
      <div className="text-blue-400 mx-auto mb-4 w-16 h-16 flex items-center justify-center bg-gray-900/50 rounded-full border border-white/10">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-gray-400 mt-1 max-w-xs mx-auto">{message}</p>
    </motion.div>
  );
};

export default EmptyState;