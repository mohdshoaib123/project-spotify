import DataURIParser from "datauri/parser.js";
import path from 'path';
const getBuffer = (file) => {
    const parser = new DataURIParser();
    // const extName=path.extname(file.originalname).toString();
    // return parser.format(extName,file.buffer)
    //   console.log("Original Name:", file.originalname);
    // console.log("Mimetype:", file.mimetype);
    return parser.format(file.mimetype, file.buffer);
};
export default getBuffer;
//# sourceMappingURL=dataUri.js.map