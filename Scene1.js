class Scene1 extends Phaser.Scene {
    constructor () {
        super("bootGame");
    }

    preload () {
        this.load.spritesheet("start", "./assets/bri_big_anim_start.png", {
            frameWidth: 392,
            frameHeight: 372,
        });
        this.load.spritesheet("middle", "./assets/bri_big_anim_middle.png", {
            frameWidth: 449,
            frameHeight: 432,
        });
        this.load.spritesheet("finish", "./assets/bri_big_anim_finish.png", {
            frameWidth: 326,
            frameHeight: 337,
        });
    }

    create () {
        this.diamond = this.add.sprite(config.width / 2, config.height / 2, "start");
        
        this.diamond.setScale(0)

        this.anims.create({
            key: "start_anim", 
            frames: this.anims.generateFrameNumbers("start"),
            frameRate: 8,
            repeat: 2,

        })
        this.anims.create({
            key: "middle_anim", 
            frames: this.anims.generateFrameNumbers("middle"),
            frameRate: 8,
            repeat: 1,
        })
        this.anims.create({
            key: "finish_anim", 
            frames: this.anims.generateFrameNumbers("finish"),
            frameRate: 8,
            repeat: 1,

        })


        this.diamond.play("start_anim", 500, true);
        
        this.tweens.add({
            targets: this.diamond,
            scale: 0.5,
            duration: 1500,
            ease: 'linear',

        })

        this.tweens.add({
            targets: this.diamond,
            y: 100,
            scale: 0,
            duration: 3000,
            ease: 'Back',   
            delay: 2500
        });
        

        this.diamond.on('animationcomplete', ()=>{
            this.diamond.play("middle_anim");
            this.diamond.on('animationcomplete', ()=>{
                this.diamond.play("finish_anim");
                this.diamond.on('animationcomplete', ()=>{
                    this.diamond.anims.stop();
                });
            });
        });
    }
}

