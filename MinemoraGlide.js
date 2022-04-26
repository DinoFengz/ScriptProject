var scriptName = "DinoFly";
var scriptAuthor = "DinoFeng";
var scriptVersion = "1.0";
var scriptGithub = "https://github.com/DinoFengz/ScriptProject";
var script = registerScript({
    name: "DinoFly",
    version: "1.0",
    authors: ["DinoFeng"]
});
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
var VanillaBypassTick = 0;
var VanillaBypassTick2 = 0;
var VerusTick = 0;
var MinemoraTick = 0;
var orgx = 0;
var orgy = 0;
var orgz = 0;
var verustrue = 0;
var verusa = 0;
var Vulcan2Ready = false
function ChatP(_Chat) {
    Chat.print("§8[§e§lDinoFly§8] §f§l" + _Chat)
}
Math.radian = function(deg) {
    return deg * Math.PI / 180;
}

function clip(dist, y) {var yaw = Math.radian(mc.thePlayer.rotationYaw);var x = -Math.sin(yaw) * dist;var z = Math.cos(yaw) * dist;mc.thePlayer.setPosition(mc.thePlayer.posX + x, mc.thePlayer.posY + y, mc.thePlayer.posZ + z);mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false))}
function setSpeed(_speed) {
    var playerYaw = Math.radian(mc.thePlayer.rotationYaw);

    mc.thePlayer.motionX = _speed * -Math.sin(playerYaw);
    mc.thePlayer.motionZ = _speed * Math.cos(playerYaw);
}
function setDiagSpeed(_speed) {
    var playerYaw = Math.radian(mc.thePlayer.rotationYaw + 90);
    mc.thePlayer.motionX = _speed * -Math.sin(playerYaw);
    mc.thePlayer.motionZ = _speed * Math.cos(playerYaw);
}
function setMoveSpeed(_speed) {
    if (mc.gameSettings.keyBindLeft.isKeyDown() || mc.gameSettings.keyBindRight.isKeyDown()) {
        setDiagSpeed(_speed*-mc.thePlayer.moveStrafing);
    } else {
        setSpeed(_speed * mc.thePlayer.moveForward);
    }
}
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
script.registerModule({
    name: "DinoFly",
    description: "A Modules make u can fly in survival mode!",
    category: "Movement",
    tag: "NULL",
    settings: {
        Mode:Setting.list({name: "Mode",default: "Vanilla",values: ["Creative","Vanilla","VerusNew","OldVulcan","Vulcan","VulcanClip","Minemora","Mineland"]}),
        MotionReset:Setting.boolean({name: "MotionReset",default: true}),
        VanillaSpeed:Setting.float({name: "Vanilla-Speed",default: 1,min: 1,max: 10}),
        VanillaVerticalSpeed:Setting.float({name: "Vanilla-VerticalSpeed",default: 1,min: 1,max: 10}),
        VerusSpeed:Setting.float({name: "VerusNew-Speed",default: 1,min: 1,max: 10}),
        VerusTimerFix:Setting.boolean({name: "VerusNew-TimerToFix",default: true}),
        MinemoraBoostHeight:Setting.float({name: "Minemora-BoostMotion",default: 1,min: 0,max: 1}),
        MinemoraMotionDown:Setting.float({name: "Minemora-MotionDown",default: 0.085,min: 0,max: 1}),
        OVSpeed:Setting.float({name: "OldVulcan-Speed",default: 1,min: 1,max: 10}),
        VulcanSpeed:Setting.float({name: "Vulcan-Speed",default: 1,min: 1,max: 10}),
        Vulcan2Speed:Setting.float({name: "VulcanClip-Clip",default: 10,min: 10,max: 20}),
        Vulcan2HeightSpeed:Setting.float({name: "VulcanClip-ClipHeight",default: 1,min: 1,max: 2})
    }
}, 
    function (module) {
module.on("enable", function () {
    ChatP("Beta Version!")
    Vulcan2T = 0;
    Vulcan2Ready = false
    vulcan2done = false
    VerusTick = 0;
    verusa = 0;
    MinemoraTick = 0;
    MinemoraDone = false;
    VulcanTick = 0;
    Vulcan2Tick = 0;
    orgx = mc.thePlayer.posX
    orgy = mc.thePlayer.posY
    orgz = mc.thePlayer.posZ
    switch (module.settings.Mode.get()) {
        case "Minemora":
        if(!mc.thePlayer.onGround) {
            MinemoraDone = true
        }
        break;
        case "Vulcan":
        if(mc.thePlayer.onGround) {
            mc.timer.timerSpeed = 0.14;
            mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY - 2, mc.thePlayer.posZ);
            mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false));
        } else {
            VulcanTick = 1;
        }
        break;
        case "VulcanClip":
        if(mc.thePlayer.onGround) {
            mc.timer.timerSpeed = 0.5;
            mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY - 1.2, mc.thePlayer.posZ);
        } else {
            ChatP("Doesnt OnGround!")
            module.setState(false)
        }
        break;
    }
});   
module.on("packet", function (event) {
    var packet = event.getPacket();
    if(packet instanceof S08) {
        switch(module.settings.Mode.get()) {
            case "Vulcan":
            VulcanTick++
            ChatP("S08 : " + VulcanTick)
            if(VulcanTick>10){
                ChatP("False")
                module.setState(false)
            }
            break;
            case "VulcanClip":
            Vulcan2Ready = true
            break;
        }
    }
});
module.on("update", function () {
    module.tag=module.settings.Mode.get();
    switch (module.settings.Mode.get()) {
    case "Creative": 
    mc.thePlayer.capabilities.allowFlying = true;
    break;
    case "Vanilla":
    mc.thePlayer.motionX = 0;
    mc.thePlayer.motionZ = 0;
    mc.thePlayer.motionY = 0;
    hor(module.settings.VanillaSpeed.get())
    ver(module.settings.VanillaVerticalSpeed.get())
    break;
    case "Minemora":
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
        }
        if(MinemoraTick==1) {
            mc.timer.timerSpeed = 0.7
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
    }
    break;
    case "Vulcan":
        if(VulcanTick < 10 && VulcanTick > 0) {
            mc.timer.timerSpeed = 0.14
            mc.thePlayer.motionX = 0;
            mc.thePlayer.motionZ = 0;
            mc.thePlayer.motionY = 0;
            if (mc.gameSettings.keyBindForward.isKeyDown()) {
                clip(module.settings.VulcanSpeed.get() * 10,0)
            }
            if(mc.gameSettings.keyBindRight.isKeyDown()) {
                clip(module.settings.VulcanSpeed.get() * 10,0)
            };
            if (mc.gameSettings.keyBindBack.isKeyDown()) {
                clip(module.settings.VulcanSpeed.get() * 10,0)
            };
            if (mc.gameSettings.keyBindLeft.isKeyDown()) {
                clip(module.settings.VulcanSpeed.get() * 10,0)
            };
            ver(module.settings.VulcanSpeed.get())
        }
    break;
    case "VulcanClip":
    if(Vulcan2Ready) {
        clip(module.settings.Vulcan2Speed.get(),module.settings.Vulcan2HeightSpeed.get())
        Vulcan2T = 1;
        mc.timer.timerSpeed = 0.5;
        Vulcan2Ready = false;
    }
    if(Vulcan2T==1) {
        Vulcan2Tick++
        if(Vulcan2Tick>=10) {
            mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX , mc.thePlayer.posY , mc.thePlayer.posZ , false))
            Vulcan2Tick = 0;
        }
    }
    if(mc.thePlayer.posY > orgy) {
        vulcan2done = true
    }
    if(vulcan2done && mc.thePlayer.onGround) {
        vulcan2done = false
        Vulcantick = 0;
        Vulcan2T = 0;
        module.setState(false)
    }
    break;
    case "OldVulcan":
    mc.timer.timerSpeed = 0.14
    mc.thePlayer.motionX = 0;
    mc.thePlayer.motionZ = 0;
    mc.thePlayer.motionY = 0;
    if (mc.gameSettings.keyBindForward.isKeyDown()) {
        clip(module.settings.OVSpeed.get() * 10,0)
    }
    if(mc.gameSettings.keyBindRight.isKeyDown()) {
        clip(module.settings.OVSpeed.get() * 10,0)
    };
    if (mc.gameSettings.keyBindBack.isKeyDown()) {
        clip(module.settings.OVSpeed.get() * 10,0)
    };
    if (mc.gameSettings.keyBindLeft.isKeyDown()) {
        clip(module.settings.OVSpeed.get() * 10,0)
    };
    ver(module.settings.OVSpeed.get())
    break;
    }
});
module.on("disable", function () {
    if(module.settings.Mode.get() == "Creative") {
        mc.thePlayer.capabilities.allowFlying = false;
        mc.thePlayer.capabilities.isFlying = false;
    }
    mc.timer.timerSpeed = 1;
    if(module.settings.MotionReset.get()) {
        mc.thePlayer.motionX = 0;
        mc.thePlayer.motionZ = 0;
        mc.thePlayer.motionY = 0;
    }
});
});
