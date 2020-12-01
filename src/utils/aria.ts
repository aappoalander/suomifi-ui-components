/**
 * Returns object with 'aria-describedby' which can be spread to props.
 * E.g:
 * @example
 * <Component
 *   {...getAriaDescribedBy([
 *      describingElement ? "id-of-describing-element" : undefined,
 *      otherDescribingElement ? "id-of-other-describing-element" : undefined,
 *   ])}
 * />
 * @param describedByIds Array of id-strings
 * @returns Object with 'aria-describedby' if there is atleast one value that is not undefined. Otherwise returns empty Object.
 */
export const getAriaDescribedByProp = (
  describedByIds: (string | undefined)[],
):
  | { 'aria-describedby': string }
  | {
      'aria-describedby'?: undefined;
    } => {
  const existing = describedByIds.filter((id) => !!id);
  if (existing.length > 0) {
    const ariaDescribedBy = existing.join(' ').trim();
    return {
      'aria-describedby': ariaDescribedBy,
    };
  }
  return {};
};
