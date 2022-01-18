import { Request, Response } from 'express';

const logout = async (req: Request, res: Response) => {
  try {
    return res
      .cookie('accessToken', '', { maxAge: 1 })
      .status(200)
      .send('successfully logout');
  } catch (err) {
    console.log(err);
    return res.clearCookie('accessToken').status(500).send('internal server error');
  }
};

export default logout;
