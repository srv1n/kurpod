import React from 'react';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';

export function MobileBreadcrumb({ currentPath, onNavigate }) {
    const pathParts = currentPath ? currentPath.split('/').filter(Boolean) : [];
    
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink
                        onClick={() => onNavigate('')}
                        className="cursor-pointer"
                    >
                        Home
                    </BreadcrumbLink>
                </BreadcrumbItem>
                
                {pathParts.map((part, index) => {
                    const isLast = index === pathParts.length - 1;
                    const path = pathParts.slice(0, index + 1).join('/');
                    
                    return (
                        <React.Fragment key={path}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>{part}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink
                                        onClick={() => onNavigate(path)}
                                        className="cursor-pointer"
                                    >
                                        {part}
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}