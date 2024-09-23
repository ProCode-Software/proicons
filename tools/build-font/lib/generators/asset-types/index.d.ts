import { AssetType } from '../../types/misc';
import { FontGenerator } from '../../types/generator';
declare const generators: {
    [key in AssetType]: FontGenerator<any>;
};
export default generators;
