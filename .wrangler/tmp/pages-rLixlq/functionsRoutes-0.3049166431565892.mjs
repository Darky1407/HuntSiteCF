import { onRequestPost as __check_final_js_onRequestPost } from "C:\\Users\\kinja\\Projects\\HuntSiteCF\\functions\\check-final.js"
import { onRequestPost as __check_progress_js_onRequestPost } from "C:\\Users\\kinja\\Projects\\HuntSiteCF\\functions\\check-progress.js"
import { onRequestPost as __check_stage1_js_onRequestPost } from "C:\\Users\\kinja\\Projects\\HuntSiteCF\\functions\\check-stage1.js"
import { onRequestPost as __check_stage2_js_onRequestPost } from "C:\\Users\\kinja\\Projects\\HuntSiteCF\\functions\\check-stage2.js"
import { onRequestPost as __check_stage3_js_onRequestPost } from "C:\\Users\\kinja\\Projects\\HuntSiteCF\\functions\\check-stage3.js"
import { onRequestPost as __check_stage4_js_onRequestPost } from "C:\\Users\\kinja\\Projects\\HuntSiteCF\\functions\\check-stage4.js"
import { onRequestPost as __check_username_js_onRequestPost } from "C:\\Users\\kinja\\Projects\\HuntSiteCF\\functions\\check-username.js"
import { onRequestPost as __mark_complete_js_onRequestPost } from "C:\\Users\\kinja\\Projects\\HuntSiteCF\\functions\\mark-complete.js"
import { onRequestPost as __notify_complete_js_onRequestPost } from "C:\\Users\\kinja\\Projects\\HuntSiteCF\\functions\\notify-complete.js"

export const routes = [
    {
      routePath: "/check-final",
      mountPath: "/",
      method: "POST",
      middlewares: [],
      modules: [__check_final_js_onRequestPost],
    },
  {
      routePath: "/check-progress",
      mountPath: "/",
      method: "POST",
      middlewares: [],
      modules: [__check_progress_js_onRequestPost],
    },
  {
      routePath: "/check-stage1",
      mountPath: "/",
      method: "POST",
      middlewares: [],
      modules: [__check_stage1_js_onRequestPost],
    },
  {
      routePath: "/check-stage2",
      mountPath: "/",
      method: "POST",
      middlewares: [],
      modules: [__check_stage2_js_onRequestPost],
    },
  {
      routePath: "/check-stage3",
      mountPath: "/",
      method: "POST",
      middlewares: [],
      modules: [__check_stage3_js_onRequestPost],
    },
  {
      routePath: "/check-stage4",
      mountPath: "/",
      method: "POST",
      middlewares: [],
      modules: [__check_stage4_js_onRequestPost],
    },
  {
      routePath: "/check-username",
      mountPath: "/",
      method: "POST",
      middlewares: [],
      modules: [__check_username_js_onRequestPost],
    },
  {
      routePath: "/mark-complete",
      mountPath: "/",
      method: "POST",
      middlewares: [],
      modules: [__mark_complete_js_onRequestPost],
    },
  {
      routePath: "/notify-complete",
      mountPath: "/",
      method: "POST",
      middlewares: [],
      modules: [__notify_complete_js_onRequestPost],
    },
  ]