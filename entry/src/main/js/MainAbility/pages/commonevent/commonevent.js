import featureAbility from '@ohos.ability.featureAbility'
import router from '@ohos.router'

export default {
    data: {
        title: "",
    },
    onInit() {
        this.title = this.$t('strings.this is common event test page');
    },
    startCommonEvent: function () {
        let str = {
            "want": {
                "bundleName": "com.oh.demo.featureability",
                "abilityName": "com.example.entry.CommonEvent",
                "parameters": {
                    url: 'pages/index/index'
                }
            },
        };
        console.info("start common event index page")
        featureAbility.startAbility(str)
    },
    onclick: function () {
        router.replace({
            url: "pages/main/main"
        })
    }
}
