---
title: Web interface
---

Navigate Kurpod's intuitive web interface. Learn about all features and how to use them effectively. {% .lead %}

---

## Interface overview

Kurpod's web interface is designed for simplicity without sacrificing functionality:

```
┌─────────────────────────────────────────────────┐
│  [Logo] Kurpod        Search: [_____]    [User] │  Header
├─────────────────────────────────────────────────┤
│  [📁 Folders]           Current Path: /docs     │  Breadcrumb
├─────────────────────────────────────────────────┤
│  📁 Documents          📁 Photos               │
│  📁 Projects           📄 readme.txt           │  File Grid
│  📄 budget.xlsx       🖼️ vacation.jpg         │
│                                                 │
│  [Drop files here or click to upload]          │
└─────────────────────────────────────────────────┘
  Status: Standard Volume | Files: 42 | Used: 1.2GB   Status Bar
```

## Getting started

### First access

When you first visit Kurpod:

1. **Welcome screen** appears
2. Choose between:
   - "Create New Storage" - First time setup
   - "Unlock Storage" - Existing volume

### Creating storage

For new installations:

1. Click **"Create New Storage"**
2. Enter a strong password
3. Optionally enable hidden volume
4. Click **"Create"**
5. Wait for initialization

### Unlocking storage

For existing volumes:

1. Enter your password
2. Click **"Unlock"** or press Enter
3. Access your files immediately

---

## Main interface

### Header bar

Located at the top:

- **Logo**: Click to go home
- **Search**: Find files quickly
- **User menu**: Account options
- **Volume indicator**: Standard/Hidden

### Navigation breadcrumb

Shows current location:
```
Home > Documents > Work > Reports
```

Click any segment to navigate there.

### File grid

Main area showing files and folders:

- **Grid view**: Visual thumbnails
- **List view**: Detailed information
- **Sort options**: Name, date, size
- **Multi-select**: Ctrl/Cmd + Click

### Status bar

Bottom information panel:

- **Volume type**: Standard or Hidden
- **File count**: Total files
- **Storage used**: Space consumption
- **Upload progress**: When active

---

## File operations

### Uploading files

Multiple ways to upload:

**Drag and drop**:
1. Drag files from your computer
2. Drop anywhere on the interface
3. Upload starts automatically

**Click to browse**:
1. Click the upload area
2. Select files in dialog
3. Click "Open"

**Paste from clipboard**:
1. Copy files (Ctrl/Cmd + C)
2. Paste in Kurpod (Ctrl/Cmd + V)

**Folder upload**:
- Drag entire folders
- Structure preserved
- All files encrypted

### Viewing files

Click any file to preview:

**Supported previews**:
- Images (JPEG, PNG, GIF, WebP)
- PDFs (built-in viewer)
- Text files (with syntax highlighting)
- Videos (MP4, WebM)
- Audio (MP3, OGG)

**Preview features**:
- Zoom in/out
- Full screen mode
- Download option
- Close with Esc

### Managing files

**Right-click context menu**:
- Download
- Rename
- Move
- Copy
- Delete
- Properties

**Keyboard shortcuts**:
- `Delete`: Delete selected
- `F2`: Rename
- `Ctrl/Cmd + A`: Select all
- `Ctrl/Cmd + C`: Copy
- `Ctrl/Cmd + V`: Paste
- `Ctrl/Cmd + X`: Cut

### Creating folders

Organize your files:

1. Click **"New Folder"** button
2. Or right-click → "New Folder"
3. Enter folder name
4. Press Enter

Folders can be nested unlimited levels deep.

---

## Search functionality

### Basic search

Find files quickly:

1. Click search box or press `/`
2. Type filename or partial match
3. Results update in real-time
4. Clear with Esc

### Search features

- **Case insensitive**: "DOC" finds "doc"
- **Partial matching**: "bud" finds "budget"
- **Instant results**: No need to press Enter
- **Encrypted index**: Search stays private

### Advanced search

Coming soon:
- File type filters
- Date ranges
- Size filters
- Content search

---

## User interface elements

### Buttons

Consistent button hierarchy:

- **Primary** (blue): Main actions like Upload
- **Secondary** (gray): Alternative actions
- **Danger** (red): Destructive actions like Delete
- **Success** (green): Positive confirmations

### Forms

Input elements:

- **Text fields**: For names, search
- **Password fields**: Hidden input
- **Checkboxes**: Binary options
- **Radio buttons**: Single choice
- **Dropdowns**: Multiple options

### Notifications

Status messages appear as:

- **Toast** (top-right): Brief notifications
- **Modal dialogs**: Important confirmations
- **Inline messages**: Contextual help
- **Progress bars**: Long operations

### Themes

Appearance options:

- **Light mode**: Default bright theme
- **Dark mode**: Easier on eyes
- **Auto**: Follows system preference
- **High contrast**: Accessibility mode

