<template>
  <div class="main_wrapper">
    <div class="heading_wrapper">
      <h1 style="color: green">{{ $t("heading") }}</h1>
      <LanguageSwitcher />
    </div>
    <div>
      <h2>{{ $t("subHeading") }}</h2>
      <h3 class="localised_text">{{ $t("demoText") }}</h3>
    </div>
  </div>
</template>

<script>
import LanguageSwitcher from "./components/LanguageSwitcher.vue";
import { getDefaultLocaleAndLoadMessages } from "./utils/Translation";

export default {
  name: "App",
  components: {
    LanguageSwitcher,
  },
  created() {
    getDefaultLocaleAndLoadMessages();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
}
.main_wrapper {
  width: 800px;
  height: 600px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0.3rem 0.3rem 0.6rem #a1a1a1, -0.2rem -0.2rem 0.5rem #e8e8e8;
}
.heading_wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.localised_text {
  line-height: 40px;
  max-width: 700px;
  color: #2c3e50;
}
</style>
