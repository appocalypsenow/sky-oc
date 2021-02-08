export class Container {

    private static container: Container | undefined;
    private injectables: { [name: string]: any } = {};

    private constructor() {
    }

    public static get instance(): Container {

        if (!Container.container) {
            Container.container = new Container();
        }

        return Container.container;

    }

    public register<T>(injectable: { new(): T }) {

        const injectableName: string = injectable.name;

        if (this.injectables[injectableName]) {
            console.warn(`'${injectableName}' already registered - ignoring`);
            return;
        }

        this.injectables[injectableName] = new injectable();

    }

    public resolve(injectableName: string) {

        return this.injectables[injectableName];

    }

}
