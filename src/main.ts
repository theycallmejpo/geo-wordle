import "./style.css";
import {Elm} from "./Main.elm";

const node = document.querySelector<HTMLDivElement>("#app")!;
Elm.Main.init({node});
