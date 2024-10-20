class FlappyBird {

  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.jumpImpulse = 10;
    this.vy = 3;

    this.sprite = new Image();
    this.sprite.src = 'assets/img/bird.png';
    // sprite setup
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 3;
    this.sprite.verticalFrames = 1;
    this.sprite.onload = () => {
      this.sprite.frameWith = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
      this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
      this.width = this.sprite.frameWith;
      this.height = this.sprite.frameHeight;
    }

    this.drawCount = 0;
    this.wasJumping = false;
  }

  onKeyEvent(event) {
    const isJumping = event.type === 'keydown';

    switch (event.keyCode) {
      case KEY_UP:
        if(isJumping && !this.wasJumping) {
          this.vy = -this.jumpImpulse;
          this.wasJumping = true
          setTimeout(() => {
            this.vy = 3;
          }, 100);
        } else if (!isJumping) this.wasJumping = false;
    }
  }

  draw() {
    // draw sprite
    this.ctx.drawImage(this.sprite,
      this.sprite.horizontalFrameIndex * this.width,
      this.sprite.verticalFrameIndex * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    )
    // animate sprite
    this.animate();
  }

  animate() {
    // iteration 2: configure frame animation

    this.drawCount ++;

    if(this.drawCount > 10) {
      this.drawCount = 0;
      this.sprite.horizontalFrameIndex ++;

      if (this.sprite.horizontalFrameIndex >= this.sprite.horizontalFrames) {
        this.sprite.horizontalFrameIndex = 0;
      }
    }
  }

  move() {
    // iteration 2: move the y
    this.y  += this.vy;

  }

  collides(element) {
    // iteration 3: check collisions (true|false)
    return this.x < element.x + element.width &&
      this.x + this.width > element.x &&
      this.y < element.y + element.height &&
      this.y + this.height > element.y;
  }
}
