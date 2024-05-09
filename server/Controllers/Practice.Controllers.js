export const welcomeMessage = async (req, res) => {
  console.log("route visited");
  try {
    res.json({ message: "Creating a video calling app" });
  } catch (error) {
    res.status(500).send(error);
  }
};
