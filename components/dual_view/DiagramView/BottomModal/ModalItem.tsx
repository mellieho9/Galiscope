export const ModalItem = ({ title, icon }) => {
  return (
    <div className="flex flex-col items-center p-2 py-3 space-y-1 text-white rounded-full hover:bg-white hover:text-teal">
      <span className="w-4 h-4">{icon}</span>
      <p className="text-sm font-semibold">{title}</p>
    </div>
  );
};
