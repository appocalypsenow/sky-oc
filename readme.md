# Sky-oC

This minimal IoC library implements a very simple DI container whose interface
is inspired by the Angular 2+ dependency injection interface.

## Executing the tests

To execute the tests for this library, first pull the repo and then navigate to
the repo directory. Then:

```
npm install
npm run test
```

## About

The public interface consists mainly of two TypeScript decorators: `@Injectable()` and `@Inject()`.

### Injectable()

The `Injectable()` decorator allows for the registration of classes, or services:

```typescript
@Injectable() 
class SomeInjectableSerive {
    // some methods and properties
}
```

It would not normally be necessary to resolve these services directly when using
nested dependencies, but at the top level you can do this:

```typescript
const injectable = Container.instance.resolve(SomeInjectable.name);
```

Note that it is necessary to provide a string name of the required service
to `resolve()` .

### Inject()

The `Inject()` decorator allows a service to register interest in another service, which
will be resolved recursively in the case that the interesting service also includes
dependencies indicated by `@Inject()`:

```typescript
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

const injectable = Container.instance.resolve(SomeInjectableC.name);
injectable.someInjectableB.someInjectableA.someMethod(); // SomeInjectableA.someMethod() called
```

