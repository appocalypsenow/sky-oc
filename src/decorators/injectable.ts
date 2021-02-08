import { Container } from '../container/container';

export const Injectable = () => <T>(target: { new (): T }) => Container.instance.register(target);
