<template lang="html">
  <div>
    <p>I'm a component. This is my msg: {{ msg }}</p>
  </div>
</template>

<script>


export default {
    data() {
        return {
            msg: "You know, the CW superhero shows aren't that bad."
        };
    }
}
</script>
