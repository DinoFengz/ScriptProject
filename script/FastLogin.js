var scriptName = "FastLogin";
var scriptAuthor = "DinoFeng";
var scriptVersion = "1.0";
var scriptGithub = "https://github.com/DinoFengz/LiquidBounce";
var script = registerScript({
    name: "FastLogin",
    version: "1.0",
    authors: ["DinoFeng"]
});
var S02PacketChat = Java.type("net.minecraft.network.play.server.S02PacketChat");
var A = 0;
var B = 0;
script.registerModule({
    name: "FastLogin",
    description: "The Fastest Login Script For LiquidBounce / FDPClient",
    category: "Misc",
    tag: "NULL",
    settings: {
        RW:Setting.text({
            name: "RegisterWords",
            default: "register"
        }),
        LW:Setting.text({
            name: "LoginWords",
            default: "login"
        }),
        RC:Setting.text({
            name: "RegisterCmds",
            default: "/register"
        }),
        LC:Setting.text({
            name: "LoginCmds",
            default: "/login"
        }),
        Pass:Setting.text({
            name: "Password",
            default: "111111"
        }),
        ToggleMessage:Setting.boolean({
            name: "ToggleMessage",
            default: true
        })
    }

}, function (module) {
    module.on("enable", function () {
    if(module.settings.ToggleMessage.get() == true) {
        chat.print("§0§m==================================================");
        chat.print("§8ScriptName §7: §e§l" + scriptName);
        chat.print("§8ScriptVersion §7: §e§l" + scriptVersion);
        chat.print("§8ScriptDescription §7: §e§l" + module.description);
        chat.print("§8ScriptCategory §7: §e§l" + module.category);
        chat.print("§8ScriptGithub §7: §e§l" + scriptGithub);
        chat.print("§0§m==================================================");
    };

    A = 1;
    B = 1;
    });
    module.on("disable", function () {
    });
    module.on("packet", function (event) {
    var packet = event.getPacket();
    if (packet instanceof S02PacketChat) {
    if(packet.getChatComponent().getUnformattedText().contains(module.settings.RW.get()) && A==1) {
    mc.thePlayer.sendChatMessage(module.settings.RC.get() + " " + module.settings.Pass.get() + " " + module.settings.Pass.get());
    A = 0;
    }
    if(packet.getChatComponent().getUnformattedText().contains(module.settings.LW.get()) && B==1) {
    mc.thePlayer.sendChatMessage(module.settings.LC.get() + " " + module.settings.Pass.get());
    B = 0;
    }
    }
    });
    module.on("update", function () { 
        module.tag=module.settings.Pass.get();   
    });
});