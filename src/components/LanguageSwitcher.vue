<template>
  <div>
    <button
      :style="
        $i18n.locale === 'en'
          ? 'background:green; border-right:none; padding:2px; font-size:18px; color:white; width:100px; height:45px;'
          : 'background:light-gray; border-right:none; padding:2px; font-size:18px; width:100px; height:45px;'
      "
      @click="handleChangeLocale('en')"
    >
      English
    </button>
    <button
      :style="
        $i18n.locale === 'es'
          ? 'background:green; border-left:none; padding:2px; font-size:18px; color:white; width:100px; height:45px;'
          : 'background:light-gray; border-left:none; padding:2px; font-size:18px; width:100px; height:45px;'
      "
      @click="handleChangeLocale('es')"
    >
      Espanol
    </button>
  </div>
</template>
<script>
import { changeLocale } from "../utils/Translation";
export default {
  name: "LocalisationDemo",
  methods: {
    handleChangeLocale(newLocale) {
      if (this.$i18n.locale !== newLocale) {
        changeLocale(newLocale);
      }
      return;
    },
  },
};
</script>
