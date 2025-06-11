import * as _nextui_org_system from '@nextui-org/system';
import { TabItemProps as TabItemProps$1 } from './base/tab-item-base.js';
import { Node } from '@react-types/shared';
import { ValuesType } from './use-tabs.js';
import '@nextui-org/aria-utils';
import 'react';
import '@nextui-org/theme';
import '@nextui-org/react-utils';
import '@react-stately/tabs';
import '@react-aria/tabs';
import 'framer-motion';

interface TabItemProps<T extends object = object> extends TabItemProps$1<T> {
    item: Node<T>;
    state: ValuesType["state"];
    slots: ValuesType["slots"];
    listRef?: ValuesType["listRef"];
    classNames?: ValuesType["classNames"];
    isDisabled?: ValuesType["isDisabled"];
    motionProps?: ValuesType["motionProps"];
    disableAnimation?: ValuesType["disableAnimation"];
    disableCursorAnimation?: ValuesType["disableCursorAnimation"];
}
/**
 * @internal
 */
declare const Tab: _nextui_org_system.InternalForwardRefRenderFunction<"button", TabItemProps<object>, never>;

export { TabItemProps, Tab as default };
