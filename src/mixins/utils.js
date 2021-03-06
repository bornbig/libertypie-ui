import Status from "../classes/Status";

export default {
    created(){ 
        $(".alert").alert();
    },
    methods: {
        
        errorStatus(msg,data){ return Status.error(msg,data) },
        errorPromise(msg,data){ return Status.errorPromise(msg,data) },
        errorData(data = null){ return Status.errorData(data) },
        successStatus(msg,data = null){ return Status.success(msg,data) },
        successPromise(msg,data = null){ return Status.successPromise(msg,data) },
        successData(data = null){ Status.successData(data) },

        logError(msg,error){
            console.log(msg, error, error.stack || "")
        },
        
        notif(type,msg, timeout=3000){

            type = (type == "error") ? "danger" : type;
            
            let markup = `
                <div class="alert alert-${type} shadow-lg alert-notif alert-dismissible fade show" role="alert">
                    <div class="content">
                        ${msg}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="notif-progress"></div>
                </div>
            `

            let alertDom = $(markup)

            $("body").append(alertDom)

            if(timeout <= 0) return;

            let tProgress = alertDom.find(".notif-progress")
            
            let intval = 10;
            let elapsed = 0;

            let t = window.setInterval(()=>{
                
                elapsed += intval;
                
                if(elapsed >= timeout) {
                    clearInterval(t)
                    alertDom.alert("close");
                    return;
                }

                let elapsedPercent = (elapsed / timeout) * 100;
                
                tProgress.css("width",elapsedPercent+"%");
            },intval);
      
        },

        _dispatchEvent(name,data){
            window.dispatchEvent(new CustomEvent(name, {detail: data}));
        },

        _on(eventName,callback){
            window.addEventListener(eventName,callback)
        },

        errorNotif(msg){ this.notif("error",msg) },

        infoNotif(msg){ this.notif("info",msg) },

        successNotif(msg){ this.notif("success",msg) },

        alertNotif(msg){ this.notif("alert",msg)  },

        statusNotif(statusInfo){ this.notif(statusInfo.getType(),statusInfo.getMessage())  },

        /**
         * slugify
         */
        slugify(text){
            return text.trim()
                        .toLowerCase()
                        .replace(/\s+/g, '-')           
                        .replace(/[^\w\-]+/g, '')
                        .replace(/\-\-+/g, '-') 
        }
    },  

}