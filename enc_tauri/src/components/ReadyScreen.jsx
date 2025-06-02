import React, { useMemo, useState, useCallback, useRef } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {Button} from "@/components/ui/button"
import { pdfjs, Document, Page } from 'react-pdf';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem
} from "@/components/ui/menubar";
// import { appWindow } from '@tauri-apps/api/window';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

// --- Icon Definitions --- (Using simple SVGs for now)
const BackIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
);
const FolderIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" /></svg>
);
const FileIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m9.75 9.75h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5a1.125 1.125 0 0 1 1.125-1.125h4.5A1.125 1.125 0 0 1 19.5 9.75v4.5a1.125 1.125 0 0 1-1.125 1.125Zm-16.5 0h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5a1.125 1.125 0 0 1 1.125-1.125h4.5A1.125 1.125 0 0 1 7.5 9.75v4.5a1.125 1.125 0 0 1-1.125 1.125Z" /></svg>
);
const PdfIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12V9.75m0 0A1.125 1.125 0 0 1 9.75 8.625h4.5A1.125 1.125 0 0 1 15.375 9.75m-5.625 0v3.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" /></svg>
);
const ImageIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m9.75 9.75h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5a1.125 1.125 0 0 1 1.125-1.125h4.5A1.125 1.125 0 0 1 19.5 9.75v4.5a1.125 1.125 0 0 1-1.125 1.125Zm-16.5 0h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5a1.125 1.125 0 0 1 1.125-1.125h4.5A1.125 1.125 0 0 1 7.5 9.75v4.5a1.125 1.125 0 0 1-1.125 1.125Z" /></svg>
);
const VideoIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
);
const MoreVerticalIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" /></svg>
);
const DownloadIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
);
const EditIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a2.25 2.25 0 0 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>
);
const DeleteIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
);
const CloseIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
);
const ArrowLeftIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
);
const ArrowRightIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
);
const FullscreenEnterIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>
);
const FullscreenExitIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25" /></svg>
);
const HomeIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
);

