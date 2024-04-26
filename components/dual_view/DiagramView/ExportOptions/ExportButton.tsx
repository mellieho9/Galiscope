type ExportButtonProps = {
  children: React.ReactNode;
};

export const ExportButton: React.FC<ExportButtonProps> = ({ children }) => {
  return (
    <button className="text-gray-500 hover:text-teal rounded">
      {children}
    </button>
  );
};
