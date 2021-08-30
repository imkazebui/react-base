import { isMobile } from 'utilities/browser';

export const checkValidRole = ({
  userInfo,
  roles = [],
  condition,
  isPrivate,
  defaultShow = false,
  mobile = false,
}) => {
  if (!isPrivate) {
    return true;
  }
  if (isMobile) {
    return mobile;
  }
  if (userInfo) {
    const { level, manageCard } = userInfo;
    // if (condition) {
    //   if (condition.accessWallet) {
    //     return (
    //       level === USER_LEVEL_TYPE.ADMIN ||
    //       (level === USER_LEVEL_TYPE.CAMPAIGN_MANAGER && manageCard)
    //     );
    //   }
    // }
    return (roles.length && roles.includes(level)) || true;
  }
  return defaultShow;
};
