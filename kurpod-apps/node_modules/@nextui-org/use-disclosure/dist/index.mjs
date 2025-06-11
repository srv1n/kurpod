// src/index.ts
import { chain } from "@react-aria/utils";
import { useControlledState } from "@react-stately/utils";
import { useCallbackRef } from "@nextui-org/use-callback-ref";
import { useCallback, useId } from "react";
function useDisclosure(props = {}) {
  const {
    id: idProp,
    defaultOpen,
    isOpen: isOpenProp,
    onClose: onCloseProp,
    onOpen: onOpenProp,
    onChange = () => {
    }
  } = props;
  const onOpenPropCallbackRef = useCallbackRef(onOpenProp);
  const onClosePropCallbackRef = useCallbackRef(onCloseProp);
  const [isOpen, setIsOpen] = useControlledState(isOpenProp, defaultOpen || false, onChange);
  const reactId = useId();
  const id = idProp || reactId;
  const isControlled = isOpenProp !== void 0;
  const onClose = useCallback(() => {
    if (!isControlled) {
      setIsOpen(false);
    }
    onClosePropCallbackRef == null ? void 0 : onClosePropCallbackRef();
  }, [isControlled, onClosePropCallbackRef]);
  const onOpen = useCallback(() => {
    if (!isControlled) {
      setIsOpen(true);
    }
    onOpenPropCallbackRef == null ? void 0 : onOpenPropCallbackRef();
  }, [isControlled, onOpenPropCallbackRef]);
  const onOpenChange = useCallback(() => {
    const action = isOpen ? onClose : onOpen;
    action();
  }, [isOpen, onOpen, onClose]);
  return {
    isOpen: !!isOpen,
    onOpen,
    onClose,
    onOpenChange,
    isControlled,
    getButtonProps: (props2 = {}) => ({
      ...props2,
      "aria-expanded": isOpen,
      "aria-controls": id,
      onClick: chain(props2.onClick, onOpenChange)
    }),
    getDisclosureProps: (props2 = {}) => ({
      ...props2,
      hidden: !isOpen,
      id
    })
  };
}
export {
  useDisclosure
};