function ReadyScreen({
  files,
  currentFolder,
  navigateToFolder,
  goBack,
  handleFileClick,
  handleUpload,
  handleDownload,
  handleDelete,
  handleRename,
  handleLogout,
  selected,
  viewerType,
  fileDataUrl,
  loadingDataUrl,
  pageNumber,
  numPages,
  scale,
  zoomIn,
  zoomOut,
  onDocumentLoadSuccess,
  getCurrentFolders,
  getCurrentFolderFiles,
  handleDeleteFolder,
  refreshFileList,
  folderImages,
  handleDrag,
  handleDrop,
  dragActive,
  isMobile,
  currentVolumeType,
  isFullscreen,
  toggleFullscreen,
  exitFullscreenAndGallery,
  galleryView,
  setGalleryView,
  goPrev,
  goNext,
  isUploading,
  openFolderMenu,
  setOpenFolderMenu,
  navigationHistory,
  setTemporaryMessage,
  uploadProgress,
  goBackToDecoy,
  setSelected,
  setViewerType,
  setFileDataUrl,
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  // Handler to close viewer and return to file list
  const handleBackToFileList = useCallback(() => {
    setSelected(null);
    setViewerType(null);
    setFileDataUrl(null);
  }, [setSelected, setViewerType, setFileDataUrl]);

  const openLightbox = useCallback(() => {
    const idx = folderImages.findIndex(f => f.path === selected);
    if (idx >= 0) {
      setLightboxIndex(idx);
      handleFileClick(folderImages[idx].path);
    }
    setLightboxOpen(true);
  }, [selected, folderImages, handleFileClick]);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const prevImage = useCallback(() => {
    if (lightboxIndex > 0) {
      const newIdx = lightboxIndex - 1;
      setLightboxIndex(newIdx);
      handleFileClick(folderImages[newIdx].path);
    }
  }, [lightboxIndex, folderImages, handleFileClick]);

  const nextImage = useCallback(() => {
    if (lightboxIndex < folderImages.length - 1) {
      const newIdx = lightboxIndex + 1;
      setLightboxIndex(newIdx);
      handleFileClick(folderImages[newIdx].path);
    }
  }, [lightboxIndex, folderImages, handleFileClick]);

  const toggleFullScreen = useCallback(() => {
    appWindow.isFullscreen().then((isFullscreen) => {
      if (!isFullscreen) {
        appWindow.setFullscreen(true);
      } else {
        appWindow.setFullscreen(false);
      }
    });
  }, []);

  // --- PDF Fullscreen State ---
  const [pdfFullscreen, setPdfFullscreen] = useState(false);
  const pdfContainerRef = useRef(null);
  const [pdfNumPages, setPdfNumPages] = useState(null);
  const [pdfPage, setPdfPage] = useState(1);
  const [pdfWidth, setPdfWidth] = useState(undefined);

  // Update pdfWidth on mount and resize
  React.useEffect(() => {
    function updateWidth() {
      if (pdfContainerRef.current && !pdfFullscreen) {
        setPdfWidth(pdfContainerRef.current.offsetWidth);
      } else if (!pdfFullscreen) {
        setTimeout(updateWidth, 100);
      }
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [pdfFullscreen, selected]);

  // Reset page and numPages on new file
  React.useEffect(() => {
    setPdfPage(1);
    setPdfNumPages(null);
  }, [fileDataUrl]);

  const handlePdfFullscreen = () => setPdfFullscreen(v => !v);
  const handlePdfLoad = ({ numPages }) => {
    setPdfNumPages(numPages);
  };
  const handlePdfPrev = () => setPdfPage(p => Math.max(1, p - 1));
  const handlePdfNext = () => setPdfPage(p => pdfNumPages ? Math.min(pdfNumPages, p + 1) : p);

  // --- File/Folder Data --- 
  const currentFolders = useMemo(() => getCurrentFolders(), [getCurrentFolders]);
  const currentFiles = useMemo(() => getCurrentFolderFiles(), [getCurrentFolderFiles]);

  // --- Breadcrumb Data --- 
  const breadcrumbItems = useMemo(() => {
    const items = [{ path: '', name: 'Vault Root', isHome: true }];
    if (currentFolder) {
      let currentPath = '';
      currentFolder.split('/').forEach(part => {
        currentPath = currentPath ? `${currentPath}/${part}` : part;
        items.push({ path: currentPath, name: part, isHome: false });
      });
    }
    return items;
  }, [currentFolder]);

  // --- File/Folder List Item Renderer ---
  const renderItem = (item, isFolder = false) => {
    // --- Safely determine name and path ---
    let name, path;
    if (isFolder) {
        if (typeof item !== 'string' || !item) {
            console.warn("Invalid folder item:", item);
            return null;
        }
        name = item;
        path = currentFolder ? `${currentFolder}/${item}` : item;
    } else {
        if (typeof item !== 'object' || !item || typeof item.path !== 'string' || !item.path) {
            console.warn("Invalid file item:", item);
            return null;
        }
        path = item.path;
        const pathParts = path.replace(/\/$/, "").split('/');
        name = pathParts.pop() || path;
    }

    // --- Determine icon ---
    let icon;
    if (isFolder) {
      icon = <FolderIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />;
    } else if (path.match(/\.(png|jpe?g|gif|bmp|webp)$/i)) {
      icon = <ImageIcon className="w-5 h-5 text-green-500 flex-shrink-0" />;
    } else if (path.match(/\.(mp4|avi|mkv|mov|wmv|flv|webm|m4v|3gp|ogv)$/i)) {
      icon = <VideoIcon className="w-5 h-5 text-purple-500 flex-shrink-0" />;
    } else if (path.endsWith('.pdf')) {
      icon = <PdfIcon className="w-5 h-5 text-red-500 flex-shrink-0" />;
    } else {
      icon = <FileIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />;
    }

    return (
      <div
        key={path}
        role="button"
        tabIndex={0}
        className={`group flex items-center justify-between px-2 py-1.5 rounded hover:bg-accent cursor-pointer ${selected === path ? 'bg-accent font-semibold' : ''}`}
        onClick={() => isFolder ? navigateToFolder(path) : handleFileClick(path)}
        onKeyPress={e => { if (e.key === 'Enter') (isFolder ? navigateToFolder(path) : handleFileClick(path)); }}
      >
        <div className="flex items-center truncate flex-grow mr-2">
          {icon}
          <span className="truncate ml-2 text-sm">{name}</span>
        </div>
        {/* Context Menu Trigger */}
        <Menubar className="bg-transparent shadow-none border-none p-0 h-auto invisible group-hover:visible">
          <MenubarMenu>
            <MenubarTrigger asChild>
              {/* Make trigger slightly larger/easier to click */}
              <Button variant="ghost" size="icon" onClick={e => e.stopPropagation()} className="h-6 w-6">
                 <MoreVerticalIcon className="w-4 h-4 text-muted-foreground" />
               </Button>
            </MenubarTrigger>
            <MenubarContent align="end" onClick={e => e.stopPropagation()}> {/* Prevent menu click from selecting item */}
              {!isFolder && <MenubarItem onClick={() => handleDownload(path)}><DownloadIcon className="w-4 h-4 mr-2"/>Download</MenubarItem>}
              <MenubarItem onClick={() => handleRename(path)}><EditIcon className="w-4 h-4 mr-2"/>Rename</MenubarItem>
              <MenubarItem onClick={() => isFolder ? handleDeleteFolder(path) : handleDelete(path)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                <DeleteIcon className="w-4 h-4 mr-2"/>Delete
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
       {/* --- Header --- */}
       <header className="p-3 border-b flex items-center justify-between flex-shrink-0 sticky top-0 bg-background/95 backdrop-blur z-10">
         {/* Breadcrumb Navigation */}
          <Breadcrumb className="flex-grow mr-4 overflow-hidden whitespace-nowrap">
            <BreadcrumbList>
              {breadcrumbItems.map((item, index) => (
                <React.Fragment key={item.path}>
                  {index > 0 && <BreadcrumbSeparator />} 
                  <BreadcrumbItem>
                    {index === breadcrumbItems.length - 1 ? (
                       <BreadcrumbPage className="font-medium truncate flex items-center gap-1">
                         {item.isHome && (
                           <HomeIcon 
                             className="w-4 h-4 cursor-pointer hover:text-blue-600 transition-colors" 
                             onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigateToFolder(''); }}
                             title="Go to Vault Root"
                           />
                         )}
                         {item.name}
                       </BreadcrumbPage>
                    ) : (
                       <BreadcrumbLink href="#" onClick={(e) => { e.preventDefault(); navigateToFolder(item.path); }} className="truncate flex items-center gap-1">
                         {item.isHome && <HomeIcon className="w-4 h-4" />}
                         {item.name}
                       </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

         <div className="flex items-center gap-2 flex-shrink-0">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${currentVolumeType === 'Hidden' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`}> 
                 {currentVolumeType || 'Unknown'} Volume
              </span> 
             <Button size="sm" variant="ghost" onClick={refreshFileList} disabled={isUploading} title="Refresh">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 ${isUploading ? 'animate-spin' : ''}`}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z" /></svg>
             </Button>
             <Button size="sm" variant="ghost" onClick={handleLogout} disabled={isUploading} title="Logout">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" /></svg>
             </Button>
              <Button size="sm" variant="ghost" onClick={goBackToDecoy} title="Lock & Hide">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
             </Button>
         </div>
       </header>

       {/* --- Main Content Area --- */}
       {/* Connect Drag/Drop Handlers */} 
       <div className={`flex flex-col md:flex-row flex-1 overflow-hidden relative`} 
          onDragEnter={handleDrag}
          onDragOver={handleDrag} // preventDefault is handled inside handleDrag in App.jsx
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          {/* Drag Overlay */} 
          {dragActive && (
            <div className="absolute inset-0 bg-primary/30 flex items-center justify-center pointer-events-none z-40">
              <p className="text-2xl font-bold text-primary-foreground backdrop-blur-sm p-4 rounded">Drop files or folders here</p>
            </div>
          )}

          {/* --- Sidebar/File List --- */}
          <aside className={`border-r dark:border-neutral-800 p-4 overflow-y-auto flex flex-col bg-background flex-shrink-0 w-full md:w-72 lg:w-80 ${selected ? 'hidden md:flex' : 'flex'}
            `}
            >
            {/* Hidden Inputs */} 
            <input
              ref={fileInputRef} // Ref for file input
              id="file-upload-input"
              type="file"
              multiple // Allow multiple files
              onChange={e => {
                const files = e.target.files;
                if (!files || files.length === 0) {
                  alert('No files selected for upload.');
                  return;
                }
                handleUpload(files); // Pass FileList to App.jsx handler
              }}
              style={{display: 'none'}}
            />
            {/* Only include folder input on desktop */} 
            {!isMobile && (
                <input
                  ref={folderInputRef} // Ref for folder input
                  id="folder-upload-input"
                  type="file"
                  multiple
                  webkitdirectory="true"
                  // @ts-ignore - Allow directory prop as fallback 
                  directory="true"
                  onChange={e => {
                    const files = e.target.files;
                    if (!files || files.length === 0) {
                      alert('No folder selected for upload.');
                      return;
                    }
                    handleUpload(files); // Use the same handler
                  }}
                  style={{display: 'none'}}
                />
            )}

            <div className="mb-4 flex flex-col gap-2">
              {/* File Upload Button */} 
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => fileInputRef.current?.click()} // Trigger file input
                disabled={isUploading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
                Upload Files
              </Button>
              
              {/* Folder Upload Button (Desktop Only) */} 
              {!isMobile && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => folderInputRef.current?.click()} // Trigger folder input
                    disabled={isUploading}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                    </svg>
                    Upload Folder
                  </Button>
              )}
            </div>

            {/* Folder & File List (Unchanged rendering logic) */} 
            <div className="flex-grow overflow-y-auto pr-1">
                 {currentFolders.length > 0 && (
                     <div className="mb-3">
                         <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-1 pl-2">Folders</h3>
                         {currentFolders.map(folder => renderItem(folder, true))}
                     </div>
                 )}
                <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-1 pl-2">Files</h3>
                {currentFiles.map(file => renderItem(file, false))}
                
                {currentFolders.length === 0 && currentFiles.length === 0 &&
                    <div className="text-center text-muted-foreground mt-8 px-4">
                        <FolderIcon className="w-12 h-12 mx-auto mb-2 text-gray-400"/>
                        <p className="text-sm font-medium">Folder is empty</p>
                        <p className="text-xs">Drag items here or use the Upload button.</p>
                    </div>
                } 
            </div>
          </aside>

          {/* --- Main Content Area / Viewer --- (Unchanged logic, minor style adjustments) --- */}
          <main className={`flex-1 bg-muted/30 dark:bg-neutral-900/50 overflow-y-auto p-4 md:p-6 flex items-center justify-center ${selected ? '' : 'hidden md:flex'}
          `}>
             {/* Placeholder */} 
             {!selected &&
                <div className="text-center text-muted-foreground flex flex-col items-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-gray-400"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm16.5-5.25h.008v.008H18.75v-.008Z" /></svg>
                    <p className="text-lg font-medium">Select an item</p>
                    <p className="text-sm">Preview or details will appear here.</p>
                </div>
             }
             {/* Loading state */} 
             {selected && loadingDataUrl && 
                <div className="text-center text-muted-foreground flex flex-col items-center gap-4">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-muted-foreground animate-spin"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0 0a1.125 1.125 0 0 0 0-1.586 1.125 1.125 0 0 0-1.586 0l-3.182 3.182" /></svg>
                   <p>Loading preview...</p>
                </div>
             }
             {/* Image Viewer */} 
             {selected && !loadingDataUrl && fileDataUrl && viewerType === 'image' && (
                 <div className="flex flex-col w-full h-full relative">
                     {/* Mobile back button */}
                     <div className="md:hidden absolute top-2 left-2 z-10">
                         <Button
                             variant="secondary"
                             size="sm"
                             onClick={handleBackToFileList}
                             className="bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm"
                         >
                             <BackIcon className="w-4 h-4 mr-1" />
                             Back
                         </Button>
                     </div>
                     
                     {/* Image container */}
                     <div className="flex-1 flex flex-col items-center justify-center p-2">
                         <img
                             src={fileDataUrl}
                             alt={selected.split('/').pop() || 'Gallery image'}
                             className="max-w-full max-h-[calc(100%-60px)] object-contain cursor-pointer shadow-lg rounded"
                             onClick={() => setGalleryView(true)}
                         />
                         <p className="text-foreground text-sm mt-2 truncate max-w-[80%]">{selected.split('/').pop()}</p>
                     </div>
                 </div>
             )}
             {/* PDF Viewer */} 
             {selected && !loadingDataUrl && viewerType === 'pdf' && (
                 <>
                   {/* Inline PDF View */} 
                   {!pdfFullscreen && (
                     <div className="w-full h-full flex flex-col items-center justify-start relative">
                       {/* Mobile back button for PDF */}
                       <div className="md:hidden absolute top-2 left-2 z-20">
                           <Button
                               variant="secondary"
                               size="sm"
                               onClick={handleBackToFileList}
                               className="bg-background/80 hover:bg-background/90 backdrop-blur-sm"
                           >
                               <BackIcon className="w-4 h-4 mr-1" />
                               Back
                           </Button>
                       </div>
                       
                       <p className="mb-2 text-foreground font-medium text-center w-full truncate px-4" title={selected.split('/').pop()}>
                           {selected.split('/').pop()}
                       </p>
                       <div className="flex-grow w-full flex justify-center overflow-hidden border rounded-md bg-white dark:bg-black/20 shadow-inner">
                         {fileDataUrl ? (
                           <div ref={pdfContainerRef} className="relative w-full h-full flex flex-col items-center justify-start pt-2 pb-10"> {/* Add padding for controls */}
                             <Document
                               file={fileDataUrl}
                                onLoadSuccess={handlePdfLoad}
                                className="w-full flex flex-col items-center overflow-y-auto pdf-document-container" // Add class for potential styling
                                loading={<div className="text-center text-muted-foreground flex flex-col items-center gap-4 p-10"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 animate-spin"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0 0a1.125 1.125 0 0 0 0-1.586 1.125 1.125 0 0 0-1.586 0l-3.182 3.182" /></svg><p>Loading PDF...</p></div>}
                             >
                               <Page
                                 pageNumber={pdfPage}
                                 width={pdfWidth ? Math.min(pdfWidth - 30, 800) : undefined} // Constrain width
                                 className="shadow-md mb-2"
                               />
                             </Document>
                             {/* Controls overlay at the bottom */}
                              <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-2 border-t flex items-center justify-center gap-2 z-10">
                                 <Button onClick={handlePdfPrev} disabled={pdfPage <= 1} size="sm" variant="ghost">Prev</Button>
                                 <span className="text-sm mx-2">Page {pdfPage} / {pdfNumPages || '?'}</span>
                                 <Button onClick={handlePdfNext} disabled={!pdfNumPages || pdfPage >= pdfNumPages} size="sm" variant="ghost">Next</Button>
                                 <Button onClick={handlePdfFullscreen} size="sm" variant="ghost" className="ml-4" title="Fullscreen">
                                   <FullscreenEnterIcon className="w-5 h-5" />
                                 </Button>
                              </div>
                           </div>
                         ) : (
                           <div className="text-center text-muted-foreground flex flex-col items-center gap-4 p-10">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 animate-spin"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0 0a1.125 1.125 0 0 0 0-1.586 1.125 1.125 0 0 0-1.586 0l-3.182 3.182" /></svg>
                              <p>Loading PDF...</p>
                           </div>
                         )}
                       </div>
                     </div>
                   )}
                   {/* Fullscreen PDF View */} 
                   {pdfFullscreen && (
                     <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center overflow-auto p-4">
                       <div className="absolute top-0 left-0 right-0 bg-black/50 p-2 flex items-center justify-between z-10">
                           <span className="text-white text-sm truncate px-2" title={selected.split('/').pop()}>{selected.split('/').pop()}</span>
                           <div className="flex items-center justify-center gap-2">
                             <Button onClick={handlePdfPrev} disabled={pdfPage <= 1} size="sm" variant="ghost" className="text-white hover:bg-white/20 hover:text-white">Prev</Button>
                             <span className="text-white text-sm mx-2">Page {pdfPage} / {pdfNumPages || '?'}</span>
                             <Button onClick={handlePdfNext} disabled={!pdfNumPages || pdfPage >= pdfNumPages} size="sm" variant="ghost" className="text-white hover:bg-white/20 hover:text-white">Next</Button>
                           </div>
                           <Button onClick={handlePdfFullscreen} size="icon" variant="ghost" className="ml-4 text-white hover:bg-white/20 hover:text-white" title="Exit Fullscreen">
                             <FullscreenExitIcon className="w-5 h-5" />
                           </Button>
                        </div>

                       <div className="flex-grow w-full flex items-center justify-center overflow-auto mt-12 mb-4"> {/* Adjust margin for controls */}
                         {fileDataUrl && (
                           <Document
                             file={fileDataUrl}
                             onLoadSuccess={handlePdfLoad}
                             className="w-full h-full flex flex-col items-center pdf-document-fullscreen" // Add class for potential styling
                             loading={<div className="text-center text-white flex flex-col items-center gap-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 animate-spin"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0 0a1.125 1.125 0 0 0 0-1.586 1.125 1.125 0 0 0-1.586 0l-3.182 3.182" /></svg><p>Loading PDF...</p></div>}
                           >
                             <Page
                               pageNumber={pdfPage}
                                // Let react-pdf determine optimal width in fullscreen based on container
                               // width={window.innerWidth - 64} // Or provide a calculated width if needed
                               className="max-w-full max-h-full object-contain shadow-lg"
                             />
                           </Document>
                         )}
                       </div>
                     </div>
                   )}
                 </>
               )}
             {/* Video Viewer */}
             {selected && !loadingDataUrl && fileDataUrl && viewerType === 'video' && (
                 <div className="flex flex-col w-full h-full relative">
                     {/* Mobile back button */}
                     <div className="md:hidden absolute top-2 left-2 z-10">
                         <Button
                             variant="secondary"
                             size="sm"
                             onClick={handleBackToFileList}
                             className="bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm"
                         >
                             <BackIcon className="w-4 h-4 mr-1" />
                             Back
                         </Button>
                     </div>
                     
                     {/* Video container */}
                     <div className="flex-1 flex flex-col items-center justify-center p-2">
                         <video
                             src={fileDataUrl}
                             controls
                             className="max-w-full max-h-[calc(100%-60px)] object-contain shadow-lg rounded"
                             controlsList="nodownload"
                         >
                             Your browser does not support the video tag.
                         </video>
                         <p className="text-foreground text-sm mt-2 truncate max-w-[80%]">{selected.split('/').pop()}</p>
                     </div>
                 </div>
             )}
             {/* Other File Type Placeholder */} 
             {selected && viewerType === 'other' && !loadingDataUrl && (
                 <div className="text-center text-muted-foreground flex flex-col items-center gap-4 p-6">
                     <FileIcon className="w-12 h-12 text-gray-400"/>
                     <p>Selected: <span className="font-medium">{selected.split('/').pop()}</span></p>
                     <p className="text-sm">Preview not available for this file type.</p>
                     <Button variant="outline" onClick={() => handleDownload(selected)} disabled={isUploading}>
                        <DownloadIcon className="w-4 h-4 mr-2"/> Download File
                     </Button>
                 </div>
             )}
          </main>

          {/* --- Image Gallery Lightbox --- (Using simplified state check) */}
          {galleryView && fileDataUrl && viewerType === 'image' && (
            <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
              {/* Close Button */} 
              <button onClick={exitFullscreenAndGallery} aria-label="Close" className="absolute top-4 right-4 text-white hover:text-gray-300 z-10">
                 <CloseIcon className="w-7 h-7" />
              </button>
              {/* Previous Button */} 
              {folderImages.length > 1 && (
                  <button onClick={goPrev} disabled={folderImages.findIndex(f => f.path === selected) <= 0} aria-label="Previous" className="absolute left-4 text-white hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed z-10">
                     <ArrowLeftIcon className="w-8 h-8" />
                  </button>
              )}
              {/* Next Button */} 
               {folderImages.length > 1 && (
                  <button onClick={goNext} disabled={folderImages.findIndex(f => f.path === selected) >= folderImages.length - 1} aria-label="Next" className="absolute right-4 text-white hover:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed z-10">
                    <ArrowRightIcon className="w-8 h-8" />
                  </button>
              )}
              {/* Fullscreen Button */} 
              <button onClick={toggleFullscreen} aria-label="Toggle Fullscreen" className="absolute top-4 left-4 text-white hover:text-gray-300 z-10">
                {isFullscreen ? <FullscreenExitIcon className="w-6 h-6"/> : <FullscreenEnterIcon className="w-6 h-6"/>}
              </button>
              {/* Image */} 
              <div className="flex flex-col items-center justify-center w-full h-full">
                 <img src={fileDataUrl} alt={selected.split('/').pop() || 'Gallery image'} className="max-w-full max-h-[calc(100%-40px)] object-contain" />
                 <p className="text-white text-sm mt-2 truncate max-w-[80%]">{selected.split('/').pop()}</p>
              </div>
            </div>
          )}
       </div>
     </div>
   );
}

export default ReadyScreen; 