#include "bindings/bindings.h"
#include <cstdlib>  // For strdup
#include <cstring>  // For string functions
#import <UIKit/UIKit.h>
#import <UniformTypeIdentifiers/UniformTypeIdentifiers.h>
#import <Foundation/Foundation.h>

// iOS File Picker Implementation
@interface IOSFilePickerManager : NSObject <UIDocumentPickerDelegate>
@property (nonatomic, strong) NSString* pickedPath;
@property (nonatomic, strong) NSMutableDictionary* activeURLs;
@property (nonatomic, assign) BOOL completed;
+ (instancetype)sharedInstance;
- (NSString*)pickFileSync;
- (NSString*)createBookmarkFromURL:(NSString*)urlString;
- (NSString*)restoreBookmarkFromData:(NSString*)bookmarkData;
- (void)stopAccessingPath:(NSString*)path;
- (void)cleanup;
@end

@implementation IOSFilePickerManager

+ (instancetype)sharedInstance {
    static IOSFilePickerManager* instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[IOSFilePickerManager alloc] init];
    });
    return instance;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        self.activeURLs = [[NSMutableDictionary alloc] init];
    }
    return self;
}

- (NSString*)pickFileSync {
    NSLog(@"[IOSFilePickerManager] Starting file picker...");
    
    self.pickedPath = nil;
    self.completed = NO;
    
    dispatch_async(dispatch_get_main_queue(), ^{
        NSLog(@"[IOSFilePickerManager] Creating document picker...");
        
        // Use iOS 13 compatible document picker initialization
        UIDocumentPickerViewController* picker;
        if (@available(iOS 14.0, *)) {
            // iOS 14+ approach with UTType
            NSArray<UTType*>* types = @[[UTType typeWithIdentifier:@"public.data"], [UTType typeWithIdentifier:@"public.item"]];
            picker = [[UIDocumentPickerViewController alloc] 
                     initForOpeningContentTypes:types
                     asCopy:NO];
        } else {
            // iOS 13 approach with string identifiers
            NSArray<NSString*>* types = @[@"public.data", @"public.item"];
            picker = [[UIDocumentPickerViewController alloc] 
                     initWithDocumentTypes:types
                     inMode:UIDocumentPickerModeOpen];
        }
        picker.delegate = self;
        picker.allowsMultipleSelection = NO;
        picker.shouldShowFileExtensions = YES;
        
        UIViewController* rootVC = [self getRootViewController];
        if (rootVC) {
            NSLog(@"[IOSFilePickerManager] Presenting picker from root VC");
            [rootVC presentViewController:picker animated:YES completion:nil];
        } else {
            NSLog(@"[IOSFilePickerManager] ERROR: No root view controller found");
            self.completed = YES;
        }
    });
    
    // Wait for completion with polling (30 second timeout)
    NSLog(@"[IOSFilePickerManager] Waiting for user selection...");
    NSDate* startTime = [NSDate date];
    while (!self.completed && [[NSDate date] timeIntervalSinceDate:startTime] < 30.0) {
        [[NSRunLoop currentRunLoop] runMode:NSDefaultRunLoopMode beforeDate:[NSDate dateWithTimeIntervalSinceNow:0.1]];
    }
    
    if (self.completed) {
        NSLog(@"[IOSFilePickerManager] Picker completed. Selected path: %@", self.pickedPath ?: @"(null)");
    } else {
        NSLog(@"[IOSFilePickerManager] Picker timed out after 30 seconds");
    }
    
    return self.pickedPath;
}

- (NSString*)createBookmarkFromURL:(NSString*)urlString {
    NSLog(@"[IOSFilePickerManager] iOS bookmark creation not supported - returning URL as-is");
    // On iOS, bookmark creation is more complex and often not needed for document picker URLs
    // For now, just return the URL string itself
    return urlString;
}

- (NSString*)restoreBookmarkFromData:(NSString*)bookmarkData {
    NSLog(@"[IOSFilePickerManager] iOS bookmark restoration not supported - treating as URL string");
    // On iOS, just treat the "bookmark" as a URL string and try to create a path
    NSURL* url = [NSURL URLWithString:bookmarkData];
    if (url && url.path) {
        NSLog(@"[IOSFilePickerManager] Returning path from URL: %@", url.path);
        return url.path;
    }
    NSLog(@"[IOSFilePickerManager] Could not create URL from bookmark data");
    return nil;
}

- (void)stopAccessingPath:(NSString*)path {
    NSLog(@"[IOSFilePickerManager] Stopping access to path: %@", path);
    
    NSURL* url = [self.activeURLs objectForKey:path];
    if (url) {
        [url stopAccessingSecurityScopedResource];
        [self.activeURLs removeObjectForKey:path];
        NSLog(@"[IOSFilePickerManager] Stopped accessing security scoped resource");
    } else {
        NSLog(@"[IOSFilePickerManager] WARNING: No URL found for path: %@", path);
    }
}

