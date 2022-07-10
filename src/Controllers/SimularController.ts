import { Request, Response } from 'express';
import { simular } from '../Engines/index'

exports.get = (req:Request, res:Response) => {
	(async () => {
		await simular(req, res);
	})();
};
