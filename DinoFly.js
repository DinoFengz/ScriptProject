/*
Hycraft Fly From LiquidBounce++
*/
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
var BattleasyaTick = 0;
var battleasyaX = 0;
var battleasyaY = 0;
var battleasyaZ = 0;
var orgx = 0;
var orgy = 0;
var orgz = 0;
var verustrue = 0;
var verusa = 0;
function ChatP(_Chat) {
    Chat.print("§8[§e§lDinoFly§8] §f§l" + _Chat)
}
Math.radian = function(deg) {
    return deg * Math.PI / 180;
}

function clip(dist, y) {
    var yaw = Math.radian(mc.thePlayer.rotationYaw);
    var x = -Math.sin(yaw) * dist;
    var z = Math.cos(yaw) * dist;
    mc.thePlayer.setPosition(mc.thePlayer.posX + x, mc.thePlayer.posY + y, mc.thePlayer.posZ + z);
    mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false));
}
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
function Forward(_s) {
    var dir = Math.radian(mc.thePlayer.rotationYaw);
    mc.thePlayer.motionX += -Math.sin(dir) * _s;
    mc.thePlayer.motionZ += Math.cos(dir) * _s;
}
function Right(_s) {
    var dir = Math.radian(mc.thePlayer.rotationYaw + 90);
    mc.thePlayer.motionX += -Math.sin(dir) * _s;
    mc.thePlayer.motionZ += Math.cos(dir) * _s;
}
function Back(_s) {
    var dir = Math.radian(mc.thePlayer.rotationYaw + 180);
    mc.thePlayer.motionX += -Math.sin(dir) * _s;
    mc.thePlayer.motionZ += Math.cos(dir) * _s;
}
function Left(_s) {
    var dir = Math.radian(mc.thePlayer.rotationYaw + 270);
    mc.thePlayer.motionX += -Math.sin(dir) * _s;
    mc.thePlayer.motionZ += Math.cos(dir) * _s;
}
var HyTrue = false;
var hytick = 0;
script.registerModule({
    name: "DinoFly",
    description: "A Modules make u can fly in survival mode!",
    category: "Movement",
    tag: "NULL",
    settings: {
        Mode:Setting.list({
            name: "Mode",
            default: "Vanilla",
            values: ["Creative","Vanilla","VerusNew","NeruxVace","Minemora","Battleasya","Hycraft"]
        }),
        MotionReset:Setting.boolean({
            name: "MotionReset",
            default: true
        }),
        VanillaSpeed:Setting.float({
            name: "Vanilla-Speed",
            default: 1,
            min: 1,
            max: 10
        }),
        VanillaVerticalSpeed:Setting.float({
            name: "Vanilla-VerticalSpeed",
            default: 1,
            min: 1,
            max: 10
        }),
        VanillaBypass:Setting.boolean({
            name: "Vanilla-Bypass",
            default: true
        }),
        VanillaBypassMotion:Setting.float({
            name: "Vanilla-BypassMotion",
            default: 0.3,
            min: 0.1,
            max: 1
        }),
        VerusSpeed:Setting.float({
            name: "VerusNew-Speed",
            default: 1,
            min: 1,
            max: 10
        }),
        VerusTimerFix:Setting.boolean({
            name: "VerusNew-TimerToFix",
            default: true
        }),
        MinemoraTick:Setting.float({
            name: "Minemora-Tick",
            default: 5,
            min: 1, 
            max: 7
        }),
        MinemoraMotionDown:Setting.float({
            name: "Minemora-MotionDown",
            default: 0.085,
            min: 0,
            max: 1
        }),
        MinemoraMotionUp:Setting.float({
            name: "Minemora-MotionUp",
            default: 0.031,
            min: 0,
            max: 1
        }),
        BattleasyaSpeed:Setting.float({
            name: "Battleasya-Speed",
            default: 1,
            min: 1,
            max: 10
        }),
        HySpeed:Setting.float({
            name: "Hycraft-Speed",
            default: 1,
            min: 1,
            max: 5
        })
    }
}, 
    function (module) {
module.on("enable", function () {
    ChatP("Beta Version!")
    HyTrue = false
    hytick = 0;
    VerusTick = 0;
    verusa = 0;
    MinemoraTick = 0;
    VanillaBypassTick = 0;
    VanillaBypassTick2 = 0;
    BattleasyaTick = 0
    battleasyaX = mc.thePlayer.posX
    battleasyaY = mc.thePlayer.posY
    battleasyaZ = mc.thePlayer.posZ
    orgx = mc.thePlayer.posX
    orgy = mc.thePlayer.posY
    orgz = mc.thePlayer.posZ

    if(mc.thePlayer.onGround && module.settings.Mode.get() == "Hycraft") {
        mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, orgy + 4.5, mc.thePlayer.posZ, false));
        mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, orgy, mc.thePlayer.posZ, false));
        mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, orgy, mc.thePlayer.posZ, true));
        mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY + 0.42, mc.thePlayer.posZ);
        HyTrue = true
    }
    if(module.settings.Mode.get() == "VerusNew") {
        verustrue = 1;
    }
    if(module.settings.Mode.get() == "Battleasya") {
        mc.timer.timerSpeed = 0.14;
        mc.thePlayer.setPosition(mc.thePlayer.posX, mc.thePlayer.posY - 2, mc.thePlayer.posZ);
        mc.thePlayer.sendQueue.addToSendQueue(new C04(mc.thePlayer.posX, mc.thePlayer.posY, mc.thePlayer.posZ, false));
    }
});   
module.on("packet", function (event) {
    var packet = event.getPacket();
    if(packet instanceof S08) {
        if(module.settings.Mode.get() == "Battleasya") {
            BattleasyaTick++
            Chat.print("S08 : " + BattleasyaTick)
            if(BattleasyaTick > 2) {
                Chat.print("False")
                module.setState(false)
            }
        }
    }
    if(module.settings.Mode.get() == "VerusNew") {
        if(packet instanceof C0F) {
            event.cancelEvent()
        }
        if(VerusTick >= 8 && mc.thePlayer) {
            event.cancelEvent()
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
            if(module.settings.VanillaBypass.get()) {
                VanillaBypassTick++
                if(VanillaBypassTick >= 0 && VanillaBypassTick < 3) {
                    mc.thePlayer.motionY = -module.settings.VanillaBypassMotion.get()
                }
                if(VanillaBypassTick >= 3 && VanillaBypassTick < 6) {
                    mc.thePlayer.motionY = module.settings.VanillaBypassMotion.get() / 2
                }
                if(VanillaBypassTick >= 6) {
                    VanillaBypassTick = 0;
                }
            } else {
                mc.thePlayer.motionY = 0;
            }
            if (mc.gameSettings.keyBindForward.isKeyDown()) {
                Forward(module.settings.VanillaSpeed.get())
            }
            if(mc.gameSettings.keyBindRight.isKeyDown()) {
                Right(module.settings.VanillaSpeed.get())
            };
            if (mc.gameSettings.keyBindBack.isKeyDown()) {
                Back(module.settings.VanillaSpeed.get())
            };
            if (mc.gameSettings.keyBindLeft.isKeyDown()) {
                Left(module.settings.VanillaSpeed.get())
            };
            if (mc.gameSettings.keyBindJump.isKeyDown()) {
                mc.thePlayer.motionY += module.settings.VanillaVerticalSpeed.get() / 2
            };
            if (mc.gameSettings.keyBindSneak.isKeyDown()) {
                mc.thePlayer.motionY -= module.settings.VanillaVerticalSpeed.get() / 2
            }
            break;
        case "VerusNew":
            if(verustrue == 1) {
                verusa++
                mc.thePlayer.setPosition(orgx , orgy , orgz)
            }
            if(verusa >= 10) {
                verustrue = 0;
                verusa = 0;
            }
            VerusTick++
            if(module.settings.VerusTimerFix.get()) {
                if(VerusTick < 6) {
                    mc.timer.timerSpeed = 0.3
                }
                if(VerusTick > 5) {
                    mc.timer.timerSpeed = 0.7
                }
                if(VerusTick >= 10) {
                    VerusTick = 0;
                    mc.timer.timerSpeed = 1
                }
            } else if(VerusTick >= 10) {
                VerusTick = 0;
            }
            mc.thePlayer.motionX = 0;
            mc.thePlayer.motionZ = 0;
            mc.thePlayer.motionY = 0;
            if(verustrue == 0) {
            if (mc.gameSettings.keyBindForward.isKeyDown()) {
                Forward(module.settings.VerusSpeed.get())
            }
            if(mc.gameSettings.keyBindRight.isKeyDown()) {
                Right(module.settings.VerusSpeed.get())
            };
            if (mc.gameSettings.keyBindBack.isKeyDown()) {
                Back(module.settings.VerusSpeed.get())
            };
            if (mc.gameSettings.keyBindLeft.isKeyDown()) {
                Left(module.settings.VerusSpeed.get())
            };
            if (mc.gameSettings.keyBindJump.isKeyDown()) {
                mc.thePlayer.motionY += module.settings.VerusSpeed.get();
            };
            if (mc.gameSettings.keyBindSneak.isKeyDown()) {
                mc.thePlayer.motionY -= module.settings.VerusSpeed.get();
            }                
            }
            break;
        case "Minemora":
            if(mc.thePlayer.onGround) {
                mc.timer.timerSpeed = 1;
            }
            if(!mc.thePlayer.onGround) {
                mc.timer.timerSpeed = 0.7;
                mc.thePlayer.motionY = -module.settings.MinemoraMotionDown.get();
            }
            MinemoraTick++
            if(MinemoraTick==module.settings.MinemoraTick.get() && !mc.thePlayer.onGround) {
                mc.thePlayer.motionY = module.settings.MinemoraMotionUp.get();
                MinemoraTick = 0;
            }
            break;
        case "Battleasya":
            if(BattleasyaTick < 3 && BattleasyaTick >= 1) {
                mc.timer.timerSpeed = 0.14
                mc.thePlayer.motionX = 0;
                mc.thePlayer.motionZ = 0;
                mc.thePlayer.motionY = 0;
                if (mc.gameSettings.keyBindForward.isKeyDown()) {
                    clip(module.settings.BattleasyaSpeed.get() * 10,0)
                }
                if(mc.gameSettings.keyBindRight.isKeyDown()) {
                    clip(module.settings.BattleasyaSpeed.get() * 10,0)
                };
                if (mc.gameSettings.keyBindBack.isKeyDown()) {
                    clip(module.settings.BattleasyaSpeed.get() * 10,0)
                };
                if (mc.gameSettings.keyBindLeft.isKeyDown()) {
                    clip(module.settings.BattleasyaSpeed.get() * 10,0)
                };
                if (mc.gameSettings.keyBindJump.isKeyDown()) {
                    mc.thePlayer.motionY += module.settings.BattleasyaSpeed.get();
                };
                if (mc.gameSettings.keyBindSneak.isKeyDown()) {
                    mc.thePlayer.motionY -= module.settings.BattleasyaSpeed.get();
                }
            }
            break;
        case "Hycraft":
            if(HyTrue) {
                hytick++;
                if(hytick == 0) {
                    mc.timer.timerSpeed = 0.85;
                } else if(hytick == 1) {
                    mc.timer.timerSpeed = 1;
                } else if(hytick == 2) {
                    mc.timer.timerSpeed = 0.85;
                } else if(hytick == 3) {
                    mc.timer.timerSpeed = 1;
                } else if(hytick >= 4) {
                    mc.timer.timerSpeed = 0.85;
                    hytick = 0;
                }
                if (mc.gameSettings.keyBindForward.isKeyDown()) {
                    Forward(module.settings.HySpeed.get())
                }
                if(mc.gameSettings.keyBindRight.isKeyDown()) {
                    Right(module.settings.HySpeed.get())
                };
                if (mc.gameSettings.keyBindBack.isKeyDown()) {
                    Back(module.settings.HySpeed.get())
                };
                if (mc.gameSettings.keyBindLeft.isKeyDown()) {
                    Left(module.settings.HySpeed.get())
                };
                if (mc.gameSettings.keyBindJump.isKeyDown()) {
                    mc.thePlayer.motionY += module.settings.HySpeed.get() / 2
                };
                if (mc.gameSettings.keyBindSneak.isKeyDown()) {
                    mc.thePlayer.motionY -= module.settings.HySpeed.get() / 2
                }
                mc.thePlayer.motionY = 0;
            }        
    }
});
module.on("disable", function () {
    if(module.settings.Mode.get() == "Creative") {
        mc.thePlayer.capabilities.allowFlying = false;
        mc.thePlayer.capabilities.isFlying = false;
    }
    mc.timer.timerSpeed = 1;
    if(mc.thePlayer.MotionReset.get()) {
        mc.thePlayer.motionX = 0;
        mc.thePlayer.motionZ = 0;
        mc.thePlayer.motionY = 0;
    }
    battleasyaX = 0;
    battleasyaY = 0;
    battleasyaZ = 0;
});
});
