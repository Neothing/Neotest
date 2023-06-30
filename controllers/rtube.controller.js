const ytdl = require("ytdl-core");
const fs = require("fs");
const utils = require("../components/utils");
const RTData = require("../database/models/rtube.model");

exports.index = async (req, res) => {
  RTData.find()
    .then((result) => {
      result.map((data, index) => {
        console.log(data);
      });
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error on geting data",
      });
    });
};

exports.process = async (req, res) => {
  const url = req.body.url;
  console.log(url);
  if (ytdl.validateURL(url)) {
    let vidID = ytdl.getURLVideoID(url);
    let data = await ytdl.getInfo(vidID);
    let vidData = await RTData.findOne({ id: vidID });

    let name = "RTube - " + data.videoDetails.title;

    let status = {
      mp4: false,
      mp3: false,
    };

    if (vidData) {
      res.status(200).send(vidData);
    } else {
      try {
        ytdl(url, {
          filter: "audioandvideo",
          format: "mp4",
          quality: "highest",
        })
          .pipe(fs.createWriteStream(`./public/media/mp4/neotube-${vidID}.mp4`))
          .on("finish", () => {
            status.mp4 = true;
            console.log(status);
            savedata(status, vidID, url, name, data, req, res);
          });
        ytdl(url, {
          filter: "audioonly",
          format: "mp3",
          quality: "highest",
        })
          .pipe(fs.createWriteStream(`./public/media/mp3/neotube-${vidID}.mp3`))
          .on("finish", async () => {
            status.mp3 = true;
            console.log(status);
            savedata(status, vidID, url, name, data, req, res);
          });
      } catch (err) {
        res.status(409).send({
          message: err.message || "process error",
        });
      }
    }
  } else {
    res.status(409).send({
      message: "url not valid",
    });
  }
};

async function savedata(status, vidID, url, name, data, req, res) {
  if (status.mp4 && status.mp3) {
    console.log(status.mp3);
    console.log(status.mp4);
    let comMin = Math.floor(data.videoDetails.lengthSeconds / 60);
    let comSec = data.videoDetails.lengthSeconds % 60;
    let duration = `${comMin}:${comSec}`;
    const now = utils.dateTZ(new Date(), "Asia/Jakarta");
    vidData = new RTData({
      id: vidID,
      url: url,
      name: name,
      author: {
        name: data.videoDetails.author.name,
        subname: data.videoDetails.author.user,
        channel: data.videoDetails.author.user_url,
      },
      thumbnails: data.videoDetails.thumbnails[3].url,
      duration: duration,
      mp4: `${req.protocol}://${req.get(
        "host"
      )}/media/mp4/neotube-${vidID}.mp4`,
      mp3: `${req.protocol}://${req.get(
        "host"
      )}/media/mp3/neotube-${vidID}.mp3`,
      expired: now.setMinutes(now.getMinutes() + 60),
    });
    await vidData
      .save()
      .then((result) => {
        console.log(result);
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(409).send({
          message: err.message || "Some error on saveing data",
        });
      });
  }
}
