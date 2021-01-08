export default {

    data: function(){
        return {
            langData: "",
            defaultLang: "en",
            supportedLangs: ["en"]
        }
    }, 

    created(){
        let userLang = this.getLang()
        this.set(userLang)
    }, 
 
    methods: {
        
        $t(key,params = null){

            let langData = this.langData || {}

            if(!langData.hasOwnProperty(key)){
                console.log(langData)

                return key
            }

            let str =  this.langData[key]

            
            if(str == key){ return str}
            
           // console.log(langData)

            if(Array.isArray(params) && params.length > 0){
               
                str = str.replace(/\{[0-9]+\}/g, function(match) {
                    match = match.replace(/[\{\}]+/g,"")
                    return params[match] || match;
                });
            }

            return str
        },
        
        set(lang){
            
            //if in format en-US or en-GB
            if(lang.indexOf("-") !== -1){
                lang = lang.split("-")[0]
            }

            if(!this.supportedLangs.includes(lang)){
                lang = this.defaultLang
            }
                     
            this.langData = require("@/locales/"+lang+".json")
            
            //this.$emit("locale-change",{lang: lang})
        },

        getLang(){
            let browserLang = navigator.language || navigator.userLanguage
            let userLang = sessionStorage.getItem("lang") || browserLang || "en"
            return userLang
        }

   } //end methods 
        
}