class Cloud{
    constructor(){
        this.x = 0;
        this.y = random(height);
        this.size = random(1.0, 3.0);
    }
    getX(){
        return this.x;
    }
    draw(){
        fill(255, 255, 255);
        noStroke();
        arc(this.x, this.y, 25 * this.size, 20 * this.size, PI + TWO_PI, TWO_PI);
        arc(this.x + 10, this.y, 25 * this.size, 45 * this.size, PI + TWO_PI, TWO_PI);
        arc(this.x + 25, this.y, 25 * this.size, 35 * this.size, PI + TWO_PI, TWO_PI);
        arc(this.x + 40, this.y, 30 * this.size, 20 * this.size, PI + TWO_PI, TWO_PI);
        if(width > 1000)
            this.x +=3;
        else if(width > 500)
            this.x += 2;
        else
            this.x++;
    }
}