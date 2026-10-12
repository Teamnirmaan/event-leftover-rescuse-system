import React from 'react';
import { useRescue } from '../context/RescueContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, clearToast } = useRescue();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-sky-600 shrink-0" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success':
        return 'border-emerald-200 bg-emerald-50/95 text-emerald-950';
      case 'error':
        return 'border-rose-200 bg-rose-50/95 text-rose-950';
      default:
        return 'border-sky-200 bg-sky-50/95 text-sky-950';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className={`p-4 rounded-xl border shadow-lg backdrop-blur-sm flex items-start justify-between gap-3 ${getBorderColor()}`}>
        <div className="flex items-start gap-3">
          {getIcon()}
          <p className="text-sm font-medium leading-relaxed">{toast.message}</p>
        </div>
        <button
          onClick={clearToast}
          className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
