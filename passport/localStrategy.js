const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = (passport) => {
	passport.use(new LocalStrategy({
		usernameField: 'id',
		passwordField: 'password',
	}, async (id, password, done) => {
		try {
			const exUser = await User.findOne({where: {id} });
			if (exUser) {
				const result = await bcrypt.compareSync(password, exUser.password);
				if (result) {
					done(null, exUser);
				} else {
					done(nell, false, { message: '비밀번호가 일치하지 않습니다.'});
				}
			} else {
				done(null, false, { message: '존재하지 않는 아이디입니다.' });
			}
		} catch (error) {
			console.error(error);
			done(error);
		}
	}));
};