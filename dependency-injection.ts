// Code without dependency injection
class Engine {
    isBroken(): boolean {
        return false
    }
}

class FrontLight {
    isBroken(): boolean {
        return false
    }

    switchOn (): void {}
    switchOff(): void {}
}

class Car {
    private engine: Engine
    private frontLights: [ FrontLight, FrontLight ]

    constructor() {
        this.engine = new Engine()
        this.frontLights = [ new FrontLight(), new FrontLight() ]
    }

    start() {
        if (this.engine.isBroken() || this.frontLights[0].isBroken() || this.frontLights[1].isBroken())
            throw new Error('Cannot start the car is broken')

        this.frontLights.forEach(l => l.switchOn())
        // wait 1 second
        this.frontLights.forEach(l => l.switchOff())
    }
}

// Code with dependency injection
class Engine {
    isBroken(): boolean {
        return false
    }
}

class FrontLight {
    isBroken(): boolean {
        return false
    }

    switchOn (): void {}
    switchOff(): void {}
}

class Car {
    private engine: Engine
    private frontLights: [ FrontLight, FrontLight ]

    constructor(engine: Engine, frontLights: [ FrontLight, FrontLight ]) {
        this.engine = engine
        this.frontLights = frontLights
    }

    start() {
        if (this.engine.isBroken() || this.frontLights[0].isBroken() || this.frontLights[1].isBroken())
            throw new Error('Cannot start the car is broken')

        this.frontLights.forEach(l => l.switchOn())
        // wait 1 second
        this.frontLights.forEach(l => l.switchOff())
    }
}
