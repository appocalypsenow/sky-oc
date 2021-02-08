import { Container } from '../container/container';

export const Inject = <T>(injectable: { new(): T }) => (target: any, key: string) =>
    target[key] = <any>Container.instance.resolve(injectable.name)
