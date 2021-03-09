
init(WINDOW)

fill("#e8e3c3");
rect(0, 0, W,H)

let axiom = "FX";

let rules = {
  X: "XpYFp",
  Y: "nFXnY",
  F: "F",
  p: "p",
  n: "n",
}

function drawPath(points){
  ctx.beginPath;
  ctx.moveTo(points[0].x, points[0].y)
  for(let i = 1; i < points.length; i++){
    ctx.lineTo(points[i].x, points[i].y)
  }
  ctx.stroke();
}

function Point(x, y, dx, dy){
  this.pos = new Vector(x, y);
  dx = dx || x;
  dy = dy || y;
  this.dest = new Vector(dx, dy)
  this.render = () => {
    noStroke();
    fill(57, 64, 50);
    ellipse(this.pos.x, this.pos.y, 6)
    rect(
      this.pos.x - 4,
      this.pos.y - 4,
      8,
      8
    )
  };
  this.t = 0;
  // this.currentDest = Math
  this.easeToDest = () => {
    if(dist(this.pos, this.dest) > 0.1 || this.t < 1){
      this.t += 0.01;
      this.pos.x = lerp(this.pos.x, this.dest.x, this.t);
      this.pos.y = lerp(this.pos.y, this.dest.y, this.t);
    }
    // if(this.pos.x < this.dest.x)this.pos.x += 3;
    // if(this.pos.x > this.dest.x)this.pos.x -= 3;
    // if(this.pos.y < this.dest.y)this.pos.y += 3;
    // if(this.pos.y > this.dest.y)this.pos.y -= 3;
  }
}

function rewrite(string, maxIterations=1){
  let newString = "";
  let os = string;
  for(let currentIterations = 0; currentIterations < maxIterations; currentIterations++){
    if(currentIterations !== 0){
      os = newString;
      newString = "";
    }
    for(let i = 0; i < os.length; i++){
      newString += rules[os[i]];
    }
  }
  return newString;
}

function axiomPoints(_axiom, x, y, len){

  let angle = 0;
  let cx = x;
  let cy = y;
  let lastx = cx;
  let lasty = cy;
  let points = [];
  points.push(new Point(cx, cy));
  for(let i = 0; i < _axiom.length; i++){
    let char = _axiom[i];
    if(char === "F"){
      lastx = cx;
      lasty = cy;

      //move forward
      cx += len * Math.cos(angle);
      cy += len * Math.sin(angle);
      points.push(new Point(cx, cy));
      stroke(0, 0.5)
      strokeWeight(2);
      // line(cx, cy, lastx, lasty);
    }
    if(char === "n"){
      //rotate right
      angle += Math.PI / 2;
    }
    if(char === "p"){
      //rotate left
      angle -= Math.PI / 2;
    }
  }
  return points
}

let nextAxiom = rewrite(axiom, 12);

// drawAxiom(nextAxiom, W * .7, H * .6, 8)
let aps = axiomPoints(nextAxiom, W * .7, H * .65, 6);
stroke(0, 0.5)
strokeWeight(2);
// drawPath(aps);

aps.forEach(point => {
  // point.render();
  point.pos = new Vector(Math.random() * W, Math.random() * H);
  // point.pos = new Vector(W/2, H/2);
  // point.pos.y = 0;
})




let c = 0;
let mps = 0;

function siftOut(){
  for(let i = 0; i < aps.length; i++){
    let cp = aps[i];
    for(let j = aps.length; j >= 0; j--){
      if(i !== j){
        if(dist(aps[i].pos, aps[j].pos) = 0){
          aps.splice(j, 0);
        }
      }
    }
  }
}

// siftOut();

function run() {
  // if(c++ < 130){
    noStroke();
    fill(rgba(232, 227, 195, 0.6))
    rect(0,0,W,H)
    // for(let i = 1; i < aps.length; i++){
    //   stroke(0)
    //   line(aps[i-1].pos.x, aps[i-1].pos.y, aps[i].pos.x, aps[i].pos.y)
    // }
    for(let i = 0; i < mps; i++){
      let point = aps[i];
      point.easeToDest();
      point.render();
    }
    mps += 6;
    mps = limit(mps, aps.length)
    // noStroke();
    // aps.forEach((point) => {
    //   point.easeToDest();
    //   point.render();
    // });
  // }
}

startAnimation();
