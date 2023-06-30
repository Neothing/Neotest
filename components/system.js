/*const Collection = require("./Collection")

const RTubeData = require("../database/models/rtube.model")

let databaseCache = {}
databaseCache.rtube = new Collection();

exports.FOCRTubeData = async ({ id: VidID }, isLean) => {
  try {
    if (databaseCache.rtube.get(VidID)) {
      return isLean
        ? databaseCache.rtube.get(VidID).toJSON()
        : databaseCache.rtube.get(VidID);
    } else {
      let VidData = isLean
        ? await RTubeData.findOne({ id: VidID }).lean()
        : await RTubeData.findOne({ id: VidID });
      if (VidData) {
        if (!isLean) databaseCache.rtube.set(VidID, VidData);
        return VidData;
      } else {
        VidData = new RTubeData({
          id: VidID,
          name: Neo.getName(VidID),
        });
        await VidData.save();
        databaseCache.rtube.set(VidID, VidData);
        return isLean ? v.toJSON() : VidData;
      }
    }
  } catch (err) {
    console.log(err, "error");
  }
};
*/
const RTData = require("../database/models/rtube.model");

exports.task = async () => {
  RTData.find()
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
};
