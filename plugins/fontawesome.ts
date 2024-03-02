import { config, library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faBold,
  faBorderNone,
  faItalic,
  faLink,
  faListDots,
  faListNumeric,
  faPencil,
  faPlus,
  faStrikethrough,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faBold,
  faItalic,
  faStrikethrough,
  faUnderline,
  faListNumeric,
  faListDots,
  faLink,
  faBorderNone,
  faPencil,
  faPlus,
);

config.autoAddCss = false;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon);
});
