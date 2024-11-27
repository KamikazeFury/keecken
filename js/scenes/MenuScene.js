class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        // Add background
        this.add.image(400, 300, 'background');

        // Add title text
        this.add.text(400, 200, '2D FIGHTING GAME', {
            fontSize: '32px',
            fill: '#fff',
            fontFamily: 'Arial Black'
        }).setOrigin(0.5);

        // Add menu options
        const singlePlayerText = this.add.text(400, 300, 'Single Player (vs CPU)', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5).setInteractive();

        const twoPlayerText = this.add.text(400, 350, 'Two Players', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5).setInteractive();

        // Add instructions
        this.add.text(400, 450, 'Press SPACEBAR to Start', {
            fontSize: '18px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Add control instructions
        this.add.text(400, 500, 'Player 1: WASD to move, F to punch, G to kick', {
            fontSize: '16px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(400, 530, 'Player 2: Arrow keys to move, Numpad 1 to punch, Numpad 2 to kick', {
            fontSize: '16px',
            fill: '#fff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Handle menu selection
        let selectedMode = 'single';

        singlePlayerText.on('pointerover', () => {
            singlePlayerText.setFill('#ff0');
        });

        singlePlayerText.on('pointerout', () => {
            singlePlayerText.setFill('#fff');
        });

        singlePlayerText.on('pointerdown', () => {
            selectedMode = 'single';
            singlePlayerText.setFill('#0f0');
            twoPlayerText.setFill('#fff');
        });

        twoPlayerText.on('pointerover', () => {
            twoPlayerText.setFill('#ff0');
        });

        twoPlayerText.on('pointerout', () => {
            twoPlayerText.setFill('#fff');
        });

        twoPlayerText.on('pointerdown', () => {
            selectedMode = 'two';
            twoPlayerText.setFill('#0f0');
            singlePlayerText.setFill('#fff');
        });

        // Start game on spacebar press
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('GameScene', { gameMode: selectedMode });
        });
    }
}
