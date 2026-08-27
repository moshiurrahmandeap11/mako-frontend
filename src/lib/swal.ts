import Swal from "sweetalert2";

/**
 * Pre-themed SweetAlert2 instance matching the Labto AI Clean White Dashboard Design System.
 *
 * Rules:
 *  - Strict shadow-none
 *  - Strict rounded-md (6px)
 *  - Background : #FFFFFF (white)
 *  - Border     : #E4E5E7
 *  - Title      : #222325
 *  - Text       : #62646A
 *  - Confirm btn: #E11D48 (rose-600) for destructive actions
 *  - Cancel btn : #FFFFFF with #E4E5E7 border, text #222325
 */
const swal = Swal.mixin({
  background: "#FFFFFF",
  color: "#222325",
  customClass: {
    popup:
      "!bg-white !border !border-[#E4E5E7] !rounded-md !shadow-none !p-6 max-w-sm",
    title:
      "!text-[#222325] !font-medium !text-base !tracking-tight !pt-2 !pb-1",
    htmlContainer: "!text-[#62646A] !text-xs !leading-relaxed !mt-1 !mb-4",
    actions: "!gap-2 !mt-2",
    confirmButton:
      "!bg-rose-600 !text-white !font-medium !text-xs !px-4 !py-2 !rounded-md hover:!bg-rose-700 !shadow-none !transition cursor-pointer !outline-none !border-0",
    cancelButton:
      "!bg-white !text-[#222325] !font-normal !text-xs !px-4 !py-2 !rounded-md !border !border-[#E4E5E7] hover:!bg-[#F7F7F7] !shadow-none !transition cursor-pointer !outline-none",
    denyButton:
      "!bg-[#1DBF73] !text-white !font-medium !text-xs !px-4 !py-2 !rounded-md hover:!bg-[#19A463] !shadow-none !transition cursor-pointer !outline-none !border-0",
    icon: "!border-[#E4E5E7] !scale-90 !my-1",
  },
  buttonsStyling: false,
});

export default swal;
