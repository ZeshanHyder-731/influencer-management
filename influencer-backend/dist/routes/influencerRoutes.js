"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const influencerController_1 = require("../controllers/influencerController");
const router = express_1.default.Router();
router.post('/', influencerController_1.createInfluencer);
router.get('/', influencerController_1.getInfluencers);
exports.default = router;
