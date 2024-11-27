class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init(data) {
        this.gameMode = data.gameMode;
    }

    create() {
        // Add background
        this.add.image(400, 300, 'background');

        // Create platform
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, 'healthBarBg').setScale(2).refreshBody();

        // Create fighters
        this.player1 = new Fighter(this, 200, 450, 'fighter1', true, 1);
        
        if (this.gameMode === 'two') {
            this.player2 = new Fighter(this, 600, 450, 'fighter2', true, 2);
        } else {
            this.player2 = new Fighter(this, 600, 450, 'fighter2', false);
        }

        // Add colliders
        this.physics.add.collider(this.player1, this.platforms);
        this.physics.add.collider(this.player2, this.platforms);
        this.physics.add.collider(this.player1, this.player2);

        // Create health bars
        this.createHealthBars();
    }

    createHealthBars() {
        // Player 1 health bar
        this.p1HealthBarBg = this.add.image(150, 50, 'healthBarBg').setOrigin(0, 0.5);
        this.p1HealthBar = this.add.image(150, 50, 'healthBar').setOrigin(0, 0.5);
        
        // Player 2 health bar
        this.p2HealthBarBg = this.add.image(450, 50, 'healthBarBg').setOrigin(0, 0.5);
        this.p2HealthBar = this.add.image(450, 50, 'healthBar').setOrigin(0, 0.5);

        // Set up health bar scaling
        this.updateHealthBars();
    }

    updateHealthBars() {
        // Update health bar scales based on fighter health
        this.p1HealthBar.setScale(this.player1.health / 100, 1);
        this.p2HealthBar.setScale(this.player2.health / 100, 1);

        // Check for game over
        if (this.player1.health <= 0 || this.player2.health <= 0) {
            this.gameOver();
        }
    }

    checkAttackHit(attacker, damage, attackType) {
        const defender = attacker === this.player1 ? this.player2 : this.player1;
        const distance = Phaser.Math.Distance.Between(attacker.x, attacker.y, defender.x, defender.y);
        
        // Check if attack hits based on distance and facing direction
        if (distance < (attackType === 'kick' ? 80 : 60)) {
            const attackerFacingRight = !attacker.flipX;
            const defenderOnRight = defender.x > attacker.x;
            
            if (attackerFacingRight === defenderOnRight) {
                defender.takeDamage(damage);
                this.updateHealthBars();
            }
        }
    }

    gameOver() {
        // Create game over text
        const winner = this.player1.health > 0 ? 'Player 1' : 'Player 2';
        const gameOverText = this.add.text(400, 300, `Game Over!\n${winner} Wins!\n\nPress SPACE to return to menu`, {
            fontSize: '32px',
            fill: '#fff',
            align: 'center',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Add space key handler to restart
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('MenuScene');
        });

        // Pause the game
        this.physics.pause();
    }

    update() {
        // Update fighters
        this.player1.update();
        this.player2.update();
    }
}
