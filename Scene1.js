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
            frameRate: 10,
            repeat: -1,

        })
        this.anims.create({
            key: "middle_anim", 
            frames: this.anims.generateFrameNumbers("middle"),
            frameRate: 10,
            repeat: -1,
        })
        this.anims.create({
            key: "finish_anim", 
            frames: this.anims.generateFrameNumbers("finish"),
            frameRate: 10,
            repeat: -1,

        })

        let diamond = this.diamond;

        let startDuration = 1500;
        let middleDuration = 1500;
        let finishDuration = 1500;

        let timeline = this.tweens.createTimeline();
        

        timeline.add({
            targets: this.diamond,
            scale: 0.5,
            ease: 'linear',
            duration: startDuration,
            onStart: function() {
                diamond.play("start_anim")
            }
        });

        timeline.add({
            targets: this.diamond,
            scale: 0.5,
            ease: 'linear',
            duration: middleDuration,
            onStart: function () {
                diamond.play("middle_anim")
            }
        });

        timeline.add({
            targets: this.diamond,
            y: "-=100",
            scale: 0.09,
            ease: 'linear',
            duration: finishDuration,
            onStart: function () {
                diamond.play("finish_anim")
            },
            onComplete: function() {
                diamond.play("middle_anim");
                diamond.anims.stop();
            }
        });

        timeline.play();
        

       
    }
}

