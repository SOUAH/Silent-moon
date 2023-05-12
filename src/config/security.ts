import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import config from "./env/config";
import UserModel from "../models/user-model";

//strategy used for authorization when we put that router.use(router.use(passport.authenticate('jwt', { session: false })))

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,//DECODING JWT
};

//configuring passport(authentication of requests), check if my jwt is valid
passport.use(//package for autorization and working with jwt, check headers, encode...
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await UserModel.findById(jwt_payload.id);

      if (user) {
        return done(null, user);
      }

      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);
