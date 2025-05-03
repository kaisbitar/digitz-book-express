require("dotenv").config();

const gloablDir = process.cwd();

const getRootsAndDerivatives = (req, res) => {
  res.sendFile("./storage/deliverables/rootsAndDerivatives.json", {
    root: gloablDir,
  });
};

module.exports = { getRootsAndDerivatives };
