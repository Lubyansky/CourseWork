export default{
    data(){
        return{
            isHidden: true
        }
    },
    methods: {
        switchHidden(){
            if(this.isHidden) {
                this.isHidden = false
            }
            else{
                this.isHidden = true
            }
        }
    }
}