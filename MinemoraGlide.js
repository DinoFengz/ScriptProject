var Tick = 0; 
script.registerModule({
    name: "MinemoraGlide",
    description: "Able u glide in Minemora",
    category: "Movement",
    settings: {
        Tick: Setting.float({
            name: "Tick",
            default: 5,
            min: 1,
            max: 10
        }),
        MotionDown: Setting.float({
            name: "MotionDown",
            default: 0.085,
            min: 0,
            max: 1
        }),
        MotionUp: Setting.float({
            name: "MotionUp",
            default: 0.031,
            min: 0,
            max: 1
        }),
        Timer: Setting.float({
            name: "Timer",
            default: 0.7,
            min: 0.3,
            max: 1
        }),
        Debug: Setting.boolean({
                name: "Debug",
                default: false
        })
    }
}, 
    function (module) {
module.on("enable", function () {
    Tick = 0;
})
module.on("update", function () {
    mc.timer.timerSpeed = 0.7
    if(!mc.thePlayer.onGround) {
        mc.thePlayer.motionY = -module.settings.MotionDown.get();
        if(module.settings.Debug.get()) {
            Chat.print("§c§lTick-Down §7§l" + module.settings.MotionDown.get())
        };
        Tick++
        if(Tick == module.settings.Tick.get()) {
            mc.thePlayer.motionY = module.settings.MotionUp.get();
            if(module.settings.Debug.get() == true) {
                ChatA("§a§lTick-Up §7§l" + module.settings.MotionUp.get())
            };
            Tick = 0;
        }
    }
});
module.on("disable", function () {
    mc.timer.TimerSpeed = 1
});
});
