/**
 * Created by zjx on 2017/6/16.
 */

var vue=new Vue({
   el:'#fun' ,
    data:{
        projectList:[]
    },
    mounted:function(){
        var that=this;
        this.$nextTick(function(){
            that.getList();
        })
    },
    methods:{
        getList:function(){
            var that=this;
            this.$http.get('data/address.json').then(function(res){
                that.projectList=res.data.result;
                //console.log(res.data.result);
            })
        }
    }
});




