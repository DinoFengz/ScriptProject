var scriptName = "DinoFly";
var scriptAuthor = "DinoFeng";
var scriptVersion = "1.0.0";
var scriptGithub = "https://github.com/DinoFengz/ScriptProject";
var script = registerScript({
    name: "DinoFly",
    version: "1.0.0",
    authors: ["DinoFeng"]
});
var Fonts = Java.type("net.ccbluex.liquidbounce.ui.font.Fonts");
var ScaledResolution = Java.type("net.minecraft.client.gui.ScaledResolution");
var Color = Java.type("java.awt.Color");
var MathHelper = Java.type("net.minecraft.util.MathHelper")
var C02 = Java.type("net.minecraft.network.play.client.C02PacketUseEntity");
var C02A = Java.type("net.minecraft.network.play.client.C02PacketUseEntity.Action");
var C16 = Java.type("net.minecraft.network.play.client.C16PacketClientStatus");
var C0F = Java.type("net.minecraft.network.play.client.C0FPacketConfirmTransaction");
var C06 = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C06PacketPlayerPosLook");
var C05 = Java.type('net.minecraft.network.play.client.C03PacketPlayer.C05PacketPlayerLook')
var C03 = Java.type("net.minecraft.network.play.client.C03PacketPlayer");
var C04 = Java.type("net.minecraft.network.play.client.C03PacketPlayer.C04PacketPlayerPosition");
var C08 = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement");
var C09 = Java.type('net.minecraft.network.play.client.C09PacketHeldItemChange');
var S02 = Java.type("net.minecraft.network.play.server.S02PacketChat");
var S12 = Java.type('net.minecraft.network.play.server.S12PacketEntityVelocity');
var C07 = Java.type("net.minecraft.network.play.client.C07PacketPlayerDigging");
var BlockPos = Java.type('net.minecraft.util.BlockPos');
var thePlayer = Java.type("net.ccbluex.liquidbounce.utils.MovementUtils");
var Block = Java.type('net.minecraft.block.Block');
var Blocks = Java.type('net.minecraft.init.Blocks');
var S08 = Java.type('net.minecraft.network.play.server.S08PacketPlayerPosLook');
var RotationUtils = Java.type('net.ccbluex.liquidbounce.utils.RotationUtils');
var Rotation = Java.type('net.ccbluex.liquidbounce.utils.Rotation');
var ItemBucket = Java.type("net.minecraft.item.ItemBucket");
var GuiChest = Java.type("net.minecraft.client.gui.inventory.GuiChest");
var Blocks = Java.type("net.minecraft.init.Blocks");
var EntityBoat = Java.type("net.minecraft.entity.item.EntityBoat");
var MovementUtils = Java.type("net.ccbluex.liquidbounce.utils.MovementUtils")
function ChatP(_Chat) {Chat.print("§8[§e§lDinoFly§8] §f§l" + _Chat)}
Math.radian = function(deg) {return deg * Math.PI / 180}
function getScaledWidth() {var scaledWidth = new ScaledResolution(mc).getScaledWidth();return scaledWidth}
function getScaledHeight() {var scaledHeight = new ScaledResolution(mc).getScaledHeight();return scaledHeight}
function clip(dist, y) {var yaw = Math.radian(mc.thePlayer.rotationYaw);var x = -Math.sin(yaw) * dist;var z = Math.cos(yaw) * dist;mc.thePlayer.setPosition(mc.thePlayer.posX + x, mc.thePlayer.posY + y, mc.thePlayer.posZ + z);mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))}
function setSpeed(_speed) {var playerYaw = Math.radian(mc.thePlayer.rotationYaw);mc.thePlayer.motionX = _speed * -Math.sin(playerYaw);mc.thePlayer.motionZ = _speed * Math.cos(playerYaw)}
function setDiagSpeed(_speed) {var playerYaw = Math.radian(mc.thePlayer.rotationYaw + 90);mc.thePlayer.motionX = _speed * -Math.sin(playerYaw);mc.thePlayer.motionZ = _speed * Math.cos(playerYaw)}
function setMoveSpeed(_speed) {if (mc.gameSettings.keyBindLeft.isKeyDown() || mc.gameSettings.keyBindRight.isKeyDown()) {setDiagSpeed(_speed*-mc.thePlayer.moveStrafing);} else {setSpeed(_speed * mc.thePlayer.moveForward)}}
function Forward(_s) {var dir = Math.radian(mc.thePlayer.rotationYaw);mc.thePlayer.motionX += -Math.sin(dir) * _s;mc.thePlayer.motionZ += Math.cos(dir) * _s}
function Right(_s) {var dir = Math.radian(mc.thePlayer.rotationYaw + 90);mc.thePlayer.motionX += -Math.sin(dir) * _s;mc.thePlayer.motionZ += Math.cos(dir) * _s}
function Back(_s) {var dir = Math.radian(mc.thePlayer.rotationYaw + 180);mc.thePlayer.motionX += -Math.sin(dir) * _s;mc.thePlayer.motionZ += Math.cos(dir) * _s}
function Left(_s) {var dir = Math.radian(mc.thePlayer.rotationYaw + 270);mc.thePlayer.motionX += -Math.sin(dir) * _s;mc.thePlayer.motionZ += Math.cos(dir) * _s}
function hor(_speed) {if (mc.gameSettings.keyBindForward.isKeyDown()) {Forward(_speed)}; if(mc.gameSettings.keyBindRight.isKeyDown()) {Right(_speed)};if (mc.gameSettings.keyBindBack.isKeyDown()) {Back(_speed)};if (mc.gameSettings.keyBindLeft.isKeyDown()) {Left(_speed)}}
function ver(_speed) {if (mc.gameSettings.keyBindJump.isKeyDown()) {mc.thePlayer.motionY += _speed};if (mc.gameSettings.keyBindSneak.isKeyDown()) {mc.thePlayer.motionY -= _speed}}
var Vulcan2T = 0;
var VulcanTick = 0;
var Vulcan2Tick = 0;
var Vulcan2Ready = false
var vulcan2done = false
var MinemoraTick = 0;
var MinemoraDone = false
var orgx = 0;
var HYTick = 0;
var orgy = 0;
var orgz = 0;
var Minemora2True = false
var Hycraft2Ready = false
var VulcanNewTick = 0;
var BattleasyaTick = 0;
var BattleasyaTick2 = 0;
var BattleasyaDone = false
var Battleasya2Done = false
script.on("load", function() {
    ChatP("First: Thx For you using our script!")
    ChatP("Script Name: " + scriptName)
    ChatP("Script Author: " + scriptAuthor)
    ChatP("Script Version: " + scriptVersion)
})
script.registerModule({
    name: "DinoFly",
    description: "More FlyMode For LiquidBounce",
    category: "Movement",
    tag: "Mode",
    settings: {
        Mode:Setting.list({name: "Mode",default: "Vanilla",values: ["Creative","Vanilla","Minemora","Vulcan"]}),
        VulcanMode:Setting.list({name: "VulcanMode", default: "Normal", values: ["Normal","Battleasya","Battleasya2","Hycraft"]}),
        MotionReset:Setting.boolean({name: "MotionReset",default: false}),
        VanillaSpeed:Setting.float({name: "Vanilla-Speed",default: 1,min: 1,max: 10}),
        VanillaVerticalSpeed:Setting.float({name: "Vanilla-VerticalSpeed",default: 1,min: 1,max: 10}),
        VerusTimerFix:Setting.boolean({name: "VerusNew-TimerToFix",default: true}),
        MinemoraBoostHeight:Setting.float({name: "Minemora-BoostMotion",default: 1,min: 0,max: 1}),
        MinemoraMotionDown:Setting.float({name: "Minemora-MotionDown",default: 0.085,min: 0,max: 1}),
        VulcanNormalSpeed:Setting.float({name: "Vulcan-Normal-Speed",default: 1,min: 1,max: 10}),
        VulcanBattleasyaSpeed:Setting.float({name: "Battleasya-Clip",default: 8,min: 1,max: 10}),
        VulcanBattleasyaHeightSpeed:Setting.float({name: "Battleasya-ClipHeight",default: 8,min: 1,max: 10}),
        VulcanBattleasya2V:Setting.float({name: "Battleasya2-VBoost",default: 1,min: 1,max: 10}),
        VulcanBattleasya2H:Setting.float({name: "Battleasya2-HBoost",default: 8,min: 1,max: 10}),
        VulcanHycraftSpeed:Setting.float({name: "Hycraft-Speed",default: 1,min: 1,max: 10}),
        VulcanHycraftDelay:Setting.float({name: "Hycraft-Delay",default: 1,min: 1,max: 10}),
        VulcanHycraftBypass:Setting.boolean({name: "Hycraft-Bypass",default: true}),
        ToggleMessage:Setting.boolean({name: "ToggleMessage",default: true})
    }
}, function (module) {
    module.on("enable", function () {
        if(module.settings.ToggleMessage.get()) {
            ChatP("You are using 1.0.0 DinoFly Script By DinoFeng!")
        }
        BattleasyaTick = 0;
        BattleasyaTick2 = 0;
        BattleasyaDone = false
        Battleasya2Done = false
        Hycraft2Ready = false
        VulcanNewTick = 0;
        Vulcan2T = 0;
        Vulcan2Ready = false
        vulcan2done = false
        MinemoraTick = 0;
        MinemoraDone = false;
        VulcanTick = 0;
        Vulcan2Tick = 0;
        orgx = mc.thePlayer.posX
        orgy = mc.thePlayer.posY
        orgz = mc.thePlayer.posZ
        switch (module.settings.Mode.get().toLowerCase()) {
            case "minemora":
                if(!mc.thePlayer.onGround) {
                    MinemoraDone = true
                }
            break;
            case "minemoraa":
                Minemora2True = true
            break;
            case "vulcan":
                switch(module.settings.VulcanMode.get()) {
                    case "Normal":
                        if(mc.thePlayer.onGround) {
                            mc.timer.timerSpeed = 0.14;
                            clip(0,-2)
                        } else {
                            VulcanTick = 1;
                        }
                    break;
                    case "Battleasya":
                        if(mc.thePlayer.onGround) {
                            mc.timer.timerSpeed = 0.5;
                            mc.thePlayer.setPosition(mc.thePlayer.posX , mc.thePlayer.posY - 1.2 , mc.thePlayer.posZ)
                        } else {
                            ChatP("Doesnt OnGround!")
                            module.setState(false)
                        }
                    break;
                    case "Battleasya2":
                        if(mc.thePlayer.onGround) {
                            clip(0,-2)
                        } else {
                            ChatP("Doesnt OnGround!")
                            module.setState(false)
                        }
                    break;
                    case "Hycraft":
                        if(mc.thePlayer.onGround) {
                            clip(0,-1)
                        }
                    break;
                }
            break;
        }
    });
    module.on("packet", function (event) {
        var packet = event.getPacket();
        if(packet instanceof S08) {
            switch(module.settings.Mode.get().toLowerCase()) {
                case "vulcan":
                    switch(module.settings.VulcanMode.get()) {
                        case "Normal":
                            VulcanTick++
                            ChatP("S08 : " + VulcanTick)
                            if(VulcanTick > 10) {
                                ChatP("False")
                                module.setState(false)
                            }
                        break;
                        case "Battleasya":
                            Vulcan2Ready = true
                            ChatP("Detected")
                        break;
                        case "Battleasya2":
                            BattleasyaDone = true
                            ChatP("Detected")
                        break;
                        case "Hycraft":
                            Hycraft2Ready = true
                            ChatP("Detected")
                        break;
                    }
                break;
                case "minemora":
                    if(MinemoraDone) {
                        ChatP("SetBack Detected")
                    }
                break;
           }
        }
        if(module.settings.Mode.get() == "Minemoraa") {
            if(Minemora2True) {
                event.cancelEvent()
            }
        }
    });
    module.on("update", function () {
        module.tag=module.settings.Mode.get()
        switch (module.settings.Mode.get().toLowerCase()) {
            case "creative": 
                mc.thePlayer.capabilities.allowFlying = true;
            break;
            case "vanilla":
                mc.thePlayer.motionX = 0;
                mc.thePlayer.motionZ = 0;
                mc.thePlayer.motionY = 0;
                hor(module.settings.VanillaSpeed.get())
                ver(module.settings.VanillaVerticalSpeed.get())
            break;
            case "minemoraa":
                if(Minemora2True) {
                    if(mc.gameSettings.keyBindSneak.pressed) {
                        mc.thePlayer.setPosition(mc.thePlayer.posX , mc.thePlayer.posY , mc.thePlayer.posZ)
                        mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX , mc.thePlayer.posY , mc.thePlayer.posZ , false))
                        mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX , mc.thePlayer.posY , mc.thePlayer.posZ , false))
                        Minemora2True = false
                        module.setState(false)
                    }
                    mc.thePlayer.motionY = 0;
                    mc.thePlayer.motionX = 0;
                    mc.thePlayer.motionZ = 0;
                    hor(1)
                    ver(1)
                }
            case "minemora":
                if(!MinemoraDone) {
                    if(mc.thePlayer.onGround) {
                        mc.thePlayer.jump()
                        MinemoraTick++
                    }
                    if(MinemoraTick >= 4) {
                        MinemoraTick++
                        mc.thePlayer.motionY = module.settings.MinemoraBoostHeight.get()
                    }
                    if(MinemoraTick >= 7) {
                        mc.thePlayer.motionY = 0;
                        MinemoraTick = 0;
                        MinemoraDone = true
                    }
                }
                if(MinemoraDone) {
                    if(!mc.thePlayer.onGround) {
                        MinemoraTick++
                        mc.thePlayer.motionY = -module.settings.MinemoraMotionDown.get();
                        if(MinemoraTick==1) {
                            mc.timer.timerSpeed = 0.7
                            clip(0,0)
                        }
                        if(MinemoraTick==4) {
                            mc.timer.timerSpeed = 1
                        }
                        if(MinemoraTick>=5) {
                            mc.timer.timerSpeed = 1
                            if(mc.thePlayer.hurtTime > 0) {
                                mc.thePlayer.motionY = 0.2
                            }
                            MinemoraTick = 0;
                        }
                    } else {
                        mc.timer.timerSpeed = 1
                    }
                }
            break;
            case "vulcan":
                switch(module.settings.VulcanMode.get()) {
                    case "Normal":
                        if(VulcanTick < 10 && VulcanTick > 0) {
                            mc.timer.timerSpeed = 0.14;
                            mc.thePlayer.motionX = 0;
                            mc.thePlayer.motionY = 0;
                            mc.thePlayer.motionZ = 0;
                            if (mc.gameSettings.keyBindForward.isKeyDown() || mc.gameSettings.keyBindRight.isKeyDown() || mc.gameSettings.keyBindBack.isKeyDown() || mc.gameSettings.keyBindLeft.isKeyDown()) {
                                clip(module.settings.VulcanNormalSpeed.get() * 10,0)
                            }
                            ver(module.settings.VulcanNormalSpeed.get())
                        }
                    break;
                    case "Battleasya":
                        if(Vulcan2Ready) {
                            clip(module.settings.VulcanBattleasyaSpeed.get(),module.settings.VulcanBattleasyaHeightSpeed.get())
                            Vulcan2T = 1;
                            mc.timer.timerSpeed = 1
                            Vulcan2Ready = false
                        }
                        if(Vulcan2T == 1) {
                            mc.gameSettings.keyBindForward.pressed = true
                            Vulcan2Tick++
                            if(Vulcan2Tick >= 3 && mc.thePlayer.fallDistance >= 2) {
                                mc.thePlayer.fallDistance = 0;
                                mc.thePlayer.motionY = 0.1
                                Vulcan2Tick = 0;
                            }
                            if(mc.thePlayer.onGround) {
                                mc.gameSettings.keyBindForward.pressed = false
                                module.setState(false)
                            }
                        }
                    break;
                    case "Battleasya2":
                        if(BattleasyaDone) {
                            var yaw = Math.radian(mc.thePlayer.rotationYaw);
                            var x = -Math.sin(yaw) * module.settings.VulcanBattleasya2H.get();
                            var z = Math.cos(yaw) * module.settings.VulcanBattleasya2H.get();
                            mc.thePlayer.motionX = x
                            mc.thePlayer.motionY = module.settings.VulcanBattleasya2V.get()
                            mc.thePlayer.motionZ = z
                            BattleasyaDone = false
                            Battleasya2Done = true
                        }
                        if(Battleasya2Done) {
                            BattleasyaTick++
                            BattleasyaTick2++
                            if(BattleasyaTick >= 2) {
                                clip(0,0)
                                BattleasyaTick = 0
                            }
                            if(BattleasyaTick2 >= 10) {
                                mc.thePlayer.motionX = 0;
                                mc.thePlayer.motionZ = 0;
                                BattleasyaTick2 = false
                                module.setState(false)
                            }
                        }
                    break;
                    case "Hycraft":
                    if(Hycraft2Ready) {
                        VulcanNewTick++
                        if(VulcanNewTick >= module.settings.VulcanHycraftDelay.get() * 20) {
                            clip(module.settings.VulcanHycraftSpeed.get() * 10,0)
                            mc.timer.timerSpeed = 0.6
                            VulcanNewTick = 0;
                        } else {
                            if(mc.gameSettings.keyBindJump.pressed) {
                                clip(0,1)
                            }
                            if(mc.gameSettings.keyBindSneak.pressed) {
                                clip(0,-1)
                            }
                            mc.thePlayer.setPosition(mc.thePlayer.posX , mc.thePlayer.posY, mc.thePlayer.posZ)
                            mc.gameSettings.keyBindForward.pressed = false
                            mc.gameSettings.keyBindBack.pressed = false
                            mc.gameSettings.keyBindLeft.pressed = false
                            mc.gameSettings.keyBindRight.pressed = false
                            mc.timer.timerSpeed = 1
                            if(module.settings.VulcanHycraftBypass.get()) {
                                HYTick++
                                if(HYTick >= 20) {
                                    HYTick = 0;
                                    clip(0,-1)
                                }
                            }
                        }
                        mc.thePlayer.motionX = 0;
                        mc.thePlayer.motionY = 0;
                        mc.thePlayer.motionZ = 0;
                    }
                    break;
                 }
            break;
        }
    });
    module.on("render2D", function (event) {
        var mcHeight = getScaledHeight();
        var mcWidth = getScaledWidth();
        switch(module.settings.Mode.get().toLowerCase()) {
            case "minemora":
            if(!MinemoraDone) {
                Fonts.minecraftFont.drawStringWithShadow("Count: " + MinemoraTick + "/4",  mcWidth/2-19, mcHeight/2+12, 0xFFFFFF);
            } else {
                Fonts.minecraftFont.drawStringWithShadow("Tick: " + MinemoraTick,  mcWidth/2-19, mcHeight/2+12, 0xFFFFFF);
            }
        }
    });
    module.on("disable", function () {
        if(module.settings.Mode.get() == "Minemora2") {
            Minemora2True = false
            mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX , mc.thePlayer.posY , mc.thePlayer.posZ , false))
        }
        if(module.settings.Mode.get() == "Creative") {
            mc.thePlayer.capabilities.allowFlying = false;
            mc.thePlayer.capabilities.isFlying = false;
        }
        mc.thePlayer.speedInAir = 0.02
        mc.timer.timerSpeed = 1;
        if(module.settings.MotionReset.get() && module.settings.VulcanMode.get() != "Battleasya2") {
            mc.thePlayer.motionX = 0;
            mc.thePlayer.motionZ = 0;
            mc.thePlayer.motionY = 0;
        }
    });
});
