/**
 * Which modules each role may open.
 *
 * This list is the single source of truth for both the middleware, which
 * refuses the request, and the sidebar, which decides what to offer. They used
 * to disagree: the middleware allowed a receptionist only /reception while the
 * sidebar advertised Inventory, Finance, HR and Staff Portal to everyone, so
 * the app looked like it granted access it then denied on click.
 *
 * '*' means every path.
 */
export const ROLE_MODULES: Record<string, string[]> = {
  SUPER_ADMIN:      ['*'],
  FINANCE_ADMIN:    ['/finance'],
  HR_ADMIN:         ['/hr'],
  INVENTORY_ADMIN:  ['/inventory'],
  RECEPTION_ADMIN:  ['/reception'],
};

export function allowedPathsFor(role: string | null | undefined): string[] {
  if (!role) return [];
  return ROLE_MODULES[role] ?? [];
}

/**
 * Whether a role may open a path. Prefix matching, so /finance covers
 * /finance/budget and everything else beneath it.
 */
export function canAccessPath(role: string | null | undefined, pathname: string): boolean {
  const allowed = allowedPathsFor(role);
  if (allowed.includes('*')) return true;
  return allowed.some((prefix) => pathname === prefix || pathname.startsWith(prefix + '/'));
}
