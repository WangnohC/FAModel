import featureAbility from '@ohos.ability.featureAbility'
import prompt from '@ohos.prompt';
import hello from 'libhello.so'

export default {
    data: {
        title: ""
    },
    onInit() {
        this.title = this.$t('strings.this is page ability page');
    },
    napiTest: function() {
        prompt.showToast({
            message: hello.hello(),
            duration: 2000,
            bottom: 100
        });
        console.info("napi test result " + hello.hello());
    },
    onclick: function () {
        let str = {
            "want": {
                "bundleName": "com.oh.demo.featureability",
                "abilityName": "com.example.entry.MainAbility",
                "parameters": {
                    url: 'pages/main/main'
                }
            }
        };
        console.info("back to main ability");
        featureAbility.startAbility(str);
    }
}
