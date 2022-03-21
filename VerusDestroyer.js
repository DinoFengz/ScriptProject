var scriptName = "VerusHater";
var scriptAuthor = "DinoFeng";
var scriptVersion = "1.0";
var script = registerScript({
    name: "VerusHater",
    version: "1.0",
    authors: ["DinoFeng"]
});
var C03 = Java.type("net.minecraft.network.play.client.C03PacketPlayer");
var VerusFlyTick = 0;
script.registerModule({
    name: "VerusNofall",
    description: "Nice Nofall Bypassing Verus (Rare kick)",
    category: "Player",

}, function (module) {
module.on("enable", function () {
});
module.on("update", function () {
    if(mc.thePlayer.fallDistance > 3.2) {
        mc.thePlayer.fallDistance = 0;
        mc.thePlayer.motionY = mc.thePlayer.motionY - 0.1;
    }
});
module.on("packet", function (event) {
    var packet = event.getPacket();
    if(packet instanceof C03) {
        if(mc.thePlayer.fallDistance > 3.2) {
            packet.onGround = 1;
        }
    }
});
});
script.registerModule({
    name: "VerusFly",
    description: "",
    category: "Movement",

}, function (module) {
module.on("enable", function () {
    VerusFlyTick = 0;
});
module.on("update", function () {
    mc.thePlayer.speedInAir = 0.04;
    mc.thePlayer.motionY = 0;
    
    VerusFlyTick++
    if(mc.gameSettings.keyBindJump.pressed && VerusFlyTick > 15) {
        mc.thePlayer.motionY = 0.042
        VerusFlyTick = 0;
    }
});
module.on("packet", function (event) {
    var packet = event.getPacket();
    if(packet instanceof C03) {
        packet.onGround = 1;
    }
});
module.on("disable", function () {
    mc.thePlayer.speedInAir = 0.02;
    mc.thePlayer.motionX = 0;
    mc.thePlayer.motionY = 0;
    mc.thePlayer.motionZ = 0;
})
});
