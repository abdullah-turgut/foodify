const SetupLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-full flex items-center justify-center px-5 py-10">
      {children}
    </div>
  );
};

export default SetupLayout;