- (void)cleanup {
    NSLog(@"[IOSFilePickerManager] Cleaning up %lu active URLs", self.activeURLs.count);
    
    for (NSURL* url in [self.activeURLs allValues]) {
        [url stopAccessingSecurityScopedResource];
    }
    [self.activeURLs removeAllObjects];
}

- (UIViewController*)getRootViewController {
    UIWindow* window = nil;
    if (@available(iOS 13.0, *)) {
        for (UIWindowScene* scene in [[UIApplication sharedApplication] connectedScenes]) {
            if (scene.activationState == UISceneActivationStateForegroundActive) {
                for (UIWindow* w in scene.windows) {
                    if (w.isKeyWindow) {
                        window = w;
                        break;
                    }
                }
                if (window) break;
            }
        }
    } else {
        // For iOS 12 and below, use deprecated keyWindow
        #pragma clang diagnostic push
        #pragma clang diagnostic ignored "-Wdeprecated-declarations"
        window = [[UIApplication sharedApplication] keyWindow];
        #pragma clang diagnostic pop
    }
    
    return window.rootViewController;
}

#pragma mark - UIDocumentPickerDelegate

- (void)documentPicker:(UIDocumentPickerViewController*)controller didPickDocumentsAtURLs:(NSArray<NSURL*>*)urls {
    NSLog(@"[IOSFilePickerManager] Document picker selected %lu URLs", urls.count);
    
    NSURL* url = [urls firstObject];
    if (!url) {
        NSLog(@"[IOSFilePickerManager] ERROR: No URL selected");
        self.completed = YES;
        return;
    }
    
    NSLog(@"[IOSFilePickerManager] Selected URL: %@", url);
    NSLog(@"[IOSFilePickerManager] URL path: %@", url.path);
    NSLog(@"[IOSFilePickerManager] URL absoluteString: %@", url.absoluteString);
    
    if (![url startAccessingSecurityScopedResource]) {
        NSLog(@"[IOSFilePickerManager] ERROR: Failed to start accessing security scoped resource");
        self.completed = YES;
        return;
    }
    
    NSLog(@"[IOSFilePickerManager] Successfully started accessing security scoped resource");
    
    // Store the URL for later cleanup
    [self.activeURLs setObject:url forKey:url.path];
    
    // Store the ACTUAL FILESYSTEM PATH (not the URL)
    self.pickedPath = url.path;
    
    NSLog(@"[IOSFilePickerManager] Final picked path: %@", self.pickedPath);
    
    self.completed = YES;
}

- (void)documentPickerWasCancelled:(UIDocumentPickerViewController*)controller {
    NSLog(@"[IOSFilePickerManager] Document picker was cancelled");
    self.pickedPath = nil;
    self.completed = YES;
}

@end

// C Bridge Functions
extern "C" {
    char* ios_file_picker_pick(void) {
        NSLog(@"[C Bridge] ios_file_picker_pick called");
        NSString* path = [[IOSFilePickerManager sharedInstance] pickFileSync];
        
        if (path) {
            NSLog(@"[C Bridge] Returning path: %@", path);
            return strdup([path UTF8String]);
        } else {
            NSLog(@"[C Bridge] No path selected, returning NULL");
            return nullptr;
        }
    }
    
    char* ios_file_picker_create_bookmark(const char* url_cstring) {
        NSLog(@"[C Bridge] ios_file_picker_create_bookmark called");
        NSString* urlString = [NSString stringWithUTF8String:url_cstring];
        NSString* bookmark = [[IOSFilePickerManager sharedInstance] createBookmarkFromURL:urlString];
        return bookmark ? strdup([bookmark UTF8String]) : nullptr;
    }
    
    char* ios_file_picker_restore_bookmark(const char* bookmark_cstring) {
        NSLog(@"[C Bridge] ios_file_picker_restore_bookmark called");
        NSString* bookmarkString = [NSString stringWithUTF8String:bookmark_cstring];
        NSString* path = [[IOSFilePickerManager sharedInstance] restoreBookmarkFromData:bookmarkString];
        return path ? strdup([path UTF8String]) : nullptr;
    }
    
    void ios_file_picker_stop_accessing(const char* path_cstring) {
        NSLog(@"[C Bridge] ios_file_picker_stop_accessing called");
        NSString* path = [NSString stringWithUTF8String:path_cstring];
        [[IOSFilePickerManager sharedInstance] stopAccessingPath:path];
    }
    
    void ios_file_picker_cleanup(void) {
        NSLog(@"[C Bridge] ios_file_picker_cleanup called");
        [[IOSFilePickerManager sharedInstance] cleanup];
    }
}

int main(int argc, char * argv[]) {
	ffi::start_app();
	return 0;
}
