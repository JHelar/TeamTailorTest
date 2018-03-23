<template>
  <section class="hiq-loader" ref="loader">
      <transition name="bar-fade">
        <span class="bar" :style="loader" v-if="running"></span>
      </transition>
  </section>
</template>
<script>
export default {
    name: 'Loader',
    props: ['active'],
    data(){
        return {
            baseIncrement: 0,
            value: 0,
            maxValue: 0,
            runId: -1,
            running: false
        }
    },
    created(){
        if(this.active) this.$nextTick(this.run);
    },
    watch: {
        active(newValue, oldValue){
            if(newValue){
                if(oldValue) this.stop();
                this.run();
            }else{
                this.stop();
            }
        }
    },
    methods: {
        run(){
            this.value = 1;
            this.running = true;
            this.maxValue = this.$refs.loader.clientWidth;
            this.baseIncrement = this.maxValue * 0.07;
            console.log(this.maxValue)
            this.runId = setInterval(() => {
                this.value += this.baseIncrement - (this.baseIncrement * (this.value / this.maxValue));
            }, 250)
        },
        stop(){
            this.value = this.maxValue;
            setTimeout(() => this.running = false, 250) // set running to false after animating to 100%
            clearInterval(this.runId);
        }
    },
    computed: {
        loader(){
            return {
                'width': `${this.value}px`
            }
        }
    }
}
</script>

<style lang="scss">
@import '../assets/styles/variables';

.hiq-loader {
    display: block;

    width: 100%;
    height: 8px;
    background: $gray-dark;

    position: absolute;
    top: 0;
    left: 0;

    > .bar {
        display: block;
        position: relative;
        left: 0;
        height: 100%;
        background-color: $red-dark;

        transition: width .2s linear;

        &.bar-fade-enter-active, 
        &.bar-fade-leave-active {
            transition: opacity .5s;
        }
        &.bar-fade-enter, 
        &.bar-fade-leave-to {
            opacity: 0;
        }
    }
}
</style>


