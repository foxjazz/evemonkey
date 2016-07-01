"use strict";
exports.ISystemShortDescriptor = {
    regionid: String,
    systemid: String,
    region: String,
    system: String
};
;
exports.ISystemDescriptor = {
    volume_str: String,
    buy: Boolean,
    issued: String,
    price: Number,
    volumeEntered: Number,
    minVolume: Number,
    volume: Number,
    range: String,
    href: String,
    duration_str: String,
    location: {
        id_str: String,
        href: String,
        id: Number,
        name: String,
    },
    duration: Number,
    minVolume_str: String,
    volumeEntered_str: String,
    type: {
        id_str: String,
        href: String,
        id: Number,
        name: String,
    },
    id: Number,
    id_str: String,
};
//# sourceMappingURL=IRegions.js.map