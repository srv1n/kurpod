import React from 'react';
import {
    DocumentTextIcon,
    PhotoIcon,
    VideoCameraIcon,
    FolderIcon,
    DocumentIcon,
    MusicalNoteIcon,
    ArchiveBoxIcon,
    CodeBracketIcon,
    PresentationChartLineIcon,
    TableCellsIcon,
} from '@heroicons/react/24/outline';

// File type detection based on extensions and MIME types
const getFileType = (filename, mimeType = '') => {
    const ext = filename.toLowerCase().split('.').pop();
    
    // Image types
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico', 'tiff'].includes(ext) ||
        mimeType.startsWith('image/')) {
        return 'image';
    }
    
    // Video types
    if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv', 'm4v', '3gp'].includes(ext) ||
        mimeType.startsWith('video/')) {
        return 'video';
    }
    
    // Audio types
    if (['mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a', 'wma'].includes(ext) ||
        mimeType.startsWith('audio/')) {
        return 'audio';
    }
    
    // Document types
    if (['pdf', 'doc', 'docx', 'rtf', 'odt'].includes(ext)) {
        return 'document';
    }
    
    // Spreadsheet types
    if (['xls', 'xlsx', 'csv', 'ods'].includes(ext)) {
        return 'spreadsheet';
    }
    
    // Presentation types
    if (['ppt', 'pptx', 'odp'].includes(ext)) {
        return 'presentation';
    }
    
    // Code types
    if (['js', 'jsx', 'ts', 'tsx', 'html', 'css', 'scss', 'json', 'xml', 'py', 'java', 'cpp', 'c', 'h', 'rs', 'go', 'php', 'rb', 'swift', 'kt'].includes(ext)) {
        return 'code';
    }
    
    // Text types
    if (['txt', 'md', 'markdown', 'log', 'yaml', 'yml', 'toml', 'ini', 'cfg'].includes(ext) ||
        mimeType.startsWith('text/')) {
        return 'text';
    }
    
    // Archive types
    if (['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz'].includes(ext)) {
        return 'archive';
    }
    
    // Default to document for unknown types
    return 'document';
};

// File type icon mapping with modern neomorphic styling
const FileTypeIcon = ({ 
    filename, 
    mimeType, 
    size = 'md', 
    className = '', 
    isFolder = false,
    variant = 'default' // 'default', 'minimal', 'colored'
}) => {
    const fileType = isFolder ? 'folder' : getFileType(filename, mimeType);
    
    const sizeClasses = {
        sm: 'w-5 h-5',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12',
        '2xl': 'w-16 h-16'
    };
    
    const getIconColor = (type) => {
        if (variant === 'minimal') return 'text-gray-500 dark:text-gray-400';
        
        const colors = {
            folder: 'text-blue-500',
            image: 'text-green-500',
            video: 'text-red-500',
            audio: 'text-purple-500',
            document: 'text-red-600',
            text: 'text-gray-600',
            code: 'text-blue-600',
            spreadsheet: 'text-green-600',
            presentation: 'text-orange-500',
            archive: 'text-yellow-600'
        };
        
        return colors[type] || 'text-gray-500';
    };
    
    const getIconComponent = (type) => {
        const icons = {
            folder: FolderIcon,
            image: PhotoIcon,
            video: VideoCameraIcon,
            audio: MusicalNoteIcon,
            document: DocumentTextIcon,
            text: DocumentIcon,
            code: CodeBracketIcon,
            spreadsheet: TableCellsIcon,
            presentation: PresentationChartLineIcon,
            archive: ArchiveBoxIcon
        };
        
        return icons[type] || DocumentIcon;
    };
    
    const IconComponent = getIconComponent(fileType);
    const iconColor = getIconColor(fileType);
    const sizeClass = sizeClasses[size] || sizeClasses.md;
    
    if (variant === 'colored') {
        return (
            <div className={`relative ${className}`}>
                <div className={`neo-card p-2 ${sizeClass === 'w-5 h-5' ? 'p-1' : sizeClass === 'w-16 h-16' ? 'p-4' : 'p-2'}`}>
                    <IconComponent 
                        className={`${sizeClass} ${iconColor} transition-colors duration-200`}
                    />
                </div>
            </div>
        );
    }
    
    return (
        <IconComponent 
            className={`${sizeClass} ${iconColor} transition-colors duration-200 ${className}`}
        />
    );
};

// Specialized file grid icon for better visual hierarchy
export const FileGridIcon = ({ filename, mimeType, isFolder = false }) => {
    return (
        <FileTypeIcon 
            filename={filename}
            mimeType={mimeType}
            isFolder={isFolder}
            size="xl"
            variant="colored"
            className="mb-3"
        />
    );
};

// Breadcrumb icon for navigation
export const BreadcrumbIcon = ({ filename, mimeType, isFolder = false }) => {
    return (
        <FileTypeIcon 
            filename={filename}
            mimeType={mimeType}
            isFolder={isFolder}
            size="sm"
            variant="minimal"
        />
    );
};

// List view icon for compact display
export const ListIcon = ({ filename, mimeType, isFolder = false }) => {
    return (
        <FileTypeIcon 
            filename={filename}
            mimeType={mimeType}
            isFolder={isFolder}
            size="md"
            variant="default"
        />
    );
};

export default FileTypeIcon;