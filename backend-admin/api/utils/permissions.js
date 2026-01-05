export const ACCESS_LEVELS = {
  ROOT: 'root',
  EDIT: 'edit',
  VIEW: 'view'
};

export const PERMISSIONS = {
  USERS: {
    CREATE: 'users:create',
    READ: 'users:read',
    UPDATE: 'users:update',
    DELETE: 'users:delete'
  },
  USER_GROUPS: {
    CREATE: 'groups:create',
    READ: 'groups:read',
    UPDATE: 'groups:update',
    DELETE: 'groups:delete'
  },
  UPLOADS: {
    CREATE: 'uploads:create',
    READ: 'uploads:read'
  },
  TAGS: {
    CREATE: 'tags:create',
    READ: 'tags:read',
    UPDATE: 'tags:update',
    DELETE: 'tags:delete'
  },
  QUESTIONS: {
    CREATE: 'questions:create',
    READ: 'questions:read',
    UPDATE: 'questions:update',
    DELETE: 'questions:delete'
  },
  GAMES: {
    CREATE: 'games:create',
    READ: 'games:read',
    UPDATE: 'games:update',
    DELETE: 'games:delete'
  },
  PUZZLES: {
    CREATE: 'puzzles:create',
    READ: 'puzzles:read',
    UPDATE: 'puzzles:update',
    DELETE: 'puzzles:delete'
  }
};

export const ACCESS_LEVEL_PERMISSIONS = {
  [ACCESS_LEVELS.ROOT]: [
    PERMISSIONS.USER_GROUPS.CREATE,
    PERMISSIONS.USER_GROUPS.READ,
    PERMISSIONS.USER_GROUPS.UPDATE,
    PERMISSIONS.USER_GROUPS.DELETE,
    PERMISSIONS.UPLOADS.CREATE,
    PERMISSIONS.UPLOADS.READ
  ],
  [ACCESS_LEVELS.EDIT]: [
    PERMISSIONS.USER_GROUPS.CREATE,
    PERMISSIONS.USER_GROUPS.READ,
    PERMISSIONS.USER_GROUPS.UPDATE,
    PERMISSIONS.USER_GROUPS.DELETE,
    PERMISSIONS.UPLOADS.CREATE,
    PERMISSIONS.UPLOADS.READ
  ],
  [ACCESS_LEVELS.VIEW]: [PERMISSIONS.USER_GROUPS.READ, PERMISSIONS.UPLOADS.READ]
};

export const hasPermission = (accessLevel, permission) => {
  if (!accessLevel || !permission) return false;
  return ACCESS_LEVEL_PERMISSIONS[accessLevel]?.includes(permission) || false;
};
