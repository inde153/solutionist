import { Request, Response } from 'express';

const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('accessToken');
    return res.status(200).send('successfully logout');
  } catch (err) {
    console.log(err);
    return res.status(500).send('internal server error');
  }
};

export default logout;
