type HeadingType = 1 | 2 | 3 | 4 | 5 | 6;

const Heading: React.FCC<{ type?: HeadingType }> = ({ type, children }) => {
  switch (type) {
    case 1:
      return <h1 className={'font-heading text-4xl font-bold'}>{children}</h1>;
    case 2:
      return <h2 className={'font-heading text-3xl font-bold'}>{children}</h2>;
    case 3:
      return (
        <h3
          className={
            'from-tulip-0  to-tulip-1 bg-clip-text font-Outfit text-xl font-semibold text-white group-hover:bg-gradient-to-br group-hover:text-transparent group-hover:transition-colors'
          }
        >
          {children}
        </h3>
      );
    case 4:
      return (
        <h4
          className={'font-Outfit text-xl font-semibold capitalize text-white'}
        >
          {children}
        </h4>
      );
    case 5:
      return (
        <h5 className={'font-heading text-lg font-semibold'}>{children}</h5>
      );
    case 6:
      return (
        <h6
          className={
            'font-Outfit text-22xl text-base font-medium capitalize text-white'
          }
        >
          {children}
        </h6>
      );

    default:
      return <Heading type={1}>{children}</Heading>;
  }
};

export default Heading;
