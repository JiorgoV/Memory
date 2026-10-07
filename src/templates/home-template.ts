/** Returns the HTML for the home screen. */
export function getHomeTemplate(): string {
    return `
    <section class="home">
        <div class="home__content">
            <p class="home__subtitle">It's play time.</p>
            <h1 class="home__title">Ready to play?</h1>
            <button id="home-button" class="home__button" type="button">
                <img class="home__button-icon" src="/icons/stadia-controller-dark.svg" alt="">
                <span class="home__button-text">Play</span>
                <img class="home__button-arrow" src="/icons/arrow-1.svg" alt="">
            </button>
        </div>

        <img class="home__controller" src="/icons/stadia-controller.svg" alt="">
    </section>
    `;
}