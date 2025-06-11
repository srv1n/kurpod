import { Node } from '@react-types/shared';

type NodeWithProps<T extends object, P = {}> = Omit<Node<T>, "props"> & {
    props?: P;
};

export { NodeWithProps };
