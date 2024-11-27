class Fighter extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, isPlayer = true, playerNumber = 1) {
        super(scene, x, y, texture);
        
        this.scene = scene;
        this.isPlayer = isPlayer;
        this.playerNumber = playerNumber;
        
        // Add fighter to the scene
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Fighter properties
        this.health = 100;
        this.isAttacking = false;
        this.attackCooldown = false;
        
        // Set physics properties
        this.setCollideWorldBounds(true);
        this.setBounce(0.2);
        
        // Initialize controls based on player number
        this.initializeControls();
    }

    initializeControls() {
        if (this.isPlayer) {
            if (this.playerNumber === 1) {
                this.controls = {
                    left: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
                    right: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
                    jump: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
                    punch: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F),
                    kick: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G)
                };
            } else {
                this.controls = {
                    left: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
                    right: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
                    jump: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
                    punch: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE),
                    kick: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO)
                };
            }
        }
    }

    update() {
        if (this.isPlayer) {
            this.handlePlayerInput();
        } else {
            this.handleNPCBehavior();
        }
    }

    handlePlayerInput() {
        // Movement
        if (this.controls.left.isDown) {
            this.setVelocityX(-160);
            this.setFlipX(true);
        } else if (this.controls.right.isDown) {
            this.setVelocityX(160);
            this.setFlipX(false);
        } else {
            this.setVelocityX(0);
        }

        // Jump
        if (this.controls.jump.isDown && this.body.touching.down) {
            this.setVelocityY(-330);
        }

        // Attacks
        if (this.controls.punch.isDown && !this.attackCooldown) {
            this.punch();
        }
        if (this.controls.kick.isDown && !this.attackCooldown) {
            this.kick();
        }
    }

    handleNPCBehavior() {
        // Basic AI behavior
        const player = this.scene.player1;
        if (!player) return;

        const distance = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
        
        if (distance < 100) {
            // Attack when close
            if (!this.attackCooldown) {
                Math.random() > 0.5 ? this.punch() : this.kick();
            }
        } else {
            // Move towards player
            if (this.x < player.x) {
                this.setVelocityX(100);
                this.setFlipX(false);
            } else {
                this.setVelocityX(-100);
                this.setFlipX(true);
            }
        }
    }

    punch() {
        if (this.attackCooldown) return;
        
        this.isAttacking = true;
        this.attackCooldown = true;
        
        // Attack hitbox
        this.scene.checkAttackHit(this, 20, 'punch');

        // Reset attack state after delay
        this.scene.time.delayedCall(400, () => {
            this.isAttacking = false;
            this.scene.time.delayedCall(200, () => {
                this.attackCooldown = false;
            });
        });
    }

    kick() {
        if (this.attackCooldown) return;
        
        this.isAttacking = true;
        this.attackCooldown = true;
        
        // Attack hitbox
        this.scene.checkAttackHit(this, 25, 'kick');

        // Reset attack state after delay
        this.scene.time.delayedCall(500, () => {
            this.isAttacking = false;
            this.scene.time.delayedCall(300, () => {
                this.attackCooldown = false;
            });
        });
    }

    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
        // Flash red when taking damage
        this.setTint(0xff0000);
        this.scene.time.delayedCall(100, () => {
            this.clearTint();
        });
    }
}
