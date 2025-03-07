"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createChunks", {
    enumerable: true,
    get: function() {
        return createChunks;
    }
});
const createChunks = (array, chunkSize)=>{
    const chunks = [];
    for(let i = 0; i < array.length; i += chunkSize){
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
};

//# sourceMappingURL=chunk.js.map