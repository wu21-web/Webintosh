import { recoveryMenu } from "../JavaScript/finder.js";
import { getP } from "../JavaScript/element.js";

const menu_logo = getP("logo");

menu_logo.addEventListener('click', () => recoveryMenu(menu_logo));