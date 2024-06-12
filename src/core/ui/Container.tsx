const Container: React.FCC = ({ children }) => {
  return (
    <div className="container mx-auto px-2 md:!container 1xs:max-w-full sm:max-w-full	sm:px-5	md:px-5">
      {children}
    </div>
  );
};

export default Container;
