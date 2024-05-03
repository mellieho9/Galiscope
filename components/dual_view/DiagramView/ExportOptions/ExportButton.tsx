type ExportButtonProps = {
  children: React.ReactNode;
  onClick: () => void,
};

export const ExportButton: React.FC<ExportButtonProps> = ({ children, ...props}) => {
  return (
    <button {...props} className="text-gray-500 hover:text-teal rounded">
      {children}
    </button>
  );
};
