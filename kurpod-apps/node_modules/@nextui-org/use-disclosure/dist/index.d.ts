interface UseDisclosureProps {
    isOpen?: boolean;
    defaultOpen?: boolean;
    onClose?(): void;
    onOpen?(): void;
    onChange?(isOpen: boolean | undefined): void;
    id?: string;
}
declare function useDisclosure(props?: UseDisclosureProps): {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onOpenChange: () => void;
    isControlled: boolean;
    getButtonProps: (props?: any) => any;
    getDisclosureProps: (props?: any) => any;
};
type UseDisclosureReturn = ReturnType<typeof useDisclosure>;

export { UseDisclosureProps, UseDisclosureReturn, useDisclosure };
