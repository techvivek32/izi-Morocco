// utils/apiPaths.ts

import { gameLogin } from "../store/gameSlice";

export const apiPaths = {
  login: "auth/login",
  signup: "auth/signup",
  me: "player/me",
  verifyAccount: "auth/verify-account",

  // game
  getGame:"games",
  infoGame: "game-info",
  gameLogin: "game-login",
};
