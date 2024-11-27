class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Load fighter sprites
        this.load.spritesheet('fighter1', 'assets/fighter1.png', { 
            frameWidth: 64, 
            frameHeight: 64 
        });
        this.load.spritesheet('fighter2', 'assets/fighter2.png', { 
            frameWidth: 64, 
            frameHeight: 64 
        });
        
        // Load background
        this.load.image('background', 'assets/background.png');
        
        // Load UI elements
        this.load.image('healthBar', 'assets/health-bar.png');
        this.load.image('healthBarBg', 'assets/health-bar-bg.png');
    }

    create() {
        // Create animations for fighter1
        this.anims.create({
            key: 'fighter1-idle',
            frames: this.anims.generateFrameNumbers('fighter1', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });

        // Create animations for fighter2
        this.anims.create({
            key: 'fighter2-idle',
            frames: this.anims.generateFrameNumbers('fighter2', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });

        this.scene.start('MenuScene');
    }
}
