export const ModalItem = ({ title, icon }) => {
  return (
    <div className="flex flex-col items-center p-2 py-3 space-y-1 text-white rounded-full hover:bg-white hover:text-teal">
      <span className="w-5 h-5">{icon}</span>
      <p className="text-sm font-semibold">{title}</p>
    </div>
  );
};
