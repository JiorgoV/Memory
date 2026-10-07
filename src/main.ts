import "./styles/style.scss";
import { getHomeTemplate } from "./templates/home-template";

const APP = document.getElementById("app") as HTMLElement;

/** Renders the home screen into the app container. */
function renderHome(): void {
    APP.innerHTML = getHomeTemplate();
}

renderHome();