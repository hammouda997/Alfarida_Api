// google.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from 'src/users/services/auth.service';
import { Strategy, VerifyCallback } from 'passport-google-oauth20'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: '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',
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(request: any, accessToken: string, profile: any, done: VerifyCallback): Promise<any> {

      if (!profile) {
        throw new Error('Profile data is undefined');
      }
      const { name, emails , displayName } = profile;
      if (!name || !emails || !emails.length) {
        throw new Error('Missing required profile data');
      }
      const user = {
        name: displayName,
        email: emails[0].value,
        accessToken,
      };
  
      done(null, user);
  
  }
}  