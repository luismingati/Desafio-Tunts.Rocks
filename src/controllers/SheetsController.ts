import { Request, Response } from 'express';
import getAuthSheets from '../services';

export class SheetsController {
    public async create(req: Request, res: Response): Promise<void> {
        const { googleSheets, auth, spreadsheetId } = await getAuthSheets();
    
        const { range, values } = req.body;
    
        const result = await googleSheets.spreadsheets.values.update({
            auth,
            spreadsheetId,
            range,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: values,
            },
        });
    
        res.send(result.data);
    }

    public async read(req: Request, res: Response): Promise<any> {
        const { googleSheets, auth, spreadsheetId } = await getAuthSheets();

        const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: "engenharia_de_software",
        });
        
        res.send(getRows.data);
        return getRows.data;
    }
}