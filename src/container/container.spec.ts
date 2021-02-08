import { Container } from './container';
import { Injectable } from '..';

@Injectable()
class SomeInjectable {}

describe('Container', () => {

    describe('#instance', () => {

        it('should return an instance of Container', () => {

            const instance: Container = Container.instance;

            expect(instance).toBeTruthy();

        });

        it('should return the same instance when called more than once', () => {

            const instance1: Container = Container.instance;
            const instance2: Container = Container.instance;

            expect(instance1).toBe(instance2);

        });

    });

    describe('#register', () => {

        beforeEach(() => {
            Container['container'] = undefined;
        });

        it('should register a new injectable', () => {

            spyOn(console, 'warn');
            Container.instance.register(SomeInjectable);

            expect(Container.instance['injectables']).toHaveProperty('SomeInjectable');
            expect(console.warn).not.toHaveBeenCalled();

        });

        it('should not duplicate registrations of an injectable', () => {

            spyOn(console, 'warn');
            Container.instance.register(SomeInjectable);
            Container.instance.register(SomeInjectable);

            expect(Container.instance['injectables']).toHaveProperty('SomeInjectable');
            expect(console.warn).toHaveBeenCalled();

        });

    });

    describe('#resolve', () => {

        it('should return a previously registered injectable', () => {

            Container.instance.register(SomeInjectable);

            const injectable = Container.instance.resolve(SomeInjectable.name);

            expect(injectable).toBeInstanceOf(SomeInjectable);

        });

    });

});
