import featureAbility from '@ohos.ability.featureAbility'
import commonEvent from '@ohos.commonEvent'
import prompt from '@ohos.prompt';

const EVENT = "common event";
//要订阅的公共事件相关信息
const COMMON_EVENT_SUBSCRIBE_INFO = {
    events: [EVENT]
};
//要发布的公共事件相关信息
const COMMON_EVENT_PUBLISH_DATA = {
    code: 1,
    data: "information_data",
    isOrdered: false
};

//用于保存创建成功的订阅者对象，后续使用其完成订阅及退订的动作
var commonEventSubscriber;

//订阅公共事件回调
function subscribeCallback(err, data) {
    console.info("subscribe callback data = " + JSON.stringify(data));
}

//创建订阅者回调
function createSubscriberCallback(err, data) {
    commonEventSubscriber = data;
    //订阅公共事件
    commonEvent.subscribe(commonEventSubscriber, subscribeCallback);
    prompt.showToast({
        message: "create subscriber successfully",
        duration: 2000,
        bottom: 100
    });
}

//发布公共事件回调
function publishCallback(err) {
    prompt.showToast({
        message: "publish successfully",
        duration: 2000,
        bottom: 100
    });
}

export default {
    data: {
        title: "",
    },
    onInit() {
        this.title = this.$t('strings.this is common event page');
    },
    // 创建订阅者
    createSubscriber: function() {
        commonEvent.createSubscriber(COMMON_EVENT_SUBSCRIBE_INFO, createSubscriberCallback);
        console.info("create subscriber end");
    },
    // 发布公共事件
    publish: function() {
        commonEvent.publish(EVENT, COMMON_EVENT_PUBLISH_DATA, publishCallback);
        console.info("publish end");
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
