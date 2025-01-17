import Profile from "../models/Profile.js";
import express from "express";
import { check, validationResult } from "express-validator";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

// @route POST api/profile
// @desc Create or update user profile
// @access Private

router.post(
  "/",
  authMiddleware,
  [check("bio", "Bio is required").not().isEmpty()],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { bio, profilePicture } = req.body;
    const userId = req.user.id;

    try {
      let profile = await Profile.findOne({ where: { userId } });
      if (profile) {
        //Update Profile
        profile = await Profile.update(
          { bio, profilePicture },
          { where: { userId } }
        );
        return res.json(profile);
      }

      // Create Profile
      profile = await Profile.create({
        userId,
        bio,
        profilePicture,
      });

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

export default router;
