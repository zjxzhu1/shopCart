/**
 * Created by matrix on 2017/6/14.
 */
var vue=new Vue({
    el:'#app',
    data:{
        productList:[],
        cardShow:false,
        checkFlag:false,
        delItem:null,
        totalMoney:0
    },
    mounted:function(){
        var that=this;
        this.$nextTick(function(){
            that.getCarData();
        })
    },
    filters:{
        filterMoney(value){
            return '¥ '+value.toFixed(2)+' 元';
        }
    },
    methods:{
        getCarData:function(){
            var that=this;
            this.$http.get('data/cartData.json').then(function(res){
                that.productList=res.data.result.list;
            })
        },
        del:function(item){
            this.cardShow=true;
            this.delItem=item;
        },
        delTrue:function(item){
            var item=this.delItem;
            var index=this.productList.indexOf(item);
            this.productList.splice(index,1);
            this.cardShow=false;
        },
        miss:function(){
            this.cardShow=false;
        },
        changeNum:function(item,num){
            if(num>=1){
                item.productQuantity++;
            }else{
                item.productQuantity--;
                if(item.productQuantity<=1){
                    item.productQuantity=1;
                }

            }
        },
        checkChoose:function(item){
            if(typeof item.checked== 'undefined'){
                vue.$set(item,'checked',true);
            }else{
                item.checked=!item.checked;
            }
            this.publicMoney();
        },
        checkAll:function(flag){
            var that=this;
            this.checkFlag=flag;
            that.productList.forEach(function(item , index){
                if(typeof item.checked== 'undefined'){
                    vue.$set(item,'checked',flag);
                }else{
                    item.checked= flag;
                }
            });
            this.publicMoney();
        },
        publicMoney:function () {
            var that=this;
            that.totalMoney=0;
            that.productList.forEach(function(item , index){
                if(item.checked){
                    that.totalMoney += item.productPrice * item.productQuantity;
                }

            })
        }
    }
});