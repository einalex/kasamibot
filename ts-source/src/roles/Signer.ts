
import * as ScoutingManager from "../managers/Scouting";
import * as QuoteUtilities from "../utilities/Quote";

export function run(creep: Creep) {
    if (creep.memory.target === undefined) {
        creep.memory.target = ScoutingManager.getSigningTarget(creep.memory.homeroom);
        if (creep.memory.target === undefined) {
            creep.suicide();
            return;
        }
    }

    let targetRoom = Game.rooms[creep.memory.target];

    if (targetRoom instanceof Room && targetRoom.controller !== undefined) {
        let targetController = targetRoom.controller;
        if (creep.pos.roomName !== targetRoom.name || creep.pos.getRangeTo(targetController) > 1) {
            creep.travelTo(targetController);
        } else {
            let quote = QuoteUtilities.getRandomQuote(creep.room.controller !== undefined && creep.room.controller.my);
            creep.signController(targetController, quote);
            creep.memory.target = undefined;
        }
    } else {
        creep.memory.target = undefined;
    }
};
