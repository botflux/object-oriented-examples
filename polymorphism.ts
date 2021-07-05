interface Shape {
    getPerimeter (): number
}

class Square implements Shape {
    constructor(private side: number) {}

    getPerimeter(): number {
        return this.side * 4;
    }
}

class Rectangle implements Shape {
    constructor(private width: number,
                private height: number) {}

    getPerimeter(): number {
        return (this.width + this.height) * 2
    }
}

// We do not construct different shapes the same way
// but we are sure they all have a getPerimeter method.
const rectangle = new Rectangle(2, 5)
const square = new Square(8)

// You can use rectangles and squares as if they were the same thing.
function areSamePerimeter (a: Shape, b: Shape): boolean {
    return a.getPerimeter() === b.getPerimeter()
}
