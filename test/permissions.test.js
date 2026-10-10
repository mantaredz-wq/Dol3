const assert = require('node:assert/strict');
const test = require('node:test');
const { PermissionFlagsBits } = require('discord.js');
const { isStaff, isOrderStaff, hasConfiguredOwnerRole } = require('../src/permissions');

test('configured /setadmin role is treated as staff for shop commands', () => {
  const settings = { adminRoleId: 'admin-role' };
  const interaction = {
    guildId: 'guild-1',
    member: { roles: { cache: new Map([['admin-role', true]]) } },
    memberPermissions: { has: (flag) => flag === PermissionFlagsBits.Administrator },
  };

  assert.equal(isStaff(interaction, settings), true);
  assert.equal(isOrderStaff(interaction, settings), true);
});

test('/dmsorder authorization is limited to the configured /setowner role', () => {
  const settings = { ownerRoleId: 'owner-role', adminRoleId: 'admin-role', staffRoleId: 'staff-role' };
  const interaction = (roleId) => ({
    member: { roles: { cache: new Map([[roleId, true]]) } },
    memberPermissions: { has: () => true },
  });

  assert.equal(hasConfiguredOwnerRole(interaction('owner-role'), settings), true);
  assert.equal(hasConfiguredOwnerRole(interaction('admin-role'), settings), false);
  assert.equal(hasConfiguredOwnerRole(interaction('staff-role'), settings), false);
  assert.equal(hasConfiguredOwnerRole(interaction('admin-role'), {}), false);
});
