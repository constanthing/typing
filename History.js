class History {
    constructor() {

    }

    add(save) {
        let saves = JSON.parse(localStorage.getItem("saves"));
        saves.push(save)
        localStorage.setItem("saves", JSON.stringify(saves))
    }

    clear() {
        localStorage.clear()
    }
}