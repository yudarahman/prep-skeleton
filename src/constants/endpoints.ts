const apiEndpoint = {
  auth: {
    login: 'auth/login',
    logout: 'auth/logout',
    refreshToken: 'auth/refresh-token'
  },
  user: {
    list: 'users',
    getMe: 'users/me'
  },
  roles: {
    list: 'roles'
  },
  permission: {
    list: 'manage-securities'
  },
  menu: {
    list: 'menus'
  }
};

export { apiEndpoint };