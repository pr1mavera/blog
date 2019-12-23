import fs from 'fs';
import path from 'path';

export default class MDService {

    getMDData(ctx) {
        const mdmapJson = fs.readFileSync(path.join(__dirname, '../', 'assets/MDMap.json'), 'utf-8');
        try {
            const MDData = JSON.parse(mdmapJson);
            return MDData;

        } catch (err) {
            ctx.logger.error(err);
            return {};
        }
    }
}