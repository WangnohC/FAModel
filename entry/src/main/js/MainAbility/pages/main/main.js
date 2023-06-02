import router from '@ohos.router'

export default {
    data: {
        title: ""
    },
    onInit() {
        this.title = this.$t('strings.this is main page');
    },
    enterPageAbilityTestPage: function () {
        router.replace({
            url: "pages/page/page"
        })
    },
    enterServiceAbilityTestPage: function () {
        router.replace({
            url: "pages/service/service"
        })
    },
    enterCommonEventTestPage: function () {
        router.replace({
            url: "pages/commonevent/commonevent"
        })
    }
}



