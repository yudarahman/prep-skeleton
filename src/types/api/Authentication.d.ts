type AAuthBody = {
  username: string;
  password: string;
};

type AAuthResponse = {
  userId: string;
  token?: string;
  refreshToken?: string;
};