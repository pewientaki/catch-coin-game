class Target extends Element {
    constructor(targetElement) {
        super('#' + targetElement.id, 2)
    }

    static getNewTargetElement() {
        const target = document.createElement('img');
        target.src = 'https://media1.giphy.com/media/mCgctS9DY1UwOgSazb/giphy.gif';
        target.id = 'target';
        target.setAttribute("crossorigin", "anonymous")
        return target;
    }

    static addNewTargetToGame(gameArea) {
        const target = Target.getNewTargetElement()
        gameArea.htmlElementRoot.appendChild(target);
        return new Target(target);
    }
}