export class Difficulty {
  constructor() {
    this.time = 0;
  }

  update(delta) {
    this.time += delta;
  }

  // Multiplier that slowly increases
  get speedMultiplier() {
    const radians = this.time * 0.0004; // controls cycle speed
    const sine = Math.sin(radians);
  
    return 1.5 + sine * 0.5; 
  }


  get spawnMultiplier() {
  const radians = this.time * 0.0004;
  const sine = Math.sin(radians);

  return 0.7 - sine * 0.3;
  }
}



    
    // let radians = this.time / 1000 * (Math.PI / 180);
    
    // // Calculate sine
    // let sineValue = Math.sin(radians);

    // return Math.max(1, 1 + 10 * sineValue)
