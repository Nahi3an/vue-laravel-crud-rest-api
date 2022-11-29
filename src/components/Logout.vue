<template>
   
</template>
    
    
<script>
export default{

    data(){
        
        return{

        }
    },
    created(){

        this.$store.dispatch('logout')
            .then(()=>{
               
                this.$router.push({name:'Home'});
        });
        
    },

    mounted(){

        console.log('Logou Componenet Mounted');
    }
}
</script>