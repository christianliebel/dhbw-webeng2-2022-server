import { NestMiddleware } from '@nestjs/common';
import { expressjwt as jwt } from 'express-jwt';
import { expressJwtSecret, GetVerificationKey } from 'jwks-rsa';

export class AuthenticationMiddleware implements NestMiddleware {
  use(req, res, next) {
    jwt({
      secret: expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://christianliebel.eu.auth0.com/.well-known/jwks.json',
      }) as GetVerificationKey,

      audience: 'https://christianliebel.com/todo/',
      issuer: 'https://christianliebel.eu.auth0.com/',
      algorithms: ['RS256'],
    })(req, res, (err) => {
      if (err) {
        const status = err.status || 500;
        const message =
          err.message || 'Sorry, we were unable to process your request.';
        return res.status(status).send({
          message,
        });
      }
      next();
    });
  }
}
