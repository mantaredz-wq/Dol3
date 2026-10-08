const assert = require('node:assert/strict');
const test = require('node:test');
const { PermissionFlagsBits } = require('discord.js');
const { isStaff, isOrderStaff } = require('../src/permissions');

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
