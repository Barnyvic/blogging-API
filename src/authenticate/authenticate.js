/* eslint-disable consistent-return */
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../Model/UserModel');
require('dotenv').config();

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken('secret'),
            secretOrKey: process.env.JWT_SECRET,
        },
        async (token, next) => {
            try {
                return next(null, token.user);
            } catch (error) {
                next(error.message);
            }
        }
    )
);

// signUp middleware
passport.use(
    'signup',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, email, password, next) => {
            const { Firstname, Lastname } = req.body;
            try {
                const user = await UserModel.create({
                    First_Name: Firstname,
                    Last_Name: Lastname,
                    Email: email,
                    Password: password,
                });
                next(null, user);
            } catch (error) {
                next(error.message);
            }
        }
    )
);

// login middleware
// passport.use(
//     'login',
//     new LocalStrategy(
//         {
//             usernameField: 'email',
//             passwordField: 'password',
//         },
//         async (email, password, next) => {
//             try {
//                 const user = await UserModel.findOne({ Email: email });
//                 if (!user) {
//                     return next(null, false, {
//                         message: 'User not found pls register...',
//                     });
//                 }
//                 const validate = await user.validatePassword(password);
//                 if (!validate) {
//                     return next(null, false, {
//                         message: 'Invalid User Password...',
//                     });
//                 }
//                 return next(null, user, {
//                     message: 'Logged in Successfully...',
//                 });
//             } catch (error) {
//                 next(error.message);
//             }
//         }
//     )
// );
