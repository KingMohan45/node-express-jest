import {UserModel} from './user.js';

export const loadModels = function (seq) {
    UserModel.load(seq);
}
