import Swal from 'sweetalert2';

/**
 * Pre-themed SweetAlert2 instance matching the Labto AI dark slate/amber design system.
 *
 * Colors:
 *  - Background : #0f172a  (slate-950)
 *  - Title      : #ffffff  (white)
 *  - Text       : #94a3b8  (slate-400)
 *  - Confirm btn: #f59e0b  (amber-500) with slate-950 text
 *  - Cancel btn : transparent, slate border
 *  - Danger btn : #f43f5e  (rose-500)
 */
const swal = Swal.mixin({
  background: '#0f172a',
  color: '#94a3b8',
  customClass: {
    popup:
      'border border-slate-800 rounded-2xl shadow-2xl',
    title: '!text-white !font-bold !text-lg !tracking-tight',
    htmlContainer: '!text-slate-400 !text-sm',
    confirmButton:
      '!bg-amber-500 !text-slate-950 !font-bold !text-xs !uppercase !tracking-wider !px-5 !py-2.5 !rounded-xl hover:!bg-amber-400 focus:!ring-2 focus:!ring-amber-500/50 !transition',
    cancelButton:
      '!bg-transparent !text-slate-400 !font-bold !text-xs !uppercase !tracking-wider !px-5 !py-2.5 !rounded-xl !border !border-slate-700 hover:!bg-slate-800 hover:!text-white !transition',
    denyButton:
      '!bg-rose-500 !text-white !font-bold !text-xs !uppercase !tracking-wider !px-5 !py-2.5 !rounded-xl hover:!bg-rose-400 focus:!ring-2 focus:!ring-rose-500/50 !transition',
    icon: '!border-0',
  },
  buttonsStyling: false,
});

export default swal;
