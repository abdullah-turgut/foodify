const SetupLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center px-5">
      {children}
    </div>
  );
};

export default SetupLayout;
