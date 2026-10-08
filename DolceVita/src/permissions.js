const { PermissionFlagsBits } = require('discord.js');

function memberHasRole(interaction, roleId) {
  const roles = interaction.member?.roles;
  return Array.isArray(roles)
    ? roles.includes(roleId)
    : roles?.cache?.has(roleId) ?? false;
}

function isStaff(interaction, settings = {}) {
  const staffRoleIds = [settings?.staffRoleId, settings?.ownerRoleId, settings?.adminRoleId].filter(Boolean);
  if (staffRoleIds.length) {
    return staffRoleIds.some((roleId) => memberHasRole(interaction, roleId))
      || interaction.memberPermissions?.has(PermissionFlagsBits.Administrator);
  }
  return interaction.memberPermissions?.has(PermissionFlagsBits.ManageMessages) ?? false;
}

function isOrderStaff(interaction, settings = {}) {
  const orderRoleIds = [settings?.adminRoleId, settings?.staffRoleId, settings?.ownerRoleId].filter(Boolean);
  if (!orderRoleIds.length) return isStaff(interaction, settings);
  return orderRoleIds.some((roleId) => memberHasRole(interaction, roleId))
    || interaction.memberPermissions?.has(PermissionFlagsBits.Administrator);
}

module.exports = {
  memberHasRole,
  isStaff,
  isOrderStaff,
};