---

## Advanced features

### Bulk operations

Work with multiple files:

1. **Select files**:
   - Click + drag to box select
   - Ctrl/Cmd + click individual
   - Shift + click for range

2. **Bulk actions**:
   - Download as ZIP
   - Delete multiple
   - Move to folder
   - Copy to location

### Keyboard navigation

Power user features:

- `Tab`: Navigate elements
- `Arrow keys`: Move selection
- `Enter`: Open file/folder
- `Backspace`: Go up level
- `Ctrl/Cmd + U`: Upload
- `Ctrl/Cmd + N`: New folder

### Drag and drop

Advanced dragging:

- **Reorder**: Drag to rearrange
- **Move**: Drag between folders
- **Upload**: Drag from desktop
- **Download**: Drag to desktop (some browsers)

### Customization

Personalize your experience:

**Settings available**:
- Default view (grid/list)
- Sort preferences
- Theme selection
- Language (coming soon)
- Thumbnail size
- Confirmation dialogs

---

## Volume management

### Switching volumes

Access hidden volume:

1. Click user menu (top-right)
2. Select "Switch Volume"
3. Enter hidden password
4. Click "Switch"

**Indicators**:
- Status bar shows current volume
- Different color theme
- Separate file listings

### Volume information

View storage details:

1. Click user menu
2. Select "Storage Info"

Shows:
- Volume type
- Space used/available
- File count
- Creation date

---

## Settings and preferences

### General settings

Access via user menu → Settings:

**Display**:
- Theme (Light/Dark/Auto)
- View type (Grid/List)
- Sort order
- Thumbnail size

**Behavior**:
- Confirm deletions
- Auto-lock timeout
- Remember view settings
- Show hidden files

### Security settings

**Password**:
- Change password
- Password strength meter
- Two-factor auth (coming soon)

**Session**:
- Auto-lock timer
- Clear on browser close
- Concurrent sessions

### Advanced settings

**Performance**:
- Cache size
- Chunk size
- Parallel uploads
- Compression level

**Developer**:
- Debug mode
- API access
- Export logs

---

## Mobile experience

### Responsive design

Kurpod adapts to screen size:

**Phone** (< 768px):
- Single column layout
- Touch-optimized buttons
- Swipe gestures
- Simplified navigation

**Tablet** (768px - 1024px):
- Two column layout
- Mixed navigation
- Touch + keyboard

**Desktop** (> 1024px):
- Full feature set
- Keyboard shortcuts
- Multi-window support

### Touch gestures

On mobile devices:

- **Tap**: Select/open
- **Long press**: Context menu
- **Swipe left/right**: Navigate
- **Pinch**: Zoom images
- **Pull down**: Refresh

---

## Troubleshooting

### Common issues

**Files won't upload**:
- Check file size limits
- Verify storage space
- Ensure stable connection
- Try smaller files first

**Preview not working**:
- Unsupported format
- File too large
- Browser limitations
- Try downloading instead

**Search not finding files**:
- Check exact spelling
- Try partial terms
- Refresh file index
- Clear and retry

**Interface frozen**:
- Refresh browser (F5)
- Clear browser cache
- Check JavaScript console
- Restart Kurpod server

### Browser compatibility

Supported browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Not supported:
- Internet Explorer
- Older browser versions
- Text-only browsers

### Performance tips

For best experience:

1. **Use modern browser**: Keep updated
2. **Stable connection**: Wired preferred
3. **Adequate RAM**: 4GB minimum
4. **Clear cache**: Periodically
5. **Limit tabs**: Free up resources

---

## Accessibility

### Keyboard navigation

Full keyboard support:

- All functions accessible
- Logical tab order
- Clear focus indicators
- Skip links available

### Screen readers

Compatible with:
- NVDA
- JAWS
- VoiceOver
- TalkBack

### Visual aids

Accessibility features:
- High contrast mode
- Large text option
- Clear icons
- Color-blind friendly

---

## Tips and tricks

### Power user tips

1. **Quick upload**: Paste files with Ctrl+V
2. **Instant search**: Press / to focus search
3. **Batch rename**: Select multiple + F2
4. **Quick preview**: Spacebar on selection
5. **Navigate fast**: Use breadcrumbs

### Productivity boosters

1. **Organize deeply**: Unlimited folder nesting
2. **Descriptive names**: Help search later
3. **Regular cleanup**: Delete unneeded files
4. **Use shortcuts**: Learn key combos
5. **Customize view**: Set your preferences

---

## Getting help

### Built-in help

- Hover tooltips on buttons
- Context-sensitive help
- Keyboard shortcut overlay (?)
- Video tutorials (coming soon)

### External resources

- [User manual](/docs)
- [Video guides](https://youtube.com/kurpod)
- [Community forum](https://forum.kurpod.org)
- [GitHub issues](https://github.com/srv1n/kurpod)