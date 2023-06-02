import featureAbility from '@ohos.ability.featureAbility'
import router from '@ohos.router'

export default {
    data: {
        title: "",
    },
    onInit() {
        this.title = this.$t('strings.this is page ability test page');
    },
    startPageAbility: function () {
        let str = {
            "want": {
                "bundleName": "com.oh.demo.featureability",
                "abilityName": "com.example.entry.PageAbility",
                "parameters": {
                    url: 'pages/index/index'
                }
            }
        };
        console.info("start page ability index page");
        featureAbility.startAbility(str);
    },
    onclick: function () {
        router.replace({
            url: "pages/main/main"
        });
    }
}
