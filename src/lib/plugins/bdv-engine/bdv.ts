// Long term:
// @TODO - Graphs, Image Loader (with buffer pixel reading), algos applied to grid and graphs on command.
// @TODO - Easy networking.

// Short term:
// @TODO - Check wth is happening to my triangles.

class Shape {
    actual: string;
    constructor(shape: string) {
        shape = shape.toLowerCase();
        switch (shape) {
            case "rectangle":
                this.actual = "rectangle";
                break;
            case "text":
                this.actual = "text";
                break;
        }
    }
}

class TextFont {
    font: string;
    message: string;
    constructor(message, font) {
        this.font = font;
        this.message = message;
    }
}

class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class Dimension {
    width: number;
    height: number;
    constructor(w: number, h: number) {
        this.width = w;
        this.height = h;
    }
}

class bdv {
    canvasId: string;
    dimensions: Dimension;
    render: null | bdvRender;

    constructor(canvasId: string, width: number, height: number) {
        this.canvasId = canvasId;
        this.dimensions = new Dimension(width, height);
        this.render = null;
    }

    start = () => {
        this.render = new bdvRender(this.canvasId, this.dimensions.width, this.dimensions.height);
        this.game();
    }

    game = () => {
        this.render.loop();
        this.render.clear();
    }

    rect = (x: number, y: number, w: number, h: number, c: string) => {
        this.render.fill(new Shape("rectangle"), new Point(x, y), new Dimension(w, h), c);
    }

    rectOut = (x: number, y: number, w: number, h: number, c: string) => {
        this.render.stroke(new Shape("rectangle"), new Point(x, y), new Dimension(w, h), c);
    }

    vector = (points: number[][], c: string, t?: string) => {
        if (!t) t = "stroke";

        let aux = [];
        for (let point of points) {
            let aux2 = [];
            for (let coord of point) {
                aux2.push(coord);
            }
            aux.push(new Point(aux2[0], aux2[1]));
        }
        this.render.path(aux, t, c);
    }

    circle = (x: number, y: number, r: number, t?: string, c?: string) => {
        this.render.arc(new Point(x, y), r, t, c);
    }

    deleteShape = (shape: Shape, x: number, y: number, w: number, h: number) => {
        this.render.clearShape(shape, new Point(x, y), new Dimension(w, h));
    }

    write = (message: string, font: string, x: number, y: number, color: string) => {
        this.render.fill(new TextFont(message, font), new Point(x, y), null, color);
    }

}


class bdvRender extends bdv {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    dimensions: Dimension;
    defaultColor: string;

    constructor(canvasId: string, width: number, height: number) {
        super(canvasId, width, height);
        this.canvas = <HTMLCanvasElement>document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.dimensions = new Dimension(width, height);
        this.defaultColor = 'black';
    }

    loop = () => {
        requestAnimationFrame(this.animation);
    }

    animation = () => {
        requestAnimationFrame(this.animation);
    }

    clear = () => {
        this.color('black');
        this.fill(new Shape("rectangle"), new Point(0, 0), new Dimension(this.dimensions.width, this.dimensions.height));
    }

    fill = (model: Shape | TextFont, where: Point, size?: Dimension, color?: string) => {
        if (!color) color = this.defaultColor;
        this.color(color);
        if (model instanceof Shape) {
            switch (model.actual) {
                case "rectangle":
                    this.ctx.fillRect(where.x, where.y, size.width, size.height);
                    break;
            }
        }
        else if (model instanceof TextFont) {
            this.ctx.font = model.font;
            this.ctx.fillStyle = color;
            this.ctx.fillText(model.message, where.x, where.y);
        }
    }

    stroke = (model: Shape | TextFont, where: Point, size?: Dimension, color?: string) => {
        if (!color) color = this.defaultColor;
        this.color(color);
        if (model instanceof Shape) {
            switch (model.actual) {
                case "rectangle":
                    this.ctx.strokeStyle = color;
                    this.ctx.strokeRect(where.x, where.y, size.width, size.height);
                    break;
            }
        }
    }

    clearShape = (model: Shape | TextFont, where: Point, size?: Dimension) => {
        if (model instanceof Shape) {
            switch (model.actual) {
                case "rectangle":
                    this.ctx.clearRect(where.x, where.y, size.width, size.height);
                    break;
            }
        }
    }

    path = (points: Point[], type: string, color?: string) => {
        if (!color) color = this.defaultColor;
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        let it = 0;

        for (let point of points) {
            if (it === 0) {
                this.ctx.moveTo(point.x, point.y);
                it++;
                continue;
            }
            this.ctx.lineTo(point.x, point.y);
            it++;
        }
        if (type === "fill") {
            this.ctx.fillStyle = color;
            this.ctx.fill();
        }
        else {
            this.ctx.strokeStyle = color;
            this.ctx.stroke();
        }
    }

    arc = (point: Point, radius: number, type?: string, color?: string) => {
        // Full arc - 0 to 2pi
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
        
        if (!type) type = "stroke";
        if (!color) color = this.defaultColor;

        if (type === "fill") {
            this.ctx.fillStyle = color;
            this.ctx.fill();
        } else {
            this.ctx.strokeStyle = color;
            this.ctx.stroke();
        }
    }

    color = (color: string) => {
        this.ctx.fillStyle = color;
    }

}

window.onload = function () {
    let test = new bdv("CANVAS_ID", 1024, 768);
    test.start();
    test.rect(600, 0, 100, 100, 'purple');
    test.write("hello world", "48px serif", 200, 200, "green");
    test.vector([[75, 50], [100, 75], [100, 25]], "yellow", "fill");
    test.vector([[50, 50], [100, 100]], "red", "stroke");
    test.circle(400, 400, 150, "fill", "blue");

}