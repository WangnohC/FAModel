import featureAbility from '@ohos.ability.featureAbility'
import prompt from '@ohos.prompt'
import router from '@ohos.router'
import rpc from '@ohos.rpc'

function onConnectCallback(element, remote){
    prompt.showToast({
        message: "connect service ability successfully",
        duration: 2000,
        bottom: 100
    });
    console.log("onConnect remote is proxy: " + (remote instanceof rpc.RemoteProxy));
}
function onDisconnectCallback(element){
    prompt.showToast({
        message: "disconnect service ability successfully",
        duration: 2000,
        bottom: 100
    });
    console.log("onDisconnect element.deviceId : " + element.deviceId)
}
function onFailedCallback(code){
    prompt.showToast({
        message: "connect service ability failed",
        duration: 2000,
        bottom: 100
    });
    console.log("onFailed errCode : " + code)
}

export default {
    data: {
        title: "",
        connId: 0
    },
    onInit() {
        this.title = this.$t('strings.this is service ability test page');
    },
    startServiceAbility: function () {
        let target = {
            "want": {
                "bundleName": "com.oh.demo.featureability",
                "abilityName": "com.example.entry.ServiceAbility"
            }
        }
        console.info("start service ability")
        featureAbility.startAbility(target)
    },
    connectServiceAbility: function () {
        console.info("connect service ability")
        this.connId = featureAbility.connectAbility(
            {
                bundleName: "com.oh.demo.featureability",
                abilityName: "com.example.entry.ServiceAbility",
            },
            {
                onConnect: onConnectCallback,
                onDisconnect: onDisconnectCallback,
                onFailed: onFailedCallback,
            },
        )
    },
    disconnectServiceAbility: function () {
        console.info("disconnect service ability")
        featureAbility.disconnectAbility(this.connId)
    },
    onclick: function () {
        router.replace({
            url: "pages/main/main"
        })
    }
}
