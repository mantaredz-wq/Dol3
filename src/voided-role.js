async function setVoidedRole(guild, roleId, userId, enabled) {
  if (!guild || !roleId || !userId) return false;

  const [role, member] = await Promise.all([
    guild.roles.fetch(roleId).catch(() => null),
    guild.members.fetch(userId).catch(() => null),
  ]);
  if (!role || !member) return false;

  const hasRole = member.roles.cache.has(role.id);
  if (enabled && !hasRole) {
    await member.roles.add(role);
    return true;
  }
  if (!enabled && hasRole) {
    await member.roles.remove(role);
    return true;
  }
  return false;
}

module.exports = { setVoidedRole };