export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://pizza.zakisu.com/api'
    : 'http://localhost:3000/api';

export const orderStatuses = {
  preparing: 'Preparing',
  ready: 'Ready',
  delivered: 'Delivered',
};

export const resourceStatuses = {
  active: 'Active',
  inactive: 'Inactive',
};

export const userRoles = {
  kitchenManager: 'Kitchen Manager',
  cashier: 'Cashier',
  branchManager: 'Branch Manager',
};

export const userPermissions = {
  viewResource: 'viewResource',
  addResource: 'addResource',
  updateResource: 'updateResource',
};

export const adminPermissions = {
  viewUser: 'viewUser',
  addUser: 'addUser',
  updateUser: 'updateUser',
  deleteUser: 'deleteUser',
  deleteResource: 'deleteResource',
  viewRole: 'viewRole',
  addRole: 'addRole',
  updateRole: 'updateRole',
  deleteRole: 'deleteRole',
};
