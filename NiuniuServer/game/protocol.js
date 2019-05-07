/**
 * 消息基类对象，客户端请求消息BaseRequest， 回调消息BaseResponse都继承BaseProtocol
 */
class BaseProtocol{
    constructor () {
        /**
         * 请求动作类型
         */
        this.act = '';

        /**
         * 每个请求的sequence_id应该唯一
         */
        this.seq = 0;

        /**
         * 错误代码，0为正常
         */
        this.err = 0;

        /**
         * 错误信息
         */
        this.msg = "";

        /**
         * 是否需要等待服务器回调
         */
        this.is_async = false;
        
    }
};

/**
 * 请求消息基类，客户端的请求都继承这个类
 */
class BaseRequest extends BaseProtocol{
    constructor(){
        super();
    }
};

/**
 * 服务器返回的消息对应的对象，包含返回数据，一般和BaseRequest成对使用
 * @class BaseResponse
 * @extends BaseProtocol
 */
class BaseResponse extends BaseProtocol{
    constructor(){
        super();
    }
    /**
     * 读取返回数据，设置BaseResponse对象
     */
    loadData (data) {
        var key;
        for (key in data) {
            if(!this.hasOwnProperty(key)){
                continue;
            }

            if(data[key] !== undefined && data[key] !== null){
                this[key] = data[key];
            }
        }
    }
};

/**
 * 心跳返回包
 */
class HeartResponse extends BaseResponse{
    constructor(){
        super();
        this.t = 0;
    }
};

class LoginResponse extends BaseResponse{
    constructor(){
        super();
        this.uid = 0;
        this.bid = 0;
        this.coins = 0;
        this.nickname = "";
        this.avatar = "";
    }
}

class CreateRoomResponse extends BaseResponse{
    constructor(){
        super();
        this.rid = 0;
        this.user = null;
    }
}

class EnterRoomResponse extends CreateRoomResponse{
    constructor(){
        super();
        this.rid = 0;
        this.users = [];
    }
}

class PushEnterRoom extends BaseResponse{
    constructor(user){
        super();
        this.act = "pEnterRoom";
        this.user = user;
    }
}

class PushExitRoom extends BaseResponse{
    constructor(user){
        super();
        this.act = "pExitRoom";
        this.user = user;
    }
}

class PushDeal extends BaseResponse {
    constructor(cards){
        super();
        this.act = "pDeal";
        this.cards = cards;
    }
}

// 下注推送
class PushBet extends BaseResponse {
    constructor(){
        super();
        this.act = "pBet";
        this.bet = 0;
        this.uid = 0;
    }
}

class PushStartBet extends BaseResponse{
    constructor(exp){
        super();
        this.act = "pStartBet";
        this.expired = exp;
    }
}

class PushShowCards extends BaseResponse{
    constructor(){
        super();
        this.act = "pShowCards";
        this.users = [];
    }
}

module.exports = {
    HeartResponse: HeartResponse,
    LoginResponse: LoginResponse,
    CreateRoomResponse: CreateRoomResponse,
    EnterRoomResponse: EnterRoomResponse,
    PushExitRoom: PushExitRoom,
    PushEnterRoom: PushEnterRoom,
    PushDeal: PushDeal,
    PushStartBet: PushStartBet,
    PushBet: PushBet,
    PushShowCards: PushShowCards,
}