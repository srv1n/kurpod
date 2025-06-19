// File type detection based on magic bytes
const FILE_SIGNATURES = {
    // Images
    'FFD8FF': { ext: 'jpg', mime: 'image/jpeg', type: 'image' },
    '89504E47': { ext: 'png', mime: 'image/png', type: 'image' },
    '47494638': { ext: 'gif', mime: 'image/gif', type: 'image' },
    '424D': { ext: 'bmp', mime: 'image/bmp', type: 'image' },
    '49492A00': { ext: 'tif', mime: 'image/tiff', type: 'image' },
    '4D4D002A': { ext: 'tif', mime: 'image/tiff', type: 'image' },
    
    // Videos
    '000000186674797069736F6D': { ext: 'mp4', mime: 'video/mp4', type: 'video' },
    '00000020667479706D703432': { ext: 'mp4', mime: 'video/mp4', type: 'video' },
    '1A45DFA3': { ext: 'webm', mime: 'video/webm', type: 'video' },
    '52494646': { ext: 'avi', mime: 'video/x-msvideo', type: 'video' },
    '000001BA': { ext: 'mpg', mime: 'video/mpeg', type: 'video' },
    '000001B3': { ext: 'mpg', mime: 'video/mpeg', type: 'video' },
    '6D6F6F76': { ext: 'mov', mime: 'video/quicktime', type: 'video' },
    
    // Audio
    'FFFB': { ext: 'mp3', mime: 'audio/mpeg', type: 'audio' },
    'FFF3': { ext: 'mp3', mime: 'audio/mpeg', type: 'audio' },
    'FFF2': { ext: 'mp3', mime: 'audio/mpeg', type: 'audio' },
    '4F676753': { ext: 'ogg', mime: 'audio/ogg', type: 'audio' },
    '524946464': { ext: 'wav', mime: 'audio/wav', type: 'audio' },
    '664C6143': { ext: 'flac', mime: 'audio/flac', type: 'audio' },
    
    // Documents
    '25504446': { ext: 'pdf', mime: 'application/pdf', type: 'document' },
    '504B0304': { ext: 'zip', mime: 'application/zip', type: 'archive' },
    '504B0506': { ext: 'zip', mime: 'application/zip', type: 'archive' },
    '504B0708': { ext: 'zip', mime: 'application/zip', type: 'archive' },
};

export async function detectFileType(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        
        reader.onloadend = (e) => {
            if (!e.target.result) {
                resolve(getTypeFromExtension(file.name));
                return;
            }
            
            const arr = new Uint8Array(e.target.result);
            const header = Array.from(arr.slice(0, 20))
                .map(byte => byte.toString(16).padStart(2, '0').toUpperCase())
                .join('');
            
            // Check signatures
            for (const [signature, info] of Object.entries(FILE_SIGNATURES)) {
                if (header.startsWith(signature)) {
                    resolve({
                        ...info,
                        detected: true,
                        signature,
                    });
                    return;
                }
            }
            
            // Fallback to extension
            resolve(getTypeFromExtension(file.name));
        };
        
        // Read first 20 bytes
        reader.readAsArrayBuffer(file.slice(0, 20));
    });
}

function getTypeFromExtension(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const mimeTypes = {
        // Images
        jpg: { mime: 'image/jpeg', type: 'image' },
        jpeg: { mime: 'image/jpeg', type: 'image' },
        png: { mime: 'image/png', type: 'image' },
        gif: { mime: 'image/gif', type: 'image' },
        bmp: { mime: 'image/bmp', type: 'image' },
        webp: { mime: 'image/webp', type: 'image' },
        svg: { mime: 'image/svg+xml', type: 'image' },
        
        // Videos
        mp4: { mime: 'video/mp4', type: 'video' },
        webm: { mime: 'video/webm', type: 'video' },
        avi: { mime: 'video/x-msvideo', type: 'video' },
        mov: { mime: 'video/quicktime', type: 'video' },
        wmv: { mime: 'video/x-ms-wmv', type: 'video' },
        flv: { mime: 'video/x-flv', type: 'video' },
        mkv: { mime: 'video/x-matroska', type: 'video' },
        
        // Audio
        mp3: { mime: 'audio/mpeg', type: 'audio' },
        wav: { mime: 'audio/wav', type: 'audio' },
        ogg: { mime: 'audio/ogg', type: 'audio' },
        m4a: { mime: 'audio/mp4', type: 'audio' },
        flac: { mime: 'audio/flac', type: 'audio' },
        
        // Documents
        pdf: { mime: 'application/pdf', type: 'document' },
        doc: { mime: 'application/msword', type: 'document' },
        docx: { mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', type: 'document' },
        txt: { mime: 'text/plain', type: 'document' },
        
        // Default
        default: { mime: 'application/octet-stream', type: 'unknown' },
    };
    
    return {
        ext,
        ...mimeTypes[ext] || mimeTypes.default,
        detected: false,
    };
}