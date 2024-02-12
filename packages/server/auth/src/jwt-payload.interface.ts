export interface JwtPayload {
  /** userId */
  sub: number;
  isExpired: boolean;
}
