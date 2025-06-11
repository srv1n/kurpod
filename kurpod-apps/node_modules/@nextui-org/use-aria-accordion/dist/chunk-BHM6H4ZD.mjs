// src/use-accordion.ts
import { useSelectableList } from "@react-aria/selection";
function useReactAriaAccordion(props, state, ref) {
  let { listProps } = useSelectableList({
    ...props,
    ...state,
    allowsTabNavigation: true,
    disallowSelectAll: true,
    ref
  });
  delete listProps.onKeyDownCapture;
  return {
    accordionProps: {
      ...listProps,
      tabIndex: void 0
    }
  };
}

export {
  useReactAriaAccordion
};
