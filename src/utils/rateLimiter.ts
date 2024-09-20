import { RateLimitRequestHandler, rateLimit } from "express-rate-limit";

interface rateLimitInterface {
  timeGap: number;
  limitRequests: number;
}

export const getRateLimiter = ({
  timeGap,
  limitRequests,
}: rateLimitInterface): RateLimitRequestHandler => {
  return rateLimit({
    windowMs: timeGap * 60 * 1000, // 15 minutes
    limit: limitRequests, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    // store: ... , // Use an external store for more precise rate limiting
  });
};
