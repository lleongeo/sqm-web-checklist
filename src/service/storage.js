import { STORAGE_URL } from "./constants"

const CreateUrlImg = imgName => {
    return `${STORAGE_URL}${imgName}`;
}

export {
    CreateUrlImg
}