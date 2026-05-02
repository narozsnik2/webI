class Shape {
    constructor(color, size) {
        this.color = color;
        this.size = size;
        this.domElement = document.createElement('div');
    }


    render(x, y) {
        this.domElement.classList.add('shape');
        this.domElement.style.backgroundColor = this.color;
        this.domElement.style.width = this.size + 'px';
        this.domElement.style.height = this.size + 'px';
        this.domElement.style.left = x + 'px';
        this.domElement.style.top = y + 'px';

  
        document.getElementById('canvas').appendChild(this.domElement);
    }
}


class Square extends Shape {
    constructor(color, size) {
        super(color, size);
    }

    rotate() {
        this.domElement.style.transform = 'rotate(45deg)';
    }
}


class Circle extends Shape {
    constructor(color, size) {
        super(color, size);
    }


    render(x, y) {
        super.render(x, y);
        this.domElement.style.borderRadius = '50%';
    }
}


function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function addRandomSquare() {
    const s = new Square(`rgb(${getRandom(0,255)},${getRandom(0,255)},${getRandom(0,255)})`, getRandom(30, 80));
    s.render(getRandom(0, 500), getRandom(0, 300));
}

function addRandomCircle() {
    const c = new Circle(`rgb(${getRandom(0,255)},${getRandom(0,255)},${getRandom(0,255)})`, getRandom(30, 80));
    c.render(getRandom(0, 500), getRandom(0, 300));
}