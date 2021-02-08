import { Injectable } from './injectable';
import { Inject } from './inject';
import { Container } from '../container/container';

@Injectable()
class SomeInjectable {}

describe('#Inject', () => {

    it('should call resolve with the correct injectable and set the target', () => {

        spyOn(Container.instance, 'resolve').and.callThrough();
        Container.instance.register(SomeInjectable);
        const injectable:  { new(): SomeInjectable } = SomeInjectable;
        const target: any = {};
        const key: string = 'someKey';

        Inject(injectable)(target, key);

        expect(Container.instance.resolve).toHaveBeenCalledWith('SomeInjectable');
        expect(target[key]).toBeInstanceOf(SomeInjectable);

    });

});
