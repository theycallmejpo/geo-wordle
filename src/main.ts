import "./style.css";
import {Elm} from "./Main.elm";

const node = document.querySelector<HTMLDivElement>("#app")!;
const app = Elm.Main.init({node});

app.ports.showDialog.subscribe((id: string) => {
  // const dialog =
});
