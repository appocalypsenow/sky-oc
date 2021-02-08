import { Injectable } from './injectable';
import { Container } from '../container/container';
import { Inject } from './inject';

@Injectable()
class SomeInjectable {}

@Injectable()
class SomeInjectableA {

    someMethod() {
        console.log('SomeInjectableA.someMethod() called');
    }

}

@Injectable()
class SomeInjectableB {

    @Inject(SomeInjectableA) someInjectableA: SomeInjectableA;

}

@Injectable()
class SomeInjectableC {

    @Inject(SomeInjectableB) someInjectableB: SomeInjectableB;

}

describe('#Injectable', () => {

    it('should call to register the injectable correctly', () => {

        spyOn(Container.instance, 'register');

        Injectable()(SomeInjectable);

        expect(Container.instance.register).toHaveBeenCalledWith(SomeInjectable);

    });

    it('should resolve nested dependencies', () => {

        const injectable = Container.instance.resolve(SomeInjectableC.name);
        const rootInjectable = Container.instance.resolve(SomeInjectableA.name);
        spyOn(rootInjectable, 'someMethod');

        injectable.someInjectableB.someInjectableA.someMethod();

        expect(rootInjectable.someMethod).toHaveBeenCalled();

    });

});
