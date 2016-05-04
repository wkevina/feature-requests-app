<template>
  <div class="momentary">
    <div :transition="tran">
      <slot v-if="showing"></slot>
    </div>
  </div>
</template>

<script>
export default {
    props: ['timeout', 'tran'],
    data() {
        return {
            showing: false
        };
    },
    methods: {
        show() {
            if (!this.showing) {
                this.showing = true;
                if (this.timeout) {
                    setTimeout(this.dismiss.bind(this), this.timeout);
                }
            }
        },
        dismiss() {
            this.showing = false;
        }
    }
}
</script>
