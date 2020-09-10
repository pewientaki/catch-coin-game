class Avatar extends Element {
    constructor(avatarElement) {
        super('#' + avatarElement.id, 2)
    }

    static getNewAvatarElement() {
        const avatar = document.createElement('img');
        avatar.src = 'https://i.pinimg.com/originals/9f/b1/25/9fb125f1fedc8cc62ab5b20699ebd87d.gif';
        avatar.id = 'player';
        return avatar;
    }

    static addNewAvatarToGame(gameArea) {
        const avatar = Avatar.getNewAvatarElement()
        gameArea.htmlElementRoot.appendChild(avatar);
        return new Avatar(avatar);
    }
}