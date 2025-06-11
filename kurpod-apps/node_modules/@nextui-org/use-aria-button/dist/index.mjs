// src/index.ts
import { warn } from "@nextui-org/shared-utils";
import { filterDOMProps, isAndroid, isIOS, mergeProps } from "@react-aria/utils";
import { useFocusable } from "@react-aria/focus";
import { usePress } from "@react-aria/interactions";
function useAriaButton(props, ref) {
  let {
    elementType = "button",
    isDisabled,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    preventFocusOnPress,
    allowFocusWhenDisabled,
    onClick: deprecatedOnClick,
    href,
    target,
    rel,
    type = "button",
    allowTextSelectionOnPress
  } = props;
  let additionalProps;
  if (elementType === "button") {
    additionalProps = {
      type,
      disabled: isDisabled
    };
  } else {
    additionalProps = {
      role: "button",
      tabIndex: isDisabled ? void 0 : 0,
      href: elementType === "a" && !isDisabled ? href : void 0,
      target: elementType === "a" ? target : void 0,
      type: elementType === "input" ? type : void 0,
      disabled: elementType === "input" ? isDisabled : void 0,
      "aria-disabled": !isDisabled || elementType === "input" ? void 0 : isDisabled,
      rel: elementType === "a" ? rel : void 0
    };
  }
  let isMobile = isIOS() || isAndroid();
  if (deprecatedOnClick && typeof deprecatedOnClick === "function") {
    warn(
      "onClick is deprecated, please use onPress instead. See: https://github.com/nextui-org/nextui/issues/4292",
      "useButton"
    );
  }
  const handlePress = (e) => {
    if (isMobile) {
      deprecatedOnClick == null ? void 0 : deprecatedOnClick(e);
    }
    onPress == null ? void 0 : onPress(e);
  };
  let { pressProps, isPressed } = usePress({
    onPressStart,
    onPressEnd,
    onPressChange,
    onPress: handlePress,
    isDisabled,
    preventFocusOnPress,
    allowTextSelectionOnPress,
    ref
  });
  let { focusableProps } = useFocusable(props, ref);
  if (allowFocusWhenDisabled) {
    focusableProps.tabIndex = isDisabled ? -1 : focusableProps.tabIndex;
  }
  let buttonProps = mergeProps(
    focusableProps,
    pressProps,
    filterDOMProps(props, { labelable: true })
  );
  return {
    isPressed,
    buttonProps: mergeProps(additionalProps, buttonProps, {
      "aria-haspopup": props["aria-haspopup"],
      "aria-expanded": props["aria-expanded"],
      "aria-controls": props["aria-controls"],
      "aria-pressed": props["aria-pressed"],
      onClick: (e) => {
        if (type === "button" && isMobile) {
          return;
        }
        deprecatedOnClick == null ? void 0 : deprecatedOnClick(e);
      }
    })
  };
}
export {
  useAriaButton
};
