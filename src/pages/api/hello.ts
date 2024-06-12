import { NextApiRequest, NextApiResponse } from 'next';

const helloHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const a = 'a';
  console.log('test');
  debugger;
  res.status(200).json({ message: 'Hello NextJS!' });
};

export default helloHandler;
