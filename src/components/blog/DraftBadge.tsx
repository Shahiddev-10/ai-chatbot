const DraftBadge: React.FCC = ({ children }) => {
  return (
    <span className="rounded-md bg-yellow-200 px-4 py-2 font-semibold dark:text-black-400">
      {children}
    </span>
  );
};

export default DraftBadge;
